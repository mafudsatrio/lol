import Joi from 'joi';

const request = {
    validate: {
        payload: Joi.object({
            name: Joi
                .string()
                .required()
                .messages({
                    "any.required": "Mohon isi nama buku",
                    "string.base": "Nama buku harus berupa teks",
                }),
            year: Joi
                .number()
                .required()
                .messages({
                    "any.required": "Mohon isi tahun terbit buku",
                    "number.base": "Tahun terbit buku harus berupa angka",
                }),
            author: Joi
                .string()
                .required()
                .messages({
                    "any.required": "Mohon isi nama penulis buku",
                    "string.base": "Nama penulis buku harus berupa teks",
                }),
            summary: Joi
                .string()
                .required()
                .messages({
                    "any.required": "Mohon isi summary buku",
                    "string.base": "Summary buku harus berupa teks",
                }),
            publisher: Joi
                .string()
                .required()
                .messages({
                    "any.required": "Mohon isi nama penerbit buku",
                    "string.base": "Nama penerbit buku harus berupa teks",
                }),
            pageCount: Joi
                .number()
                .required()
                .messages({
                    "any.required": "Mohon isi jumlah halaman buku",
                    "number.base": "Jumlah halaman buku harus berupa angka",
                }),
            readPage: Joi
                .number()
                .required()
                .messages({
                    "any.required": "Mohon isi jumlah halaman yang sudah dibaca",
                    "number.base": "Jumlah halaman yang sudah dibaca harus berupa angka",
                }),
            reading: Joi
                .boolean()
                .required()
                .messages({
                    "any.required": "Mohon isi status membaca buku",
                    "boolean.base": "Status membaca buku harus berupa boolean",
                }),
        }),
        failAction: (request, h, error) => {
            const errors = error.details[0].message;
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. " + errors,
            }).code(400).takeover();
        },
    }
}

export default request;