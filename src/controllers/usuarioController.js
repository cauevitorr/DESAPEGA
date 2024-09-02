import conn from "../config/conn.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { response } from "express"
import jwt from "jsonwebtoken"
//helpers
import createUserToken from "../helpers/create-user-token.js"
import getToken from "../helpers/get-token.js"


export const register = async (request, response) => {
 const { nome, email, telefone, senha, confirmaSenha } = request.body

 if (!nome) {
  response.status(400).json({ message: "O nome é obrigatório" })
  return
 }
 if (!email) {
  response.status(400).json({ message: "O email é obrigatório" })
  return
 }
 if (!telefone) {
  response.status(400).json({ message: "O telefone é obrigatório" })
  return
 }
 if (!senha) {
  response.status(400).json({ message: "A senha é obrigatória" })
  return
 }
 if (!confirmaSenha) {
  response.status(400).json({ message: "A confirmação de senha é obrigatória" })
  return
 }
 if (!email.includes("@")) {
  response.status(409).json({ message: "Email inválido" })
  return
 }
 if (senha !== confirmaSenha) {
  response.status(409).json({ message: "A confirmação de senha deve ser igual senha" })
  return
 }

 const checkSql = /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
 const checkSqlData = ["email", email]
 conn.query(checkSql, checkSqlData, async (err, data) => {
  if (err) {
   console.error(err)
   response.status(500).json({ message: "Erro ao buscar email para cadastro do usuário" })
   return
  }

  if (data.length > 0) {
   response.status(409).json({ message: " O email já está em uso" })
   return
  }

  //Fazer registro
  const salt = await bcrypt.genSalt(12)
  // console.log(salt)
  const senhaHash = await bcrypt.hash(senha, salt)
  // console.log("Senha digitada: " + senha)
  // console.log("Senha com hash:  "+ senhaHash)

  //Criar o usuario
  const id = uuidv4()
  const usuario_img = "userDefault.png"
  const insertSql = /*sql*/`INSERT INTO usuarios(??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)`
  const insertSqlData = [
   "usuario_id",
   "nome",
   "email",
   "telefone",
   "senha",
   "imagem",
   id,
   nome,
   email,
   telefone,
   senhaHash,
   usuario_img
  ]
  conn.query(insertSql, insertSqlData, (err) => {
   if (err) {
    console.error(err)
    response.status(500).json({ err: "Erro ao cadastrar usuário" })
    return
   }
   //1º Criar token
   //2º passar o token para o fron-end
   const usuarioSQL = /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
   const usuarioData = ["usuario_id", id]
   conn.query(usuarioSQL, usuarioData, async (err, data)=>{
    if(err){
     console.error(err)
     response.status(500).json({err:"Erro ao fazer login"})
     return
    }
    const usuario = data[0]
    try{
     await createUserToken
    } catch(error){
     console.error(error)
     response.status(500).json({err: "Erro ao processar requisição"})
    }
   })
   response.status(201).json({ message: "Usuário cadastrado" })
  })
 })
}

export const login = (request, response) => {
 const { email, senha } = request.body

 if (!email) {
  response.status(400).json({ message: "O email é obrigatório" })
  return
 }
 if (!senha) {
  response.status(409).json({ message: "A confirmação de senha deve ser igual senha" })
  return
 }

 const checkEmailSql = /*sql*/` SELECT * FROM usuarios WHERE ?? = ?`
 const checkEmailSqlData = ["email", email]
 conn.query(checkEmailSql, checkEmailSqlData, async (err, data) => {
  if (err) {
   console.error(err)
   response.status(500).json({ err: "Erro ao fazer login" })
   return
  }

  if (data.length === 0) {
   response.status(500).json({ err: "e-email não cadastrado" })
   return
  }

  const usuario = data[0]
  console.log(usuario)

  //Comparar Senhas
  const comparaSenha = await bcrypt.compare(senha, usuario.senha)
  console.log("comparar senha : ", comparaSenha)
  if (!comparaSenha) {
   response.status(401).json({message:"Senha inválida"})
   return
  }
  //1º Criar token
  try{
   createUserToken(usuario, request, response)
  }catch(error){
   console.error(error)
   response.status(500).json({err:"Erro ao processar a informação"})
  }
 })
}

// checkUser -> verificar os usuários logado na pulblicação
export const checkUser = async (request, response) =>{
 let usuarioAtual
 if (request.headers.authorization) {
  //extrair o token
  const token = getToken(request)
  // console.log(token)
  //descriptografar o token jwt.decode
  const decode = jwt.decode(token, "SenhaSuperSegura")
  console.log(decode)

  const usuarioId = decode.id
  const selectSql = /*sql*/` SELECT nome, email, telefone, imagem FROM usuarios WHERE ?? = ? `
  const selectData = ["usuario_id",usuarioId]
  conn.query(selectSql, selectData, (err, data)=>{
   if (err) {
    console.error(err)
    response.status(500).json({err:"Evento ao verificar usuário"})
    return
   }
   usuarioAtual = data[0]
   response.status(200).json(usuarioAtual)
  })
 }else{
  usuarioAtual = null
  response.status(200).json(usuarioAtual)
 }
}
// getUserById -> Verificar usuário
export const getUserById = async(request, response)=>{

}
//editedUser -> controlador protegido, contem imagen
export const editedUser = async (request, response)=>{

} 
