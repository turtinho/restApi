import mongoose from "mongoose";

mongoose.connect("Caminho do banco aqui");

let db = mongoose.connection;

export default db;

