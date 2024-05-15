"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InvestimentoController_1 = require("../controllers/InvestimentoController");
const router = express_1.default.Router();
router.get('/investimentos', InvestimentoController_1.getInvestimentos);
router.get('/investimento/:id', InvestimentoController_1.getInvestimentoById);
router.get('/walletInvestimentos/:id', InvestimentoController_1.getInvestimentoByWalletId);
router.post('/investimento', InvestimentoController_1.createInvestimento);
router.put('/investimento/:id', InvestimentoController_1.updateInvestimento);
router.delete('/investimento/:id', InvestimentoController_1.deleteInvestimento);
exports.default = router;
