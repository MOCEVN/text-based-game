import { PlayerSession } from "../types";
import { databasePlayerSessionMiddleware, getPlayerSessionFromDatabase, resetPlayerSessionInDatabase } from "./databasePlayerSessionMiddleware";
import { getPlayerSessionFromContext, playerSessionMiddleware, resetPlayerSessionInContext } from "./playerSessionMiddleware";
import { config } from "dotenv";

config({ path: ".env.local", override: true });

type CreatePlayerSession = () => any;

type ExpressMiddleware = (req: any, res: any, next: any) => void;

const dataBaseCredentialsFilled: any = (process.env.DB_USER && process.env.DB_DATABASE && process.env.DB_PASSWORD);

export function getPlayerSessionMiddleware(): (alias: string,createPlayerSession: CreatePlayerSession) => ExpressMiddleware{
    
    if (!dataBaseCredentialsFilled) {
        console.log("Player sessions are stored on the file system.");
        
        return playerSessionMiddleware;
    }
    console.log("Player sessions are stored on the database.");
    
    return databasePlayerSessionMiddleware;
}

export function getPlayerSessionGetter(): () => PlayerSession {
    if (!dataBaseCredentialsFilled) {
        return getPlayerSessionFromContext;
    }
    return getPlayerSessionFromDatabase;
}

export function getPlayerSessionReset(): (createPlayerSession: CreatePlayerSession) => void {
    if (!dataBaseCredentialsFilled) {
        return resetPlayerSessionInContext;
    }
    return resetPlayerSessionInDatabase;
}