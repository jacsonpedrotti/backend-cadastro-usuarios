import express from "express"

const app = express()
app.use(express.json())

const users = []

app.get("/usuarios", (request, response) => {

    response.status(200).json(users)
})

app.post("/usuarios", (request, response) => {
    users.push(request.body)

    response.status(201).json({ message: "Usuário criado com sucesso!" })
})

app.listen(3000)