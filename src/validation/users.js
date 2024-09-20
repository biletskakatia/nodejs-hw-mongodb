import Joi from "joi";

export const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
});