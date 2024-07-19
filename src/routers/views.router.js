import express from "express"
import __dirname from '../utils.js'
import path from "path"


const router = express.Router()
// Configuración para servir archivos estáticos desde el directorio 'public'
router.use(express.static(path.join(__dirname, 'public')))


router.get("/", (req, res) => {
    res.render("home",{
        style:'index.css'
    })
})
router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {
        style:'index.css'
    })
})

export default router
