import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    image: Joi.string().uri().required(), 
    category: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(3).max(200),
    price: Joi.string().regex(/^[1-9]\d{0,2}(\.\d{3})*,\d{2}$/).required(),
});