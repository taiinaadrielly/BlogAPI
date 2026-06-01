import { RequestHandler } from "express"

export const getAllPosts: RequestHandler = async (req, res) => {
    return res.json({ message: 'obtendo todos os posts...' })
}

export const getPost: RequestHandler = async (req, res) => {
    return res.json({ message: `obtendo o post com slug: ${req.params.slug}` })
}

export const getRelatedPosts: RequestHandler = async (req, res) => {
    return  res.json({ message: `obtendo posts relacionados ao post com slug: ${req.params.slug}` })
}