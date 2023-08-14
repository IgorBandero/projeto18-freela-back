

//#################################################################################################

import { newProduct } from "../repositories/productRepository.js";
import { checkUserByToken } from "../repositories/userRepository.js";

export async function registerProduct(req, res){

    let { name, image, category, description, price } = req.body;
    const { authorization } = req.headers; 
    const token = authorization?.replace("Bearer ", "");

    name = name.toLowerCase().trim();
    name = name.replace(/\b\w/g, (letter) => letter.toUpperCase());

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
