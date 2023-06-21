import Joi, { Schema } from 'joi';

const loginSchema: Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const registerSchema: Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().allow('').required(),
    picture_url: Joi.string().uri().required(),
});


export default {
    loginSchema: loginSchema as Schema,
    registerSchema: registerSchema as Schema
};
