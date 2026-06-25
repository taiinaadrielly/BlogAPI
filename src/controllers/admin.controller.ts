import { RequestHandler, Response } from "express"
import { ExtendedRequest } from '../types/extended-request'
import z from 'zod'
import { getUserById } from '../services/user.service'
import { handleCover } from "../services/post.service"

export const addPost = async (req: ExtendedRequest, res: Response) => {
	if (!req.user) return

	const schema = z.object({
		title: z.string(),
		tags: z.string(),
		body: z.string()
	})
	const data = schema.safeParse(req.body)
	if (!data.success) {
		return res.status(400).json({ error: data.error.flatten().fieldErrors })
	}

	if(!req.file) {
		return res.status(400).json({ error: 'Image is required' })
	}

	const coverName = await handleCover(req.file)
	if(!coverName) {
		return res.status(400).json({ error: 'Invalid cover image' })
	}
}

export const editPost: RequestHandler = async (req, res) => {
// Lógica para editar um post existente
}

export const deletePost: RequestHandler = async (req, res) => {
// Lógica para deletar um post
}

export const getAllPosts: RequestHandler = async (req, res) => {
// Lógica para obter todos os posts
}

export const getPost: RequestHandler = async (req, res) => {
// Lógica para obter um post específico