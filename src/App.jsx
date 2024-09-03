import './App.css'
import Header from './components/Header'
import Product from './components/Product';


import { useCart } from './hooks/useCart';


function App() {
  const { addCart, modifyProductCart, clearCart, removeProductCart, carrito, data, isEmpty, carritoTotal } = useCart()
  

  return (
    <>
      <Header
       carrito={carrito}
       removeProductCart={removeProductCart}
       modifyProductCart={modifyProductCart}
       clearCart={clearCart}
       carritoTotal={carritoTotal}
       isEmpty={isEmpty}
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
