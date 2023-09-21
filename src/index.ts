import express from "express";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get all posts
app.get("/posts", async (req, res, next) => {
    try {
        const posts = await prismaClient.post.findMany({
            where: {
                published: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        res.send(posts)
    } catch(err: any) {
        next(err.message)
    }
})

// Create post
app.post("/posts", async (req, res, next) => {
    try {
        const post = await prismaClient.post.create({
            data: {
                authorId: 1,
                ...req.body
            }
        })

        res.json(post)
    } catch(err: any) {
        next(err.message)
    }
})

// Get a post by id
app.get("/posts/:id", async(req, res, next) => {
    try {
        const post = await prismaClient.post.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })

        res.json(post)
    } catch(err: any) {
        next(err.message)
    }
})

// Update a post by id
app.patch("/posts/:id", async(req, res, next) => {
    try {
        const post = await prismaClient.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })

        res.json(post)
    } catch(err: any) {
        next(err.message)
    }
})

// Delete a post by id
app.delete("/posts/:id", async(req, res, next) => {
    try {
        const posts = await prismaClient.post.delete({
            where: {
                id: Number(req.params.id)
            }
        })
    } catch(err: any) {
        next(err.message)
    }
})

// Get a user's post
app.get("/users/:id/posts", async(req, res, next) => {
    try {
        const userPosts = await prismaClient.user.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                posts: {
                    where: { published: true }
                }
            }
        
        })

        const posts = userPosts?.posts
        res.json(posts)
    } catch(err: any) {
        next(err.message)
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server running on: ${PORT}`);
    console.log('====================================');
})