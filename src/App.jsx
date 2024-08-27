import './App.css'
import Header from './components/Header'
import Product from './components/Product';
import { useState } from 'react'
import { db } from './db/db';
function App() {
  const [data, setData] = useState(db)
  const [carrito, setCarrito] = useState([])

  function addCart(item) {
      const itemExists = carrito.findIndex(guitarra => guitarra.id ===item.id)
      if(itemExists >=0){
        const updateCarrito = [...carrito]
        updateCarrito[itemExists].cantidad++
        setCarrito(updateCarrito)
      }else{
        item.cantidad = 1
        setCarrito([...carrito, item])
      }
  }


  return (
    <>
      <Header
       carrito={carrito}
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
