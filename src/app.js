import express from 'express'
import engine from "express-handlebars"
import __dirname from './utils.js'
import path from "path"
import { Server } from "socket.io"
import viewsrouter from "./routers/views.router.js"
import { getFromFile,saveToFile } from './utils.js' 


const app = express()
const httpserver = app.listen(8080, () => console.log("servidor escuchando en el puerto 8080"))
const socketserver = new Server(httpserver)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))
app.use("/api", viewsrouter)
app.use('/css', express.static(path.join(__dirname, 'public', 'css'), {
    // Configuración adicional para definir el tipo MIME de manera explícita
    setHeaders: (res, filePath) => {
        const contentType = mime.getType(filePath) || 'text/plain';
        res.setHeader('Content-Type', contentType);
    }
}))

socketserver.on('connection', socket => {

    socket.emit('getproducts', getFromFile('./products.json'))

    socket.on('postProduct', (product) => {
        product.id = Date.now()
        const products = getFromFile('./products.json')
        products.push(product)
        saveToFile(products, './products.json')
        socketserver.emit('getproducts', products)
        socket.emit('message', 'Se creo el producto')
    })

    socket.on('deleteProduct', id => {
        let products = getFromFile('./products.json')
        const product = products.find(product => product.id === parseInt(id))
        if (product) {
            products = products.filter(product => product.id !== parseInt(id))
            saveToFile(products, './products.json')
            socketserver.emit('getproducts', products)
            socket.emit('message', 'Se elimino el producto')
        } else socket.emit('message', 'El id del producto no existe')

    })
})


