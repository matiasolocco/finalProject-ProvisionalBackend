const express = require('express');
const router = express.Router();
const genreController = require('../controllers/author.controller');

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Ruta para agregar un nuevo vehículo (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), authorController.addAuthor);

// Ruta para obtener todos los vehículos (accesible para cualquier usuario)
router.get('/', authorController.getAllauthors);

// Ruta para obtener un vehículo específico (accesible para cualquier usuario)
router.get('/:id', authorController.getAuthor);

// Ruta para actualizar un vehículo (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), authorController.updateAuthor);

// Ruta para eliminar un vehículo (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), genreController.deleteGenre);

module.exports = router;