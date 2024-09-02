import "dotenv/config"
import express from "express"
import cors from "cors"

//importer a conexão com o banco de dados
import conn from "./config/conn.js"

//importar os modulos
import "./models/usuarioModel.js"

// importar as rotas
import usuarioRouter from "./routes/usuarioRouter.js"

const PORT = process.env.PORT || 3333
const app = express()

//3's middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//

//utilizar rotas
app.use("/usuarios", usuarioRouter)

app.use("*", (request, response) => {
 response.status(404).json({message:"Rota não encontrada"})
})

app.listen(PORT, () => {
 console.log(`Servidor on port ${PORT}`)
})
