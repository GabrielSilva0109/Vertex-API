import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/UserRoutes'
import walletRoutes from './routes/WalletRoutes'
import ativoRoutes from './routes/AtivoRoutes'
import despesaRoutes from './routes/DespesaRoutes'
import investimentoRoutes from './routes/InvestimentoRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3333 

app.use(cors())
app.use(express.json())

// Rotas principais
app.get('/', (req, res) => {
  res.send('Bem-vindo ao VertexBank!')
})

// Routes API AWS Cloud
app.use('/api', userRoutes, walletRoutes, ativoRoutes, despesaRoutes, investimentoRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})