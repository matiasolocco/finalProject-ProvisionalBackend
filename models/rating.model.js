const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;