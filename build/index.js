"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const WalletRoutes_1 = __importDefault(require("./routes/WalletRoutes"));
const AtivoRoutes_1 = __importDefault(require("./routes/AtivoRoutes"));
const DespesaRoutes_1 = __importDefault(require("./routes/DespesaRoutes"));
const InvestimentoRoutes_1 = __importDefault(require("./routes/InvestimentoRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas principais
app.get('/', (req, res) => {
    res.send('Bem-vindo ao VertexBank!');
});
// Routes API AWS Cloud
app.use('/api', UserRoutes_1.default, WalletRoutes_1.default, AtivoRoutes_1.default, DespesaRoutes_1.default, InvestimentoRoutes_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
