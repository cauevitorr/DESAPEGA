import { Router } from "express" //express
import { publicar, listar } from "../controllers/produtoController.js"

//MIDDLEWARES
import verifyToken from "../helpers/verify-token.js"

const router = Router()

router.post("/publicar", verifyToken, publicar)
router.get("/lista/:id", listar)

export default router
