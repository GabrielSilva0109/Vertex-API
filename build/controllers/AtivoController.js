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
exports.deleteAtivo = exports.updateAtivo = exports.createAtivo = exports.getAtivosByWalletId = exports.getAtivoById = exports.getAtivos = void 0;
const db_1 = require("../db");
// Retorna todos os ATIVOS
const getAtivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM ativos;";
    db_1.awsDB.query(q, (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer os Ativos" });
        return res.status(200).json(data);
    });
});
exports.getAtivos = getAtivos;
// Retorna ATIVO por ID
const getAtivoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM ativos WHERE `id`=?;";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer Ativo por ID" });
        return res.status(200).json(data[0]);
    });
});
exports.getAtivoById = getAtivoById;
// Retorna ATIVOS por ID da WALLET
const getAtivosByWalletId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM ativos WHERE `wallet_id`=?";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer os Ativos dessa Wallet" });
        return res.status(200).json(data);
    });
});
exports.getAtivosByWalletId = getAtivosByWalletId;
// Cria o ATIVO
const createAtivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallet_id, titulo, valor, observacao, categoria, fonte, data } = req.body;
    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ erro: "Campos Obrigatórios!" });
    }
    const q = "INSERT INTO ativos(`wallet_id`, `titulo`, `valor`, `observacao`, `categoria`, `fonte`, `data`) VALUES (?,?,?,?,?,?,?);";
    db_1.awsDB.query(q, [wallet_id, titulo, valor, observacao, categoria, fonte, data], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Cadastrar o Ativo" });
        return res.status(201).json("Cadastrado Ativo!");
    });
});
exports.createAtivo = createAtivo;
// Atualiza o ATIVO
const updateAtivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ativoId = req.params.id;
    const { titulo, valor, observacao, categoria, fonte, data } = req.body;
    // Construir a parte SET dinamicamente com base nos campos fornecidos pelo usuário
    const setFields = [];
    if (titulo !== undefined)
        setFields.push("titulo=?");
    if (valor !== undefined)
        setFields.push("valor=?");
    if (observacao !== undefined)
        setFields.push("observacao=?");
    if (categoria !== undefined)
        setFields.push("categoria=?");
    if (fonte !== undefined)
        setFields.push("fonte=?");
    if (data !== undefined)
        setFields.push("data=?");
    if (setFields.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo fornecido para atualização" });
    }
    const q = `UPDATE ativos SET ${setFields.join(", ")} WHERE id=?;`;
    db_1.awsDB.query(q, [...Object.values(req.body).filter(value => value !== undefined), ativoId], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Atualizar o Ativo" });
        return res.status(200).json("Ativo Atualizado!");
    });
});
exports.updateAtivo = updateAtivo;
// Excluir o ATIVO
const deleteAtivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ativoId = req.params.id;
    const q = "DELETE FROM ativos WHERE id=?;";
    db_1.awsDB.query(q, [ativoId], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Excluir o Ativo" });
        return res.status(200).json("Ativo Excluído!");
    });
});
exports.deleteAtivo = deleteAtivo;
