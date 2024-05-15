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
exports.deleteDespesa = exports.updateDespesa = exports.createDespesa = exports.getDespesasByWalletId = exports.getDespesaById = exports.getDespesas = void 0;
const db_1 = require("../db");
// Retorna todos os DESPESAS
const getDespesas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM despesas;";
    db_1.awsDB.query(q, (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer os Despesas" });
        return res.status(200).json(data);
    });
});
exports.getDespesas = getDespesas;
// Retorna DESPESA por ID
const getDespesaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM despesas WHERE `id`=?;";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer Ativo por ID" });
        return res.status(200).json(data[0]);
    });
});
exports.getDespesaById = getDespesaById;
// Retorna DESPESAS por ID da WALLET
const getDespesasByWalletId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = "SELECT * FROM despesas WHERE `wallet_id`=?";
    db_1.awsDB.query(q, [req.params.id], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao trazer as Despesas dessa Wallet" });
        return res.status(200).json(data);
    });
});
exports.getDespesasByWalletId = getDespesasByWalletId;
// Cria a DESPESA
const createDespesa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallet_id, titulo, valor, observacao, categoria, fonte, data } = req.body;
    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ erro: "Campos Obrigatórios!" });
    }
    const q = "INSERT INTO despesas(`wallet_id`, `titulo`, `valor`, `observacao`, `categoria`, `fonte`, `data`) VALUES (?,?,?,?,?,?,?);";
    db_1.awsDB.query(q, [wallet_id, titulo, valor, observacao, categoria, fonte, data], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Cadastrar a Despesa" });
        return res.status(201).json("Despesa Cadastrada!");
    });
});
exports.createDespesa = createDespesa;
// Atualiza a DESPESA
const updateDespesa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const despesaId = req.params.id;
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
    const q = `UPDATE despesas SET ${setFields.join(", ")} WHERE id=?;`;
    db_1.awsDB.query(q, [...Object.values(req.body).filter(value => value !== undefined), despesaId], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Atualizar a Despesa" });
        return res.status(200).json("Despesa Atualizada!");
    });
});
exports.updateDespesa = updateDespesa;
// Excluir a DESPESA
const deleteDespesa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const despesaId = req.params.id;
    const q = "DELETE FROM despesas WHERE id=?;";
    db_1.awsDB.query(q, [despesaId], (erro, data) => {
        if (erro)
            return res.status(500).json({ erro: "Erro ao Excluir o Desesa" });
        return res.status(200).json("Despesa Excluída!");
    });
});
exports.deleteDespesa = deleteDespesa;
