import { Request, Response } from 'express'
import { localDB } from '../db'
import bcrypt from 'bcrypt'


const generateRandomNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return randomNumber.toString();
}

//Return all Users
export const getUsers = (req: Request, res: Response) => {
    const q = "SELECT * FROM users;"

    localDB.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro in server AWS' })
        return res.status(200).json(data)
    })
}

//Return one User for ID
export const getUserById = (req: Request, res:Response) => {
    const q = "SELECT * FROM users WHERE `id`=?;"

    localDB.query(q, [req.params.id], (erro, data) => {
        if(erro) return res.status(500).json({erro: 'Erro get User for ID'})
        return res.status(200).json(data[0])
    })
}

//Create a new User
export const createUser = (req: Request, res: Response) => {
    const { name, password, email, birth, cpf, cep } = req.body

    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Required fields' })
    }

    const checkUser = "SELECT * FROM users WHERE cpf = ?"

    localDB.query(checkUser, [cpf], (erro, data) =>{
        if(erro) {
            return res.status(500).json({erro: "Erro ao verificar se o usuário já existe no sistema"})
        }

        // Se o usuário já existir, retorne um erro
        if (data.length > 0) {
            return res.status(400).json({ error: 'O CPF já está cadastrado no sistema' })
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const q = "INSERT INTO users (`name`, `password`,`email`,`birth`, `cpf`, `cep`) VALUES (?,?,?,?,?,?);"
        localDB.query(q, [name, hashedPassword, email, birth, cpf, cep], (erro, data) => {
            if (erro) return res.status(500).json({ erro: 'Erro ao criar um novo usuário' })

            const userId = data.insertId
            const contaNumber = generateRandomNumber()

            // Cria uma wallet para o novo usuário
            const walletQuery = "INSERT INTO wallets (`user_id`, `conta`, `saldo`) VALUES (?,?,?);"
            localDB.query(walletQuery, [userId, contaNumber, 0.00], async (walletError, walletData) => {
                if (walletError) {
                    return res.status(500).json({ error: 'Erro ao criar uma carteira para o usuário' })
                }
                return res.status(201).json('Usuário e carteira criados com sucesso')
            })
        })
    })
}

//Update data of User
export const updateUser = (req: Request, res: Response) => {
    const userId = req.params.id
    const { name, password, email, birth, cpf, cep, picture } = req.body

    if (!name && !password && !email && !birth && !cpf && !cep && !picture) {
        return res.status(400).json({ error: 'Nenhum dado de atualização fornecido' });
    }

    const updatedFields: Record<string, any> = {};

    if (name) updatedFields.name = name;
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10)
        updatedFields.password = hashedPassword
    }
    if (email) updatedFields.email = email
    if (birth) updatedFields.birth = birth
    if (cpf) updatedFields.cpf = cpf
    if (cep) updatedFields.cep = cep
    if (picture) updatedFields.picture = picture

    const fieldsToUpdate = Object.keys(updatedFields);
    const placeholders = fieldsToUpdate.map((field) => `${field}=?`).join(', ')

    const q = `UPDATE users SET ${placeholders} WHERE id=?`
    const values = [...fieldsToUpdate.map((field) => updatedFields[field]), userId]

    localDB.query(q, values, (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro of Update USER' })

        return res.status(200).json('USER Updated!!')
    })
}

//Deleta o Usuario
export const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.id

    const q = "DELETE FROM users WHERE `id`=?"
    localDB.query(q, [userId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: 'Erro of DELETE User' })
        return res.status(200).json('User Deleted!!')
    })
}

// Realiza o Login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { cpf, password } = req.body
        const q = "SELECT * FROM users WHERE cpf=?"

        const result: any[] = await new Promise((resolve, reject) => {
            localDB.query(q, [cpf], (error, result) => {
                if (error) {
                    console.error('Erro of get User:', error)
                    reject(error)
                } else {
                    if (result.length > 0) {
                        const user = result[0]
                        // Compara a senha fornecida com o hash armazenado no banco de dados
                        const passwordMatch = bcrypt.compareSync(password, user.password)

                        if (passwordMatch) {
                            res.status(200).json(user)
                        } else {
                            res.status(401).json({ message: 'Credenciais inválidas pela senha' })
                        }
                    } else {
                        res.status(401).json({ message: 'Credenciais inválidas result' })
                    }
                    resolve(result)
                }
            })
        })
    } catch (error) {
        console.error('Erro ao processar a solicitação de login:', error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

// // Adiciona Foto de Perfil ------------ TEST -------------
// export const updateUserPicture = (req: Request, res: Response) => {
//     const userId = req.params.id;
//     const { picture } = req.body;

//     if (!picture) {
//         return res.status(400).json({ error: 'Nenhuma imagem fornecida' })
//     }

//     const q = `UPDATE users SET picture=? WHERE id=?`
//     const values = [picture, userId]

//     localDB.query(q, values, (erro, data) => {
//         if (erro) return res.status(500).json({ erro: 'Erro ao Atualizar Foto do Usuário' })

//         return res.status(200).json('Foto do Usuário Atualizada!!')
//     })
// }