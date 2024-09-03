import { useState, useEffect, useMemo } from 'react'
import { db } from '../db/db.js'

const useCart = () =>{
    
    const initialCart = ()=>{
        const localStorageCarrito = localStorage.getItem('carrito')
    
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
      }
    
      const [data] = useState(db)
      const [carrito, setCarrito] = useState(initialCart)
      const MAX_ITEM = 5
    
      useEffect(() =>{
          localStorage.setItem('carrito', JSON.stringify(carrito))
      },[carrito])
    
      function addCart(item) {
          const itemExists = carrito.findIndex(guitarra => guitarra.id ===item.id)
          if(itemExists >=0){
            if (carrito[itemExists].cantidad>= MAX_ITEM) return
            const updateCarrito = [...carrito]
            updateCarrito[itemExists].cantidad++
            setCarrito(updateCarrito)
          }else{
            item.cantidad = 1
            setCarrito([...carrito, item])
          }
    
          
      }
    
      function removeProductCart(id) {
        
        setCarrito(prevCarrito => prevCarrito.filter(guitarra => guitarra.id !== id))
      }
    
      function modifyProductCart(id, operation) {
        const updateCarrito = [...carrito]
        const itemIndex = carrito.findIndex(guitarra => guitarra.id ===id)
        
        if (operation) {
          if (updateCarrito[itemIndex].cantidad <MAX_ITEM) {
            updateCarrito[itemIndex].cantidad++
            setCarrito(updateCarrito)
          }
        } else {
          updateCarrito[itemIndex].cantidad--
          if (updateCarrito[itemIndex].cantidad===0) {
            removeProductCart(id)
          }else{
            setCarrito(updateCarrito)
          }
    
        }
        
      }
    
      function clearCart() {
          setCarrito([])
      }
    

      //State Derivado
    const isEmpty = useMemo( () => carrito.length === 0, [carrito]) 
    const carritoTotal = useMemo(()=> carrito.reduce( (total, item) => total + (item.cantidad * item.price), 0), [carrito])


    return {
        carrito,
        data,
        clearCart,
        modifyProductCart,
        removeProductCart,
        addCart,
        isEmpty,
        carritoTotal
    }
}

export {
    useCart
}