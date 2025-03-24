let productos = [] 

fetch("./JS/productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data
    cargarProductos(productos)
  })

const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal") 
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
  aside.classList.remove("aside-visible")
}))

function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = ""

  productosElegidos.forEach(productos => {

    const div = document.createElement("div")
    div.classList.add("productos")
    div.innerHTML = `
       <img class="producto-imagen" src="./images/${productos.img}" alt="${productos.titulo}">
       <div class="productos-detalles">
          <h3 class="productos-titulo">${productos.titulo}</h3>
          <p class="productos-precio">$ ${productos.precio}</p>
          <button class="producto-agregar" id="${productos.id}">Agregar</button> 
       </div>   
    `

    contenedorProductos.append(div)
  })

  actualizarBotonesAgregar()
}

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {

    botonesCategorias.forEach(boton => boton.classList.remove("active"))
    e.currentTarget.classList.add("active")

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(productos => productos.categoria.id === e.currentTarget.id)
      tituloPrincipal.innerText = productoCategoria.categoria.nombre
      const productosBoton = productos.filter(productos => productos.categoria.id === e.currentTarget.id)
      cargarProductos(productosBoton)
    }
    else {
      tituloPrincipal.innerText = "Todos los productos"
      cargarProductos(productos)
    }
  })
})

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar")

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito)
  })
}

let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrrito")) || []

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id
  const productoAgregado = productos.find(productos => productos.id === idBoton)

  if (productosEnCarrito.some(productos => productos.id === idBoton)) {
    const index = productosEnCarrito.findIndex(productos => productos.id === idBoton) 
    productosEnCarrito[index].cantidad++
  } else {
    productoAgregado.cantidad = 1
    productosEnCarrito.push(productoAgregado)
  }

  actualizarNumerito()

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, productos) => acc + productos.cantidad, 0)
  numerito.innerText = nuevoNumerito
}