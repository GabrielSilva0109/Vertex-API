"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsDB = exports.localDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
require('dotenv').config();
//LOCALHOST
const userLocalhost = process.env.HOST;
const passwordLocalhost = process.env.PASSWORD;
//Conection with LocalHost for TEST
const localDB = mysql_1.default.createConnection({
    host: "localhost",
    user: userLocalhost,
    password: passwordLocalhost,
    database: "vertex"
});
exports.localDB = localDB;
// localDB.connect((erro) => {
//     if(erro){
//         console.log("Erro Connection MySQL", erro)
//         return
//     }
//     console.log("MySQL Connection Successfull!!")
// })
//AWS
const hostAWS = process.env.awsHOST;
const userAWS = process.env.awsUSER;
const passwordAWS = process.env.awsPASSWORD;
//Conection with AWS Database SERVER
const awsDB = mysql_1.default.createConnection({
    host: hostAWS,
    user: userAWS,
    password: passwordAWS,
    database: "vertex"
});
exports.awsDB = awsDB;
awsDB.connect((erro) => {
    if (erro) {
        console.log("Erro Connection AWS DB", erro);
        return;
    }
    console.log("AWS DB Connection Successfull!");
});
