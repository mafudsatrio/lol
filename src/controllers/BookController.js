import Book from '../models/Book.js';
import { nanoid } from 'nanoid'

class BookController {
    async getAllData(request, h) {
        const data = Book;

        return h.response({
            "status": "success",
            "data": {
                "books": data.map((book) => ({
                    "id": book.id,
                    "name": book.name,
                    "publisher": book.publisher,
                })),
            },
        }).code(200);
    }

    async getDetail(request, h) {
        const { id } = request.params;
        const book = Book.filter((n) => n.id === id)[0];

        if (book !== undefined) {
            return h.response({
                "status": "success",
                "data": {
                    "book": book,
                },
            }).code(200);
        } else {
            return h.response({
                "status": "fail",
                "message": "Buku tidak ditemukan",
            }).code(404);
        }
    }

    async store(request, h) {
        const data = request.payload;
        data.id = nanoid(16); 
        data.finished = data.readPage === data.pageCount ? true : false;
        data.insertedAt = new Date().toISOString();
        data.updatedAt = data.insertedAt;

        // Check if readPage is greater than pageCount
        if (data.readPage > data.pageCount) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
        }
        
        // Save book
        Book.push(data);

        return h.response({
            "status": "success",
            "message": "Buku berhasil ditambahkan",
            "data": {
                "bookId": data.id,
            }
        }).code(201);
    }

    async update(request, h) {
        const { id } = request.params;
        const data = request.payload;
        const index = Book.findIndex((book) => book.id === id);

        data.finished = data.readPage === data.pageCount ? true : false;
        data.insertedAt = new Date().toISOString();
        data.updatedAt = data.insertedAt;

        // Check if readPage is greater than pageCount
        if (data.readPage > data.pageCount) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
        }

        // Update book
        if (index !== -1) {
            Book[index] = {
                ...Book[index],
                ...data,
            };
        } else {
            return h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. Id tidak ditemukan",
            }).code(404);
        }
        return h.response({
            "status": "success",
            "message": "Buku berhasil diperbarui",
            "data": Book[index],
        }).code(200);
    }

    async destroy(request, h) {
        const { id } = request.params;
        const index = Book.findIndex((book) => book.id === id);

        if (index !== -1) {
            Book.splice(index, 1);
            return h.response({
                "status": "success",
                "message": "Buku berhasil dihapus",
            }).code(200);
        } else {
            return h.response({
                "status": "fail",
                "message": "Buku gagal dihapus. Id tidak ditemukan",
            }).code(404);
        }
    }
}

export default new BookController;