import mongoose from "mongoose";

// neste Schema, estamos determinando que o id é autogerável
// e a inserção de um título, é requerida.
const serieSchema = new mongoose.Schema({
    id:{type: String},
    titulo:{type: String, required: true},
    genero:{type: String, required: true},
    temporadas:{type: String, required: true},
});

const series = mongoose.model('series',serieSchema)

export default series;

