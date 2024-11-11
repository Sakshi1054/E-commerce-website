import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../models/product.model.js";

const handleImageUpload = async(req,res) => {
    try {
        console.log(req.file)
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
    
        res.json({
          success: true,
          result,
        });
      } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error occured"
        })
    }
};

// add new product
const addProduct = async(req,res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    } = req.body

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    })

    await newlyCreatedProduct.save()
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct
    })
    
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

// fetch all product
const fetchAllProducts = async(req,res) => {
  try {

    const listOfProducts = await Product.find({})
    res.status(200).json({
      success: true,
      data: listOfProducts
    })
    
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

// edit a product
const editProduct = async(req,res) => {
  try {
    
    const {id} = req.params
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    } = req.body

    const findProduct = await Product.findById(id)
    if(!findProduct){
      res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    findProduct.title = title || Product.title
    findProduct.description = description || Product.description
    findProduct.category = category || Product.category
    findProduct.brand = brand || Product.brand
    findProduct.price = price === '' ? 0 : price || Product.price
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || Product.salePrice
    findProduct.totalStock = totalStock || Product.totalStock
    findProduct.image = image || Product.image

    await findProduct.save()

    res.status(200).json({
      success: true,
      data: findProduct
    })

  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}

// delete a product
const deleteProduct = async(req,res) => {
  try {

    const [id] = req.params
    const product = await Product.findByIdAndDelete(id)

    if(!product){
      res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })
    
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Error occured"
    })
  }
}


export {handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct}