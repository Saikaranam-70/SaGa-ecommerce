const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router();
router.post('/add-product/:firmId', productController.addProduct)
router.get('/:firmId/products', productController.getProductByFirm)

router.get('/uploads/:imageName', (req,res)=>{
    const imageName =  req.params.imageName;
    res.headersSent('Content-Type', 'image/jpg')
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})
router.delete('/:producId', productController.deleteProductById)
module.exports = router;