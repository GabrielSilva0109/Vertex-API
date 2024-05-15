"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AtivoController_1 = require("../controllers/AtivoController");
const router = express_1.default.Router();
router.get('/ativos', AtivoController_1.getAtivos);
router.get('/ativo/:id', AtivoController_1.getAtivoById);
router.get('/ativosWallet/:id', AtivoController_1.getAtivosByWalletId);
router.post('/ativo', AtivoController_1.createAtivo);
router.put('/ativo/:id', AtivoController_1.updateAtivo);
router.delete('/ativo/:id', AtivoController_1.deleteAtivo);
exports.default = router;
