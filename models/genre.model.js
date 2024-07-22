const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;