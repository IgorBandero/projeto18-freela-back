import bcrypt from "bcrypt";
import { checkUserByCPF, checkUserByEmail, newUser } from "../repositories/userRepository.js";


export async function registerUser(req, res){

    const { name, cpf, phone, email, password } = req.body;

    try{

        // Checar se email já cadastrado
        const emailInUse =  await checkUserByEmail(email);
        if (emailInUse.rowCount !== 0){
            return res.status(409).send({message: "E-mail já cadastrado no sistema!"});
        }
        // Checar se cpf já cadastrado
        const cpfInUse =  await checkUserByCPF(cpf);
        if (cpfInUse.rowCount !== 0){
            return res.status(409).send({message: "CPF já cadastrado no sistema!"});
        }

        const cryptedPassword = bcrypt.hashSync(password, 10);
        const user = await newUser(name, cpf, phone, email, cryptedPassword)
        res.status(201).send({message: "Usuário registrado com sucesso!"});
    }
    catch(error){
        res.status(500).send(error.message);
    }
}