const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: URL,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    },

    //DATOS RELACIONALES
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        required: true
    },
});


const Booking = mongoose.model('Book', bookSchema);

module.exports = Booking;

/*export interface Book {
    _id: string
    title: string
    author: Author
    genre: Genre
    image: string
    publicationYear: number //No utilizo Date para evitar conflictos con BBDD -  en su lugar solamente escribir el año de cuándo se ha publicado
    synopsis: string
    rating: number // será un valor probablemente decimal
 
 }*/
