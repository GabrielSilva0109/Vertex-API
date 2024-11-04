import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const generateSecretKey = (): string => {
    return crypto.randomBytes(32).toString('hex')
}

const JWT_SECRET: string = generateSecretKey()

console.log('Secret Key JWT:', JWT_SECRET)

// Gerar Token JWT
export const generateToken = (userId:  string): string => {
    const token = jwt.sign({userId}, JWT_SECRET, { expiresIn: '1h'})
    return token
}

// Middleware para verificar se o token é valido
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token de autenticação inválido' });
        }

        (req as any).userId = (decoded as { userId: string }).userId
        next()
    })
}