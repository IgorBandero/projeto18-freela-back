import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().max(50).required(),
    cpf: Joi.string().pattern(/^\d{11}$/).required(),
    phone: Joi.string().regex(/^\d{10,11}$/).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(4).required()
})