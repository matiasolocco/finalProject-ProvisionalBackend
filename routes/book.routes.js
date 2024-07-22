const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Middleware para proteger rutas
const { protect, restrictTo, restrictToSelf } = require('../middlewares/auth.middlware');

// Ruta para crear una nueva reserva (accesible solo para usuarios autenticados)
router.post('/', protect, bookController.createBook);

// Ruta para obtener todas los libros de un usuario específico (accesible solo para el usuario correspondiente o administradores)
router.get('/user/:userId', protect, restrictToSelf, restrictTo('admin', 'user'), bookController.getBooksByUser);

// Ruta para obtener todas las reseñas de un usuario específico (accesible solo para el usuario correspondiente o administradores)
router.get('/user/:userId', protect, restrictToSelf, restrictTo('admin', 'user'), ratingController.getRatingsByUser);

// Ruta para eliminar una reseña (accesible solo para user o admin)
router.delete('/:id', protect, restrictToSelf, restrictTo('admin', 'user'), ratingController.deleteRating);

// Ruta para eliminar un libro (accesible solo para admin)
router.delete('/:id', protect, restrictToSelf, restrictTo('admin'), bookController.deleteBook);

// Nueva ruta para obtener todos los libros (admin y user)
router.get('/', protect, restrictTo('admin', 'user'), bookController.getAllBooks);

// Nueva ruta para obtener todas las reseñas (admin y user)
router.get('/', protect, restrictTo('admin', 'user'), ratingController.getAllRatings);

// Ruta para actualizar un libro por su  ID (solo admin)
router.patch('/update:id', protect, restrictToSelf, restrictTo('admin'), bookController.updateBook);

// Ruta para actualizar una reseña por su  ID (solo admin)
router.patch('/update/:id', protect, restrictToSelf, restrictTo('admin'), ratingController.updateRating);

module.exports = router;