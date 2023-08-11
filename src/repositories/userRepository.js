import { db } from "../database/databaseConection.js";

export async function newUser(name, cpf, phone, email, password){
    return db.query(`INSERT INTO users (name, cpf, phone, email, password) VALUES ($1, $2, $3, $4, $5);`, [name, cpf, phone, email, password]);
}

export async function checkUserByEmail(email){
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

export async function checkUserByCPF(cpf){
    return db.query(`SELECT * FROM users WHERE cpf = $1;`, [cpf]);
}