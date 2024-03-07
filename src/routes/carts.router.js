import express from 'express'
import { ProductManager } from '../controllers/product-manager-db.js'
import { CartsManager } from '../controllers/carts-manager-db.js'


//Creo mi instancia de objeto Router
export const router = express.Router()
//Creo instancia de mi cart Manager.
const cartsManager = new CartsManager()


router.get('/api/carts/:cid',async (req,res)=>{
    //Esta ruta devuelve un carrito
    const {cid} = req.params
    try {
        const response = await cartsManager.getCartById(cid)
        if (response.success){
        console.log('Require cart', response)
        res.json({cartId: response.cart._id, products: response.cart.products})
       }
       else{
        res.send(response.message)
       }
    } catch (error) {
        console.log(`Error al obtener carrito id ${cid}!.`, error)
        res.status(500).json({error: 'Error del servidor'})
    }
})

router.post('/api/carts',async (req,res)=>{
    //Esta ruta simplemente crea un carrito y lo envia al cliente para ser mostrado.
    try{
        const newCart = await cartsManager.createCart()
        res.json(newCart)
        }
    catch(error){
        console.log('Error al crear carrito !.', error)
        res.status(500).json({error: 'Error del servidor'})
    }

  
})


router.post('/api/carts/:cid/products/:pid',async(req,res)=>{
    //Agregar el producto pasado por paremtro (su id) al carrito pasado por su parametro id.
    //De estar el producto incrementa la cantidad de uno, de no estar lo crea y agrega una unidad del mismo.
    const {cid:cartId,pid:productId} = req.params
      
    try{
        const response = await cartsManager.addProductInCart(cartId,productId)
        if (response.success){
            //console.log(response.success)
            res.json({cartId: response.cart._id, products: response.cart.products})
        }
        else{
            res.send(response.message)
        }
       
    }
    catch{
        console.log('Error al ingresar el producto carrito !.', error)
        res.status(500).json({error: 'Error del servidor'})
    }
    
})

router.delete('/api/carts/:cid/products/:pid', async(req,res)=>{
    const {cid,pid} = req.params // Obtengo los parametros.
    
    try {
        const response = await cartsManager.deleteProductInCart(cid,pid)
        if (response.success){
            //console.log(response.success)
            res.json({cartId: response.cart._id, products: response.cart.products})
        }
        else{
            res.send(response.message)
        }
       
    }
    catch{
        console.log('Error al ingresar el producto carrito !.', error)
        res.status(500).json({error: 'Error del servidor'})
    }
})

router.put('/api/carts/:cid', async(req,res)=>{

    res.send('jsdjsdss')
})


router.put('/api/carts/:cid/products/:pid', async(req,res)=>{
    const {cid:cartId,pid:productId} = req.params // Obtengo los parametros.
    const {quantity} = req.body
    
    console.log('quanr: ', quantity)
    
    try{
        const response = await cartsManager.addProductInCart(cartId,productId,quantity)
        if (response.success){
            //console.log(response.success)
            res.json({cartId: response.cart._id, products: response.cart.products})
        }
        else{
            res.send(response.message)
        }
       
    }
    catch{
        console.log('Error al ingresar el producto carrito !.', error)
        res.status(500).json({error: 'Error del servidor'})
    }
})

router.delete('/api/carts/:cid', async(req,res)=>{

    res.send('jsdjsdss')
})