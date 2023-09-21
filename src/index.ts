import express, { NextFunction, Request } from "express";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get all posts
app.get("/posts", async (req, res, next) => {

})

// Create post
app.post("/posts", async (req, res, next) => {

})

// Get a post by id
app.get("/posts/:id", async(req, res, next) => {

})

// Update a post by id
app.patch("/posts/:id", async(req, res, next) => {

})

// Delete a post by id
app.delete("/posts/id", async(req, res, next) => {

})

// Get a user's post
app.get("/users/:id/posts", async(req, res, next) => {

})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server running on: ${PORT}`);
    console.log('====================================');
})