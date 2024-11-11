import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import React, { Fragment, useEffect, useState } from 'react'
import ProductImageUpload from '@/components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import { useToast } from '@/hooks/use-toast';
import AdminProductTile from '@/components/admin-view/product_tile';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: "",
  sellPice: '',
  totalStock: ''
}

function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const {productList} = useSelector(state => state.adminProducts)  // adminProducts ==> reducer name
  const dispatch = useDispatch()
  const {toast} = useToast()
  
  function onSubmit(event){
    event.preventDefault()
    currentEditedId !== null ?
    dispatch(editProduct({
      id : currentEditedId,
      formData
    })).then((data) => {
      console.log(data, "edit")

      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setFormData(initialFormData)
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
      }
    })
    :
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data) => {
      console.log(data)
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setImageFile(null)
        setOpenCreateProductsDialog(false)
        setFormData(initialFormData)
        toast({
          title : "Product added successfully"
        })
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  },[dispatch])

  console.log(productList)
  console.log(formData)

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>
      <div className='grid gap-3 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ? 
          productList.map(productItem => 
            (<AdminProductTile 
            setCurrentEditedId={setCurrentEditedId}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
            setFormData={setFormData}
            product={productItem}
            />))
            : null
        }
      </div>
      <Sheet 
        open={openCreateProductsDialog}
      onOpenChange={() => {
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? "Edit Product" : "Add New Products"
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload 
            imageFile={imageFile} 
            setImageFile={setImageFile} 
            uploadedImageUrl={uploadedImageUrl} 
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div>
            <CommonForm 
              formData={formData} 
              setFormData={setFormData} 
              buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts
