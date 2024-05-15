"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWallet = exports.updateWallet = exports.createWallet = exports.getWalletByIdUser = exports.getWalletById = exports.getWallets = void 0;
const db_1 = require("../db");
//Retorna todos os Wallets
const getWallets = (req, res) => {
    const q = "SELECT * FROM wallets;";
    db_1.awsDB.query(q, (error, data) => {
        if (error)
            return res.status(500).json({ error: 'Erro interno no servidor' });
        return res.status(200).json(data);
    });
};
exports.getWallets = getWallets;
//Retorna Wallet Por ID
const getWalletById = (req, res) => {
    const q = "SELECT * FROM wallets WHERE `id`=?;";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro ao encontrar Wallet' });
        return res.status(200).json(data[0]);
    });
};
exports.getWalletById = getWalletById;
const getWalletByIdUser = (req, res) => {
    const q = "SELECT * FROM wallets WHERE `user_id`=?;";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro ao encontrar a Wallet do Usuario' });
        return res.status(200).json(data[0]);
    });
};
exports.getWalletByIdUser = getWalletByIdUser;
//Cria uma Wallet   
const createWallet = (req, res) => {
    const { user_id, conta, saldo, ativos, despesas } = req.body;
    if (!user_id || !conta) {
        return res.status(400).json({ error: 'Atributos Obrigatórios!' });
    }
    const q = "INSERT INTO wallets (`user_id`, `conta`,`saldo`, `ativos`, `despesas`) VALUES (?,?,?,?,?);";
    db_1.awsDB.query(q, [user_id, conta, saldo, ativos, despesas], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: 'Erro ao Criar Wallet' });
        return res.status(201).json('Wallet Criado!!');
    });
};
exports.createWallet = createWallet;
// Atualiza os dados da Wallet de forma dinâmica
const updateWallet = (req, res) => {
    const walletId = req.params.id;
    const { saldo, ativos, despesas } = req.body;
    // Constrói a query de atualização de acordo com os campos fornecidos no corpo da requisição
    let updateFields = [];
    let queryParams = [];
    if (saldo !== undefined) {
        updateFields.push('saldo=?');
        queryParams.push(saldo);
    }
    if (ativos !== undefined) {
        updateFields.push('ativos=?');
        queryParams.push(ativos);
    }
    if (despesas !== undefined) {
        updateFields.push('despesas=?');
        queryParams.push(despesas);
    }
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }
    const updateQuery = `UPDATE wallets SET ${updateFields.join(', ')} WHERE id=?`;
    db_1.awsDB.query(updateQuery, [...queryParams, walletId], (error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao atualizar os dados da Wallet.' });
        }
        return res.status(200).json('Dados da Wallet Atualizados!');
    });
};
exports.updateWallet = updateWallet;
//Deleta a Wallet
const deleteWallet = (req, res) => {
    const walletId = req.params.id;
    const q = "DELETE FROM wallets WHERE `id`=?";
    db_1.awsDB.query(q, [walletId], (error, data) => {
        if (error)
            return res.status(500).json({ error: 'Erro ao Deletar Wallet' });
        return res.status(200).json('Wallet Deletada!!');
    });
};
exports.deleteWallet = deleteWallet;
