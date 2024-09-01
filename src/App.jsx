import './App.css'
import Header from './components/Header'
import Product from './components/Product';
import { useState, useEffect } from 'react'
import { db } from './db/db';
function App() {
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

  

  return (
    <>
      <Header
       carrito={carrito}
       removeProductCart={removeProductCart}
       modifyProductCart={modifyProductCart}
       clearCart={clearCart}
       />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) =>(
            <Product 
              key={guitarra.id}
              guitarra={guitarra}
              agregarCarrito={addCart}
              
            />
          ))}
          

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
