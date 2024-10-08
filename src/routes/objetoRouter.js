import { Router } from "express";
import { create } from "../controllers/objetoController.js";
import { getAllObjectUser } from "../controllers/objetoController.js";

const router = Router()

//helpers
import checkToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js"; 

router.post("/posts", checkToken, imageUpload.array("imagens", 10), create)
router.get("/myObjects", checkToken, getAllObjectUser)


export default router
