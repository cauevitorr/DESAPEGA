const getToken = (request)=>{
 //extrair token
 const authHeader = request.headers.authorization
 //(baerer token)
 const token = authHeader.split(" ")[1]
 return token
}
export default getToken
