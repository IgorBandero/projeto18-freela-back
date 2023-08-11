import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { userSchema } from "../schemas/userSchemas.js";
import { registerUser } from "../controllers/userControllers.js";


const router = Router();

router.post("/signup", validationSchema(userSchema), registerUser);

export default router;