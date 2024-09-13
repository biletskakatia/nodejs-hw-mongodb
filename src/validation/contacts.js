import Joi from "joi";
import { contactTypeList, emailRegexp } from "../constants/contacts.js";

export const addContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().pattern(emailRegexp).optional().messages({
        "string.pattern.base": "Please fill a valid email address"
    }),
    isFavourite: Joi.boolean().optional() ,
    contactType:Joi.string().valid(...contactTypeList).optional()
});

export const patchContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    phoneNumber: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().pattern(emailRegexp).optional().messages({
        "string.pattern.base": "Please fill a valid email address",
    }),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid(...contactTypeList).optional()
});