import { db } from "../database/databaseConection.js";

export async function newProduct(name, image, category, description, userId, price){
    return db.query(`INSERT INTO products (name, image, category, description, "userId", 
                     price) VALUES ($1, $2, $3, $4, $5, $6);`, 
                     [name, image, category, description, userId, price]);
}

export async function listProducts(){
    return db.query(`SELECT * FROM products;`);
}

export async function listProductsUser(userId){
    return db.query(`SELECT * FROM products WHERE "userId"=$1;`, [userId]);
}

export async function getProductById(id){
    return db.query(`SELECT * FROM products WHERE id=$1;`, [id]);
}

export async function deleteProductById(id){
    return db.query(`DELETE FROM products WHERE id=$1;`, [id]);
}