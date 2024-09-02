import jwt  from "jsonwebtoken" //importaçõa

const createUserToken = async (usuario, request, response)=>{
 //Criar o token
 const token = jwt.sign({
  nome: usuario.name,
  id: usuario.usuario_id
 },
 "SenhaSuperSegura",//Senha de criptografia
 )
 //Retornar o token
 response.status(200).json({
  message:"Você está autenticado",
  token: token,
  usuarioId: usuario.usuario_id
 })
}

export default createUserToken
