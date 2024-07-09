const Product = require('../models/Product')
const multer = require('multer')
const Firm = require('../models/Firm')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req,res)=>{
    try {
        const{ productName, price , category, bestseller, description} = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId =  req.params.firmId;
        const firm = await Firm.findById(firmId)

        if(!firm){
            return res.status(404).json({error:"no firm found"})
        
        }
        const product = new Product({
            productName, price , category, bestseller, description,image,firm:firm._id
        })

        const savedProduct = await product.save();
        const productname= savedProduct.productName;
        firm.products.push(savedProduct)

        await firm.save()

        res.status(200).json(savedProduct)


    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
}
    const getProductByFirm = async(req, res) => {
        try {
            const firmId = req.params.firmId;
            const firm = await Firm.findById(firmId);
    
            if (!firm) {
                return res.status(404).json({ error: "No firm found" });
            }
              const restaurantName = firm.firmName;
    
            const products = await Product.find({ firm: firmId });
    
            res.status(200).json({ restaurantName, products });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" })
        }
    }

    const getProductByProductname = async(req, res)=>{
        try {
            const productId = req.params.productId;
            const product = await Product.findById(productId);
            if(!product){
                return res.status(404).json({error: "Product not found"})
            }
            const productname = product.productName
            const products = await Product.find({product: productId}) 
            res.status(200).json({productname})
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
    const getProductByProductName = async(req,res)=>{
        try {
            const productname = req.params.productName;
            const product = await Product.findOne({productname})
            if(!product){
                return res.status(404).json("product not found")
            }
            res.status(200).json({product})
         } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
    const getAllProducts =  async(req,res)=>{
        try {
            const products = await Product.find();
            if(products){
                return res.status(404).json("products not found")
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    const deleteProductById = async(req, res) => {
        try {
            const productId = req.params.productId;
    
            const deletedProduct = await Product.findByIdAndDelete(productId);
    
            if (!deletedProduct) {
                return res.status(404).json({ error: "No product found" })
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" })
        }
    }
    
    module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById, getProductByProductname, getProductByProductName, getAllProducts };