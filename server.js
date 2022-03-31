const express = require('express')
const { Contenedor } = require('./models/Contenedor')

const app = express()
const contenedorDeProductos = new Contenedor('productos.txt')
const PORT = process.env.PORT || 8080

app.get('/', (_, res) => {
	res.send('<h2>Endopoints disponibles (GET)</h2><h4>/productos</h4><h4>/productoRandom</h4>')
})

app.get('/productos', async (_, res) => {
	res.json(await contenedorDeProductos.getAll())
})

app.get('/productoRandom', async (_, res) => {
	res.json(await contenedorDeProductos.geProductoRandom())
})

app.listen(PORT, () => {
	console.log(`Servidor escuchando en puerto ${PORT}`);
})