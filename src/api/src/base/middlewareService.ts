import { PlayerSession } from "../types";
import { databasePlayerSessionMiddleware, getPlayerSessionFromDatabase, resetPlayerSessionInDatabase } from "./databasePlayerSessionMiddleware";
import { getPlayerSessionFromContext, playerSessionMiddleware, resetPlayerSessionInContext } from "./playerSessionMiddleware";
import { config } from "dotenv";

config({ path: ".env.local", override: true });

type CreatePlayerSession = () => any;

type ExpressMiddleware = (req: any, res: any, next: any) => void;

const dataBaseCredentialsFilled: any = (process.env.DB_USER && process.env.DB_DATABASE && process.env.DB_PASSWORD);

let databaseConnectionStatus: boolean = true;

export function disableDatabase(): void {
    databaseConnectionStatus = false;
}

export function getPlayerSessionMiddleware(): (alias: string,createPlayerSession: CreatePlayerSession) => ExpressMiddleware{
    
    if (dataBaseCredentialsFilled && databaseConnectionStatus) {
        console.log("Player sessions are stored on the database.");
        return databasePlayerSessionMiddleware;
    }
    console.log("Player sessions are stored on the file system. Check your .env.local file!");
    return playerSessionMiddleware;
}

export function getPlayerSessionGetter(): () => PlayerSession {
    if (dataBaseCredentialsFilled && databaseConnectionStatus) {
        return getPlayerSessionFromDatabase;
    }
    return getPlayerSessionFromContext;
}

export function getPlayerSessionReset(): (createPlayerSession: CreatePlayerSession) => void {
    if (dataBaseCredentialsFilled && databaseConnectionStatus) {
        return resetPlayerSessionInDatabase;
    }
    return resetPlayerSessionInContext;
}