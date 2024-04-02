import { PoolConnection } from "mysql2/promise";
import { databaseStorage } from "./databasePlayerSessionMiddleware";
import { score } from "@shared/types";

export async function saveHighScoreToDatabase(name: string,time: number,hp: number): Promise<boolean>{
    const sql: string = "INSERT INTO score(name,time,hp) VALUES (?,?,?)";
    const values: any = [name,time,hp];
    const connection: PoolConnection = await databaseStorage.getConnection();
    try {
        await connection.beginTransaction();
        await databaseStorage.queryDatabase(connection,sql,...values);
        await connection.commit();
        return true;
    } catch (error){
        console.error(error);
        return false;
    } finally {
        connection.release();
    }
}
export async function fetchLeaderBoard(): Promise<score[] | undefined>{
    const sql: string = "SELECT name,time,hp FROM score ORDER BY hp DESC,time ASC LIMIT 20";
    const connection: PoolConnection = await databaseStorage.getConnection();
    try {
        const result: score[] = await databaseStorage.queryDatabase(connection,sql);
        return result;
    } catch (error) {
        console.error(error);
        return;
    } finally {
        connection.release();
    }
}