import { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct} from "../../controllers/admin/products.controller.js";
import { upload } from "../../helpers/cloudinary.js";
import { Router } from "express";

const router =  Router()

router.post('/upload-image', upload.single("my_file"), handleImageUpload, () => {
    console.log("uploading image")
})
router.post('/add', addProduct)
router.get('/get', fetchAllProducts)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)

export default router