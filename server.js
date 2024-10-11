import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

const users = []

app.get("/usuarios", async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.post("/usuarios", async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json(user)
})

app.put("/usuarios/:id", async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            mail: req.body.email,
            age: req.body.age,
            name: req.body.name,
        },
    })

    res.status(200).json(user)
})

app.delete("/usuarios/:id", async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
    res.status(200).json({ message: "User deleted" })
})

app.listen(3000)