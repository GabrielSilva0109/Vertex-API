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
const express_1 = __importDefault(require("express"));
const WalletController_1 = require("../controllers/WalletController");
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.get('/wallets', WalletController_1.getWallets);
router.get('/wallet/:id', WalletController_1.getWalletById);
router.get('/walletUser/:id', WalletController_1.getWalletByIdUser);
router.post('/wallet', WalletController_1.createWallet);
router.put('/wallet/:id', WalletController_1.updateWallet);
router.delete('/wallet/:id', WalletController_1.deleteWallet);
router.get('/acoesBrasileiras', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://query1.finance.yahoo.com/v7/finance/quote', {
            params: {
                symbol: 'PETR4.SA',
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Erro ao buscar dados das ações brasileiras:');
        res.status(500).json({ error: 'Erro ao buscar dados das ações brasileiras' });
    }
}));
exports.default = router;
