import conn from "../config/conn.js";
import {v4 as uuid4} from "uuid"

//helpers
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js"

export const create = async (request, response)=>{

const {nome, categoria, peso, cor, descrição, preco} = request.body
const disponivel = 1

//buscar o tolcken do usuario
const tolken = getToken(request)
const usuario = await getUserByToken(tolken)

if (!nome) {
 return response.status(400).json({message: "O nome do objeto é obrigatorio"})
}
if (!categoria) {
 return response.status(400).json({message: "A categoria do objeto é obrigatorio"})
}
if (!peso) {
 return response.status(400).json({message: "O peso do objeto é obrigatorio"})
}
if (!cor) {
 return response.status(400).json({message: "A cor do objeto é obrigatorio"})
}
if (!descrição) {
 return response.status(400).json({message: "A descrição do objeto é obrigatorio"})
}
if (!preco) {
 return response.status(400).json({message: "O preço do objeto é obrigatorio"})
}

const objeto_id = uuid4() 
const usuario_id = usuario.usuario_id
const objetoSql = /*sql*/`INSERT INTO objetos(??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`

const objetoData = [
 "objeto_id",
 "nome",
 "categoria",
 "peso",
 "cor",
 "descrição",
 "disponivel",
 "preco",
 "usuario_id",
 objeto_id,
 nome,
 categoria,
 peso,
 cor,
 descrição,
 disponivel,
 preco,
 usuario_id
]

conn.query(objetoSql, objetoData, (err)=>{
 if (err) {
  console.error(err)
  response.status(500).json({message:"Erro ao adicionar objeto"})
  return
 }
})

 response.status(200).json("Chegou aqui")
}

//listar todos os objetos de um usuario
export const getAllObjectUser = async (request, response) =>{
 try {
  const tolken = getToken(request)
  const usuario =  await getUserByToken(tolken)

  const usuarioId = usuario.usuario_id
  const selectSql = /*sql*/`
  SELECT 
  obj.objeto_id,
  obj.usuario_id,
  obj.nome,
  obj.categoria,
  obj.peso,
  obj.descricao,
  obj.disponivel,
  obj.preco,
  GROUP_CONCAT(obj_img.image_path SEPARATOR ',') AS image_paths
  FROM 
  objetos AS obj
  LEFT JOIN
  objeto_images AS obj_img ON obj.objeto_id = obj_img.objeto_id
  WHERE 
  obj.usuario_id = ?
  GROUP BY
  obj.objeto_id, obj.usuario_id, obj.nome, obj.categoria, obj.descricao, obj.preco
  `
conn.query(selectSql, [usuarioId], (err, data)=>{
 if (err) {
  console.error(err)
  response.status(500).json({message: "Erro ao buscar os dados"})
  return
 }
 response.status(200).json(data)
})

 } catch (error) {
  
 }
}
