const express = require('express')
const{Contenedor} = require('./models/Contenedor')

const app = express()
const contenedorDeProductos = new Contenedor('productos.txt')
const PORT = process.env.PORT || 8080
app.get('/productos',async (req, res) => {
    res.json(await contenedorDeProductos.getAll())
})

app.get('/productoRandom', async (req, res) => {
    res.json(await contenedorDeProductos.geProductoRandom())
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
})