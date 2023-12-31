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

export async function newSession(token, userId){
    return db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, userId]);
}

export async function checkUserBySession(userId){
    return db.query(`SELECT * FROM sessions WHERE "userId"=$1;`, [userId]);
}

export async function deleteSession(userId){
    return db.query(`DELETE FROM sessions WHERE "userId"=$1;`, [userId]);
}

export async function checkUserByToken(token){
    return db.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);
}