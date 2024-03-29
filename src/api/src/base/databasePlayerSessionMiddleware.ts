import { PlayerSession } from "../types";
import asyncHandler from "express-async-handler";
import { PoolConnection, Pool, createPool } from "mysql2/promise";

type CreatePlayerSession = () => any;

type ExpressMiddleware = (req: any, res: any, next: any) => void;

type FetchResult = {data?: PlayerSession, found: boolean, error?: boolean};

class DatabaseStorage {
    public constructor() {

    }
    private connectionPool!: Pool;

    public getConnection(): Promise<PoolConnection> {
        if (!this.connectionPool) {
            this.connectionPool = createPool({
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT as string),
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT as string),
            });
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
            const queryResult: {data: PlayerSession}[] = await this.queryDatabase(connection,sql,...values);
            if (queryResult.length <= 0) {
                return {found: false};
            }
            return {data: queryResult[0].data, found: true};
        } catch (error) {
            console.error(error);
            return {found: false};
        } finally {
            connection.release();
        }
    }
    public async addSession(id: string,session: PlayerSession): Promise<void> {
        const connection: PoolConnection = await this.getConnection();
        try {
            await connection.beginTransaction();
            const sql: string = "INSERT INTO sessions(sessionId,data) VALUES (?,?)";
            const values: any[] = [id,session];
            await this.queryDatabase(connection,sql,...values);
            await connection.commit();
        } catch (error) {
            console.error(error);
        } finally {
            connection.release();
        }
    }
    public async setSession(id:string,session:PlayerSession): Promise<void> {
        const connection: PoolConnection = await this.getConnection();
        try {
            await connection.beginTransaction();
            const sql: string = "UPDATE sessions SET data = ? where sessionId = ?";
            const values: any[] = [session,id];
            // const queryResult: ResultSetHeader = 
            await this.queryDatabase(connection,sql,...values);
            await connection.commit();
        } catch (error) {
            console.error(error);
        } finally {
            connection.release();
        }
    }
}

const databaseStorage: DatabaseStorage = new DatabaseStorage();

export function getPlayerSessionFromDatabase(): PlayerSession{
    return databaseStorage.session;
}

export function resetPlayerSessionInDatabase(createPlayerSession: CreatePlayerSession): void{
    
    const playerSession: any = getPlayerSessionFromDatabase();

    Object.keys(playerSession).forEach((key) => delete playerSession[key]);

    Object.assign(playerSession, createPlayerSession());
}


export function databasePlayerSessionMiddleware(
    alias: string,
    createPlayerSession: CreatePlayerSession
): ExpressMiddleware {
    return asyncHandler(async (req, res, next) => {
        const PlayerSessionIdHeader: string | undefined = req.headers["x-playersessionid"] as string;

        if (!PlayerSessionIdHeader) {
            res.status(400).end();

            return;
        }

        const playerSessionId: string = `${alias}-${PlayerSessionIdHeader}`;
        const fetchResult: FetchResult = await databaseStorage.fetchSession(playerSessionId);
        if (fetchResult.error) {
            res.status(400).end();
            return;
        }
        let playerSession: PlayerSession;
        if (fetchResult.found) {
            playerSession = fetchResult.data!;
        } else {
            playerSession = createPlayerSession();
            await databaseStorage.addSession(playerSessionId,playerSession);
        }
        databaseStorage.session = playerSession;

        next();

        await databaseStorage.setSession(playerSessionId,databaseStorage.session);
    });
    
}
