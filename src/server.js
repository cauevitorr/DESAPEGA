import "dotenv/config"
import express from "express"
import cors from "cors"
import path from "node:path"
import { fileURLToPath } from "node:url"

//importer a conexão com o banco de dados
import conn from "./config/conn.js"
//

//importar os modulos
import "./models/usuarioModel.js"
import "./models/produtoModel.js"
import "./models/objetoModel.js"
import "./models/objetoImagensModel.js"
//

// importar as rotas
import usuarioRouter from "./routes/usuarioRouter.js"
import produtoRouter from "./routes/produtoRouter.js"
import objetoRouter from "./routes/objetoRouter.js"
//

const PORT = process.env.PORT || 3333
const app = express()

//Apontar para a pasta pulbic
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//3  middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//

// console.log("filename: " + __filename)
// console.log("dirname: " + __dirname)

//Pasta para os arquivos estáticos
app.use("../public", express.static(path.join(__dirname, "public")))

//utilizar rotas
app.use("/usuarios", usuarioRouter)
app.use("/produtos", produtoRouter)
app.use("/objetoImages", objetoRouter)

app.use("*", (request, response) => {
 response.status(404).json({message:"Rota não encontrada"})
})

app.listen(PORT, () => {
 console.log(`Servidor on port ${PORT}`)
})
