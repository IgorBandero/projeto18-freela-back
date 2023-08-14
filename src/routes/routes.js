import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { signInSchema, signUpSchema } from "../schemas/userSchemas.js";
import { login, registerUser } from "../controllers/userControllers.js";
import { productSchema } from "../schemas/productSchemas.js";
import { registerProduct, getProducts } from "../controllers/productControllers.js";


const router = Router();

router.post("/signup", validationSchema(signUpSchema), registerUser);
router.post("/signin", validationSchema(signInSchema), login);
router.post("/products", validationSchema(productSchema), registerProduct);
router.get("/products", getProducts);

export default router;