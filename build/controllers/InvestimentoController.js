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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvestimento = exports.updateInvestimento = exports.createInvestimento = exports.getInvestimentoByWalletId = exports.getInvestimentoById = exports.getInvestimentos = void 0;
const db_1 = require("../db");
// Retorna todos os Investimentos
const getInvestimentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM investimentos;";
    db_1.awsDB.query(q, (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer os Investimentos" });
        return res.status(200).json(data);
    });
});
exports.getInvestimentos = getInvestimentos;
// Retorna Investimento por ID
const getInvestimentoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM investimentos WHERE `id`=?;";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer Ativo por ID" });
        return res.status(200).json(data[0]);
    });
});
exports.getInvestimentoById = getInvestimentoById;
// Retorna Investimento por ID da WALLET
const getInvestimentoByWalletId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM investimentos WHERE `wallet_id`=?";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer os Investimentos dessa Wallet" });
        return res.status(200).json(data);
    });
});
exports.getInvestimentoByWalletId = getInvestimentoByWalletId;
// Cria o Investimento
const createInvestimento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallet_id, titulo, valor, observacao, quantidade, categoria, data } = req.body;
    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ erro: "Campos Obrigatórios!" });
    }
    const q = "INSERT INTO investimentos(`wallet_id`, `titulo`, `valor`, `observacao`, `quantidade`, `categoria`, `data`) VALUES (?,?,?,?,?,?,?);";
    db_1.awsDB.query(q, [wallet_id, titulo, valor, observacao, quantidade, categoria, data], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Cadastrar o Investimento" });
        return res.status(201).json("Investimento Cadastrado!");
    });
});
exports.createInvestimento = createInvestimento;
// Atualiza o Investimento 
const updateInvestimento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ativoId = req.params.id;
    const { titulo, valor, observacao, quantidade, categoria, data } = req.body;
    // Construir a parte SET dinamicamente com base nos campos fornecidos pelo usuário
    const setFields = [];
    if (titulo !== undefined)
        setFields.push("titulo=?");
    if (valor !== undefined)
        setFields.push("valor=?");
    if (observacao !== undefined)
        setFields.push("observacao=?");
    if (quantidade !== undefined)
        setFields.push("quantidade=?");
    if (categoria !== undefined)
        setFields.push("categoria=?");
    if (data !== undefined)
        setFields.push("data=?");
    if (setFields.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo fornecido para atualização" });
    }
    const q = `UPDATE investimentos SET ${setFields.join(", ")} WHERE id=?;`;
    db_1.awsDB.query(q, [...Object.values(req.body).filter(value => value !== undefined), ativoId], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Atualizar o Investimento" });
        return res.status(200).json("Investimento Atualizado!");
    });
});
exports.updateInvestimento = updateInvestimento;
// Excluir o Investimento
const deleteInvestimento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ativoId = req.params.id;
    const q = "DELETE FROM investimentos WHERE id=?;";
    db_1.awsDB.query(q, [ativoId], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Excluir o Investimento " });
        return res.status(200).json("Investimento Excluído!");
    });
});
exports.deleteInvestimento = deleteInvestimento;
