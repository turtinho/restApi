import express from 'express';
import db from '../src/services/dbConnect.js';
import series from './models/Serie.js'

// criar a conexão e prever um possível erro
db.on("error",console.log.bind(console,'Não foi possível concectar'))
// intrução de abertura de conxão
db.once("open", ()=>{
    console.log("Banco conectado")
})

const app = express();

app.use(express.json())

const filmes = [
    {id:1, 'titulo':'Harry Potter'},
    {id:2, 'titulo':'Vingadores'},
    {id:3, 'titulo':'Velozes e Furiosos'}
]

//------------------------ BUSCA POR ID ------------------------
app.get('/series/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const seriesIdResult = await series.findById(id);
      res.status(200).send(seriesIdResult);
    } catch (err) {
      res.status(500).send(err);
    }
  });
//------------------------ BUSCA TOTAL ------------------------

app.get('/',(req,res) =>{
    res.status(200).send("IteFlix Online")
})

app.get('/filmes',(req,res)=>{
    res.status(200).json(filmes)
})

app.get('/series', async (req, res) => {
    try {
        const seriesResult = await series.find();
        res.status(200).json(seriesResult)
    } catch (err) {
        res.status(500).json(err);
    }
})

//------------------------ GRAVANDO ------------------------

app.post('/series', async (req, res) => {
    try {
      let serie = new series(req.body);
      await serie.save();
      res.status(201).send(serie);
    } catch (error) {
      res.status(400).send(error);
    }
  })

app.post('/filmes',(req,res)=>{
    filmes.push(req.body)
    res.status(201).send("Filme cadastrado com sucesso")
})

//------------------------ ALTERANDO ------------------------

//passa por parâmtro o id que vem da requisição

app.put('/series/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const serieAtualizada = await series.findByIdAndUpdate(id, {$set: req.body}, {new: true});
      res.status(200).send({message: "Série atualizada com sucesso", serieAtualizada});
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  });

//------------------------ APAGANDO ------------------------

//atribuição por desestruturação
app.delete('/series/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deletedSeries = await series.findByIdAndDelete(id);
      if (deletedSeries) {
        res.status(200).send({ message: "Série removida com sucesso" });
      } else {
        res.status(404).send({ message: "Série não encontrada" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

export default app
