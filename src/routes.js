import BookController from './controllers/BookController.js';
import BookStoreValidator from './validators/BookStoreValidator.js';
import BookUpdateValidator from './validators/BookUpdateValidator.js';

const routes = [
    {
        method: 'get',
        path: '/books',
        handler: async (request, h) => await BookController.getAllData(request, h),
    },
    {
        method: 'get',
        path: '/books/{id}',
        handler: async (request, h) => await BookController.getDetail(request, h),
    },
    {
        method: 'post',
        path: '/books',
        handler: async (request, h) => await BookController.store(request, h),
        config: BookStoreValidator,
    },
    {
        method: 'put',
        path: '/books/{id}',
        handler: async (request, h) => await BookController.update(request, h),
        config: BookUpdateValidator,
    },
    {
        method: 'delete',
        path: '/books/{id}',
        handler: async (request, h) => await BookController.destroy(request, h),
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (req, res) => {
            return 'Halaman tidak ditemukan';
        },
    },
];
 
export default routes;
