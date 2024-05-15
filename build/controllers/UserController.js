"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPicture = exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateRandomNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return randomNumber.toString();
};
//Return all Users
const getUsers = (req, res) => {
    const q = "SELECT * FROM users;";
    db_1.awsDB.query(q, (error, data) => {
        if (error)
            return res.status(500).json({ error: 'Erro in server AWS' });
        return res.status(200).json(data);
    });
};
exports.getUsers = getUsers;
//Return one User for ID
const getUserById = (req, res) => {
    const q = "SELECT * FROM users WHERE `id`=?;";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro get User for ID' });
        return res.status(200).json(data[0]);
    });
};
exports.getUserById = getUserById;
//Create a new User
const createUser = (req, res) => {
    const { name, password, email, birth, cpf, cep } = req.body;
    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Required fields' });
    }
    //Cryptography for PASSWORD
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const q = "INSERT INTO users (`name`, `password`,`email`,`birth`, `cpf`, `cep`) VALUES (?,?,?,?,?,?);";
    db_1.awsDB.query(q, [name, hashedPassword, email, birth, cpf, cep], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro of Create a new USER' });
        // Recupera o ID do usuário recém-criado
        const userId = data.insertId;
        // Gera um número randômico de 5 caracteres para a conta
        const contaNumber = generateRandomNumber();
        // Cria uma wallet para o novo usuário
        const walletQuery = "INSERT INTO wallets (`user_id`, `conta`, `saldo`) VALUES (?,?,?);";
        db_1.awsDB.query(walletQuery, [userId, contaNumber, 0.00], (walletError, walletData) => __awaiter(void 0, void 0, void 0, function* () {
            if (walletError) {
                return res.status(500).json({ error: 'Erro of create Wallet for User' });
            }
            return res.status(201).json('User and Wallet Created!!');
        }));
    });
};
exports.createUser = createUser;
//Update data of User
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, password, email, birth, cpf, cep, picture } = req.body;
    if (!name && !password && !email && !birth && !cpf && !cep && !picture) {
        return res.status(400).json({ error: 'Nenhum dado de atualização fornecido' });
    }
    const updatedFields = {};
    if (name)
        updatedFields.name = name;
    if (password) {
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        updatedFields.password = hashedPassword;
    }
    if (email)
        updatedFields.email = email;
    if (birth)
        updatedFields.birth = birth;
    if (cpf)
        updatedFields.cpf = cpf;
    if (cep)
        updatedFields.cep = cep;
    if (picture)
        updatedFields.picture = picture;
    const fieldsToUpdate = Object.keys(updatedFields);
    const placeholders = fieldsToUpdate.map((field) => `${field}=?`).join(', ');
    const q = `UPDATE users SET ${placeholders} WHERE id=?`;
    const values = [...fieldsToUpdate.map((field) => updatedFields[field]), userId];
    db_1.awsDB.query(q, values, (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro of Update USER' });
        return res.status(200).json('USER Updated!!');
    });
};
exports.updateUser = updateUser;
//Deleta o Usuario
const deleteUser = (req, res) => {
    const userId = req.params.id;
    const q = "DELETE FROM users WHERE `id`=?";
    db_1.awsDB.query(q, [userId], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro of DELETE User' });
        return res.status(200).json('User Deleted!!');
    });
};
exports.deleteUser = deleteUser;
// Realiza o Login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cpf, password } = req.body;
        const q = "SELECT * FROM users WHERE cpf=?";
        const result = yield new Promise((resolve, reject) => {
            db_1.awsDB.query(q, [cpf], (error, result) => {
                if (error) {
                    console.error('Erro of get User:', error);
                    reject(error);
                }
                else {
                    if (result.length > 0) {
                        const user = result[0];
                        // Compara a senha fornecida com o hash armazenado no banco de dados
                        const passwordMatch = bcrypt_1.default.compareSync(password, user.password);
                        if (passwordMatch) {
                            res.status(200).json(user);
                        }
                        else {
                            res.status(401).json({ message: 'Credenciais inválidas pela senha' });
                        }
                    }
                    else {
                        res.status(401).json({ message: 'Credenciais inválidas result' });
                    }
                    resolve(result);
                }
            });
        });
    }
    catch (error) {
        console.error('Erro ao processar a solicitação de login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.loginUser = loginUser;
// Adiciona Foto de Perfil ------------ TEST -------------
const updateUserPicture = (req, res) => {
    const userId = req.params.id;
    const { picture } = req.body;
    if (!picture) {
        return res.status(400).json({ error: 'Nenhuma imagem fornecida' });
    }
    const q = `UPDATE users SET picture=? WHERE id=?`;
    const values = [picture, userId];
    db_1.localDB.query(q, values, (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro ao Atualizar Foto do Usuário' });
        return res.status(200).json('Foto do Usuário Atualizada!!');
    });
};
exports.updateUserPicture = updateUserPicture;
