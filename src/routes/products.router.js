import express from 'express'
import { ProductManager } from '../controllers/product-manager-db.js'

//Creo mi router.
export const router = express.Router()
//Creo la instancia.
const productManager = new ProductManager()


router.get('/api/products', async (req,res)=>{
    /*Al hacer una peticion a '/products' pido los productos al product Manager.
      Si todo sale Ok miro req.query si trajo limit o no trajo. Si trajo limit devuelvo el numero de objetos que me pide en limit.
      SI no trajo limit devuelvo la lista entera de productos.
      Si ocurrio un error doy aviso y devuelvo en la respuesta un status en forma de json.
    */  
    try{
        const limit = req.query.limit
        const productos = await productManager.getProducts()
        
        limit 
        ? res.json(productos.slice(0,limit))
        : res.json(productos)
    }catch(error){
        console.log('Error al obtener productos.', error)
        res.status(500).json({error: 'Error del servidor'})
    }
})


router.get('/api/products/:pid', async (req,res)=>{
    /*Al hacer una peticion a '/products/:pid' pido los productos al product Manager con el metodo getProductByID y uso de parametro lo que vino en param.
     SI no vino un producto devuelvo un objeto JSON con mensaje de error, si existe el producto lo devuelvo tambien en forma de objeto json.
     Si ocurrio un error doy aviso y devuelvo en la respuesta un status en forma de json.
  */
  try{
      const id = req.params.pid
      const producto = await productManager.getProductById(id)
      
      !producto 
      ? res.json({error:'Producto no encontrado.'})
      : res.json(producto)
         
  }catch(error){
      console.log('Error al obtener producto.', error)
      res.status(500).json({error: 'Error del servidor'})
  }
})


router.post('/api/products', async (req,res)=>{
 
    try{
        const productToAdd =req.body
        console.log('prrr: ', productToAdd)
        await productManager.addProduct(productToAdd)
        res.json('Producto agregado con exito !')

    }catch(error){
        console.log('Error al obtener producto.', error)
        res.status(500).json({error: 'Error del servidor'})
    }
})

router.delete('/api/products/:pid', async(req,res)=>{
 
    try{
        //Obtengo el id y lo renombro por una cuestion de claridad
        const {pid:productIdToDelete} = req.params
        await productManager.deleteProduct(productIdToDelete)
        res.json(`Producto con id ${productIdToDelete} eliminado con exito !`)
    }catch(error){
        console.log('Error al obtener producto.', error)
        res.status(500).json({error: 'Error del servidor'})
    }
})


router.put('/api/products/:pid', async(req, res)=>{
    try{
        const {pid:productIdToUpdate} = req.params
        const itemsToUpdateObject = req.body
        await productManager.updateProduct(productIdToUpdate,itemsToUpdateObject)
        res.json('Producto editado con exito !')
        
    }catch(error){
        console.log('Error al obtener producto.', error)
        res.status(500).json({error: 'Error del servidor'})
    }
})



