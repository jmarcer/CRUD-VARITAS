const express = require("express");
const fs = require("fs")

const app = express();
const PORT = 3003;

const ruta= __dirname + '/db/varitas.txt';

app.use(express.json());

app.get( '/', async (req, res) => {
    const varitas = await fs.promises.readFile( ruta , "utf-8")
    console.log(JSON.parse(varitas));
    res.json(JSON.parse(varitas))

})

app.get('/:id' , async (req, res) => {
    const varitas = await fs.promises.readFile( ruta , "utf-8")
    console.log(req.params.id);
    const id= req.params.id;
    const varitasParseadas = JSON.parse(varitas)
    const varita = varitasParseadas.filter(varita => varita.id === parseInt(id))
    res.json(varita)

})

app.post('/' , async (req, res)=>{
const varitas = await fs.promises.readFile( ruta , "utf-8");
const varitasParseadas = JSON.parse(varitas)
const varita = req.body;
console.log('varita ' + varita);
varitasParseadas.push(varita)
await fs.promises.writeFile(ruta, JSON.stringify(varitasParseadas))
console.log(varita);
res.json(varita)

})

app.delete('/:id', async (req, res) => {
    const varitas = await fs.promises.readFile(ruta, 'utf-8');
    const varitasParseadas = JSON.parse(varitas)
    const id = req.params.id
    console.log(req.params.id)
    const varitafiltradas = varitasParseadas.filter(item => item.id !== parseInt(id))
    console.log(varitafiltradas)
    await fs.promises.writeFile(ruta, JSON.stringify(varitafiltradas))
    res.json({Mensaje:'Actualizado el listado de varitas'})
})
app.put('/:id', async (req, res) => {
    const varita = req.body;
    const id = req.params.id
    const {dueño, material}=req.body
    const varitas = await fs.promises.readFile(ruta, 'utf-8');
    const varitasParseadas = JSON.parse(varitas)
    const varitasfiltradas = varitasParseadas.filter(item => item.id !== parseInt(id))
    varitasfiltradas.push({id, dueño, material})
    await fs.promises.writeFile(ruta, JSON.stringify(varitasfiltradas))
    res.json({Mensaje:'Actualizada varilla '+id})
})



app.listen( PORT, () => {
    console.log(`Servidor de Olivander andando y escuchando en el puerto ${PORT}`);
})