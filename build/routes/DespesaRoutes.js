"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DespesaController_1 = require("../controllers/DespesaController");
const router = express_1.default.Router();
router.get('/despesas', DespesaController_1.getDespesas);
router.get('/despesa/:id', DespesaController_1.getDespesaById);
router.get('/despesasWallet/:id', DespesaController_1.getDespesasByWalletId);
router.post('/despesa', DespesaController_1.createDespesa);
router.put('/despesa/:id', DespesaController_1.updateDespesa);
router.delete('/despesa/:id', DespesaController_1.deleteDespesa);
exports.default = router;
