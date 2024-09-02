import { Router } from "express" //express
import { checkUser, login, register } from "../controllers/usuarioController.js"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/checkuser", checkUser)

export default router
