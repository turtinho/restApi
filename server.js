import app from "./src/app.js"

//ou a porta é a constante que identifica a porta sendo escutada
//ou na porta 3000 (fizemos uma condição, através do pipe)
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Servidor Online, em http://localhost:${port}`)
})