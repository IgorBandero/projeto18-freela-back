import { listProducts, listProductsUser, newProduct } from "../repositories/productRepository.js";
import { checkUserByToken } from "../repositories/userRepository.js";

//#################################################################################################

export async function registerProduct(req, res){

    let { name, image, category, description, price } = req.body;
    const { authorization } = req.headers; 
    const token = authorization?.replace("Bearer ", "");

    name = name.toLowerCase().trim();
    name = name.charAt(0).toUpperCase() + name.slice(1);

    category = category.toLowerCase().trim();
    category = category.charAt(0).toUpperCase() + category.slice(1);

    description = description.toLowerCase().trim();
    description = description.charAt(0).toUpperCase() + description.slice(1);

    try{

        const userSession = await checkUserByToken(token);
        if (userSession.rowCount === 0){
            return res.status(404).send("Usuário não está logado!");
        }
        const userId = userSession.rows[0].userId;
        await newProduct(name, image, category, description, userId, price);
        res.status(201).send("Produto registrado com sucesso!");
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

//#################################################################################################

export async function getProducts(req, res){

    try{
        const products = await listProducts();
        res.send(products.rows);
    }catch(error){
        return res.status(500).send(error.message);
    }
}

//#################################################################################################

export async function getProductsUser(req, res){ 

    const { userId } = req.params;
    const { authorization } = req.headers; 
    const token = authorization?.replace("Bearer ", "");

    try{
        // verificar se o token é do userId
        const userSession = await checkUserByToken(token);
        if (Number(userId) !== userSession.rows[0].userId){
            return res.status(403).send("Acesso negado!");
        }
        const products = await listProductsUser(userId);
        res.send(products.rows);
    }catch(error){
        return res.status(500).send(error.message);
    }
}