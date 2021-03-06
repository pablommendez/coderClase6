const fs = require('fs')

class Contenedor {
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = nombreDeArchivo
        this.archivoYaExiste = this.chequearArchivoCreado()
    }

    obtenerRuta() {
        return `./${this.nombreDeArchivo}`
    }

    obtenerID(itemsEnArchivo) {
        if (itemsEnArchivo.length === 0 || itemsEnArchivo.length === undefined) {
            return 1
        }
        const idsExistentes = itemsEnArchivo.map(item => item.id)
        return Math.max(...idsExistentes) + 1
    }

    chequearArchivoCreado() {
        const archivos = fs.readdirSync('./')
        return archivos.some(nombreDeArchivo => nombreDeArchivo.includes(this.nombreDeArchivo))
    }

    async save(objetoAGuardar) {
        try {
            if (!this.archivoYaExiste) {
                await fs.promises.writeFile(this.nombreDeArchivo, '[]')
                this.archivoYaExiste = true
            }
            const itemsEnArchivo = await this.getAll()
            const objetoConId = { ...objetoAGuardar, id: this.obtenerID(itemsEnArchivo) }
            const nuevoContenidoDeArchivo = [...itemsEnArchivo, objetoConId]
            await fs.promises.writeFile(this.obtenerRuta(), JSON.stringify(nuevoContenidoDeArchivo, null, 2))
            return objetoConId.id.toString()
        }
        catch (error) {
            console.error('Ha ocurrido el siguiente error' + error)
        }
    }

    async getById(id) {
        try {
            const itemsEnArchivo = await this.getAll()
            const objetoEncontradoPorId = itemsEnArchivo.find(item => item.id === id)
            return objetoEncontradoPorId !== undefined ? objetoEncontradoPorId : null
        }
        catch (error) {
            console.error('Ha ocurrido el siguiente error' + error)
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.nombreDeArchivo, 'utf-8'))
        } catch (error) {
            console.error('Ha ocurrido el siguiente error' + error)
        }
    }

    async deleteById(id) {
        try {
            const itemsEnArchivo = await this.getAll()
            const item = itemsEnArchivo.find(item => item.id === id)
            if (item === undefined) {
                throw Error(`No se encontr?? un registro el id ${id.toString()} para borrar`)
            }
            const itemsFiltrados = itemsEnArchivo.filter(item => item.id !== id)
            const nuevoContenidoDeArchivo = [...itemsFiltrados]
            await fs.promises.writeFile(this.obtenerRuta(), JSON.stringify(nuevoContenidoDeArchivo, null, 2))
        }
        catch (error) {
            console.error(error);
        }
    }

    async geProductoRandom() {
        try {
            const itemsEnArchivo = await this.getAll()
            const randomIndex = Math.floor(Math.random() * itemsEnArchivo.length)
            return itemsEnArchivo[randomIndex]
        }
        catch (error) {
            Error(`Ups, ha ocurrudo un error: ${error}`)
        }
    }
}

module.exports = {
    Contenedor
}