import { RequestHandler } from "express"
import { z } from "zod"
import { createUser } from "../services/user.service"
import { createUser, verifyUser } from "../services/user.service"
import { createToken } from "../services/auth.service"

export const signIn: RequestHandler = (req, res) => {
	// Lógica para autenticar o usuário
export const signIn: RequestHandler = async (req, res) => {
	const schema = z.object({
		email: z.string().email(),
		password: z.string()
	})
	const data = schema.safeParse(req.body)
	if (!data.success) {
		return res.status(400).json({ error: data.error.flatten().fieldErrors})
	}
	const user = await verifyUser(data.data)
	if (!user) {
		return res.status(400).json({ error: 'Email ou senha inválidos'})
	}
	const token = createToken(user)
	res.json({
		message: 'Login bem-sucedido',
		user: {
			id: user.id,
			name: user.name,
			email: user.email
		},
		token
	})
}

export const signUp: RequestHandler = async (req, res) => {
@@ -21,7 +43,7 @@ export const signUp: RequestHandler = async (req, res) => {
return res.status(400).json({ error: 'Email já cadastrado'})
}

	const token = '123'
	const token = createToken(newUser)
res.status(201).json({
message: 'Usuário criado com sucesso',
user: {