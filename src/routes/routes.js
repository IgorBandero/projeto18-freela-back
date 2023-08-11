import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { signInSchema, signUpSchema } from "../schemas/userSchemas.js";
import { login, registerUser } from "../controllers/userControllers.js";


const router = Router();

router.post("/signup", validationSchema(signUpSchema), registerUser);
router.post("/signin", validationSchema(signInSchema), login);

export default router;