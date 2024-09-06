import conn from "../config/conn.js" 
import { v4 as uuidv4 } from "uuid"

export const publicar = async (request, response) => {
 const { usuario_id, titulo, genero, desenvolvedor, data_lancamento } = request.body

 if (!usuario_id) {
  response.status(400).json({ message: "O usuario_id é obrigatório" })
  return
 }
 if (!titulo) {
  response.status(400).json({ message: "O titulo é obrigatório" })
  return
 }
 if (!genero) {
  response.status(400).json({ message: "O genero é obrigatório" })
  return
 }
 if (!desenvolvedor) {
  response.status(400).json({ message: "O desenvolvedor é obrigatório" })
  return
 }
 if (!data_lancamento) {
  response.status(400).json({ message: "A data_lancamento é obrigatória" })
  return
 }

 const checkSql = /*sql*/`SELECT * FROM produtos WHERE ?? = ?`
 const checkSqlData = ["titulo", titulo]
 conn.query(checkSql, checkSqlData, async (err, data) => {
  if (err) {
   console.error(err)
   response.status(500).json({ message: "Erro ao buscar titulo para cadastro do usuário" })
   return
  }

  if (data.length > 0) {
   response.status(409).json({ message: " O titulo já está em uso" })
   return
  }

  //Criar o usuario
  const id = uuidv4()
  const insertSql = /*sql*/`INSERT INTO produtos(??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)`
  const insertSqlData = [
   "produto_id",
   "usuario_id",
   "titulo",
   "genero",
   "desenvolvedor",
   "data_lancamento",
   id,
   usuario_id,
   titulo,
   genero,
   desenvolvedor,
   data_lancamento
  ]
  conn.query(insertSql, insertSqlData, (err) => {
   if (err) {
    console.error(err)
    response.status(500).json({ err: "Erro ao cadastrar produto" })
    return
   }
   response.status(201).json({ message: "produto cadastrado" })
  })
 })
}

export const listar = async(request, response)=>{
 const id = request.params.id
 const checkSql = /*sql*/`SELECT * FROM produtos WHERE ?? = ?`
 const checkSqlData = ["usuario_id", id]
 conn.query(checkSql, checkSqlData, (err, data)=>{
  if (err) {
   console.error(err)
   response.status(500).json({message:"Erro ao buscar usuário"})
   return
  }
  if (data.length === 0) {
   response.status(404).json({message:"Usuário não encontrado"})
   return
  }
  const produto = data
  response.status(200).json(produto)
 })

}
