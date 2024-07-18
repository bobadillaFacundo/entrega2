import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("home",{
        style:'home.css'
    })
})
router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {
        style:'realTimeProducts.css'
    })
})

export default router
