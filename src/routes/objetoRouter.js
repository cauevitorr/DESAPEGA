import { Router } from "express";
import { create } from "../controllers/objetoController.js";

const router = Router()

//helpers
import checkToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js"; 

router.post("/post", checkToken, imageUpload.array("imagens", 10), create)

export default router
