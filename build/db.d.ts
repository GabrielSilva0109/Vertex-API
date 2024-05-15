import mysql from 'mysql';
declare const localDB: mysql.Connection;
declare const awsDB: mysql.Connection;
export { localDB, awsDB };
