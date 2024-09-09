import multer from "multer"
import { match } from "node:assert"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

//Estrutura e local as imagens
const imageStorage = multer.diskStorage({
 destination: (request, file, cb)=>{
  let folder = ''
  if (request.baseUrl.includes('usuarios')) {
   folder = 'usuarios'
  }else if(request.baseUrl.includes('objetos')){
   folder = 'objetos'
  }
  cb(null, path.join(__dirname, `../public/${folder}`))
 },
 filename: (request, file, cb)=>{
  //nome do arquivo
  cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
 }
})

//Executar a função para quardar as imagens
const imageUpload = multer({
 storage: imageStorage,
 fileFilter(request, file, cb){
  if (!file.originalname.match(/\.(png||jpg)$/)) {
   return cb(new Error('Por favor, envie apenas png ou jpg'))
  }
  cb(null, true)
 }
})

export default imageUpload

