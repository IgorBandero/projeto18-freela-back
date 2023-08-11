import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { checkUserByCPF, checkUserByEmail, newSession, newUser } from "../repositories/userRepository.js";

//#################################################################################################

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
        // Criptografar a senha e registrar usuário no banco de dados
        const cryptedPassword = bcrypt.hashSync(password, 10);
        const user = await newUser(name, cpf, phone, email, cryptedPassword)
        res.status(201).send({message: "Usuário registrado com sucesso!"});
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

//#################################################################################################

export async function login(req, res){

    const { email, password } = req.body;

    try{
        // Verificar se email está cadastrado
        const user = await checkUserByEmail(email);
        if (user.rowCount === 0) {
            return res.status(401).send({ message: "E-mail não cadastrado!"});
        }
        // Verificar se a senha está correta
        const correctPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!correctPassword){
            return res.status(401).send({ message: "Senha incorreta!" })
        }
        // Gerar um token e salvar sessão (token) no banco de dados
        const token = uuid();
        await newSession(token, user.rows[0].id);
        res.status(200).send({ token });
    }
    catch(error){
        res.status(500).send(error.message);
    }
}