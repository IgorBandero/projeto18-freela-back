import { db } from "../database/databaseConection.js";

export async function newProduct(name, image, category, description, userId, price){
    return db.query(`INSERT INTO products (name, image, category, description, "userId", 
                     price) VALUES ($1, $2, $3, $4, $5, $6);`, 
                     [name, image, category, description, userId, price]);
}

export async function listProducts(){
    return db.query(`SELECT * FROM products;`);
}