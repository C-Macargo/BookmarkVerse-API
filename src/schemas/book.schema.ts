import Joi, { Schema } from 'joi';

const bookSchema: Schema = Joi.object({
    title: Joi.string().required(),
});

export default {
    booksSchema: bookSchema as Schema,
};