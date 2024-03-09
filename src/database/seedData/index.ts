import mysql from 'mysql';
import seedAdminUser from "./seedAdmin";

export const seedData = (db: mysql.Connection) => {
    seedAdminUser(db);
}