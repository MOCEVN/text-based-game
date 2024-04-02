import { PlayerSession } from "../types";
import asyncHandler from "express-async-handler";
import { PoolConnection, Pool, createPool } from "mysql2/promise";
import { playerSessionMiddleware } from "./playerSessionMiddleware";
import { disableDatabase } from "./middlewareService";

type CreatePlayerSession = () => any;

type ExpressMiddleware = (req: any, res: any, next: any) => void;

type FetchResult = { data?: PlayerSession, found: boolean };

class DatabaseStorage {
    public constructor() {

    }
    private connectionPool!: Pool;

    public getConnection(): Promise<PoolConnection> {
        if (!this.connectionPool) {
            try {
                this.connectionPool = createPool({
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT as string),
                    database: process.env.DB_DATABASE,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT as string),
                });
            } catch (error){
                console.error((error as Error).message);
                databaseConnectionFailed();
            }
        }

        return this.connectionPool.getConnection();
    }
    public async queryDatabase<T = any>(
        connection: PoolConnection,
        query: string,
        ...values: any[]
    ): Promise<T> {
        const queryResult: any = await connection.execute(query, values);

        return queryResult[0] as T;
    }

    private _session!: PlayerSession;

    public get session(): PlayerSession {
        return this._session;
    }
    public set session(value: PlayerSession) {
        this._session = value;
    }

    public async fetchSession(id: string): Promise<FetchResult> {
        const connection: PoolConnection = await this.getConnection();
        try {
            const sql: string = "SELECT data FROM sessions WHERE sessionId = ?";
            const values: string[] = [id];
            const queryResult: { data: PlayerSession }[] = await this.queryDatabase(connection, sql, ...values);
            if (queryResult.length <= 0) {
                return { found: false };
            }
            return { data: queryResult[0].data, found: true };
        } catch (error) {
            console.error((error as Error).message);
            databaseConnectionFailed();
            return { found: false };
        } finally {
            connection.release();
        }
    }
    public async addSession(id: string, session: PlayerSession): Promise<void> {
        const connection: PoolConnection = await this.getConnection();
        try {
            await connection.beginTransaction();
            const sql: string = "INSERT INTO sessions(sessionId,data) VALUES (?,?)";
            const values: any[] = [id, session];
            await this.queryDatabase(connection, sql, ...values);
            await connection.commit();
        } catch (error) {
            console.error((error as Error).message);
            databaseConnectionFailed();
        } finally {
            connection.release();
        }
    }
    public async setSession(id: string, session: PlayerSession): Promise<void> {
        const connection: PoolConnection = await this.getConnection();
        try {
            await connection.beginTransaction();
            const sql: string = "UPDATE sessions SET data = ? where sessionId = ?";
            const values: any[] = [session, id];
            await this.queryDatabase(connection, sql, ...values);
            await connection.commit();
        } catch (error) {
            console.error((error as Error).message);
            databaseConnectionFailed();
        } finally {
            connection.release();
        }
    }
}

export const databaseStorage: DatabaseStorage = new DatabaseStorage();

let databaseConnectionStatus: boolean = true;

export function getPlayerSessionFromDatabase(): PlayerSession {
    if (!databaseStorage.session) {
        databaseConnectionFailed();
    }
    return databaseStorage.session;
}

export function resetPlayerSessionInDatabase(createPlayerSession: CreatePlayerSession): void {

    const playerSession: any = getPlayerSessionFromDatabase();

    Object.keys(playerSession).forEach((key) => delete playerSession[key]);

    Object.assign(playerSession, createPlayerSession());
}


export function databasePlayerSessionMiddleware(
    alias: string,
    createPlayerSession: CreatePlayerSession
): ExpressMiddleware {
    return asyncHandler(async (req, res, next) => {
        if (!databaseConnectionStatus) {
            playerSessionMiddleware(alias, createPlayerSession)(req, res, next);
        } else {

            try {

                const PlayerSessionIdHeader: string | undefined = req.headers["x-playersessionid"] as string;

                if (!PlayerSessionIdHeader) {
                    res.status(400).end();

                    return;
                }

                const playerSessionId: string = `${alias}-${PlayerSessionIdHeader}`;
                const fetchResult: FetchResult = await databaseStorage.fetchSession(playerSessionId);

                if (!databaseConnectionStatus) {
                    playerSessionMiddleware(alias, createPlayerSession)(req, res, next);
                    return;
                }

                let playerSession: PlayerSession;
                if (fetchResult.found) {
                    playerSession = fetchResult.data!;
                } else {
                    playerSession = createPlayerSession();
                    await databaseStorage.addSession(playerSessionId, playerSession);
                }

                if (!databaseConnectionStatus) {
                    playerSessionMiddleware(alias, createPlayerSession)(req, res, next);
                    return;
                }

                databaseStorage.session = playerSession;

                next();

                await databaseStorage.setSession(playerSessionId, databaseStorage.session);

            } catch (error) {
                console.error((error as Error).message);
                if (databaseConnectionStatus) {
                    databaseConnectionFailed();
                    playerSessionMiddleware(alias, createPlayerSession)(req, res, next);
                }
            }
        }

    });

}

export function databaseConnectionFailed(): void {
    console.log("Database connection failed, switching to file system.");
    databaseConnectionStatus = false;
    disableDatabase();
}