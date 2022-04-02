const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const botonVaciar = document.getElementById('vaciar-carrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const cantidad = document.getElementById('cantidad');
const precioTotal = document.getElementById('precioTotal');
const cantidadTotal = document.getElementById('cantidadTotal');

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto');
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>`
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);
    })
})

function buscarProducto() {
    const nombreProductoBuscado = document.getElementById("producto-buscado").value.toUpperCase().trim();
    const productosEncontrados = stockProductos.filter((producto) => {
        return producto.nombre.toUpperCase().match(nombreProductoBuscado);
    });
    let HTML = '';
    productosEncontrados.forEach((producto) => {
        HTML += `
        <div class="producto">
        <img src=${producto.img} alt= "">
        <h3>${producto.nombre}</h3>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})" id="agregar${producto.id}" class="boton-agregar">
        Agregar<i class="fas fa-shopping-cart"></i></button></div>`;
    })
    document.getElementById('contenedor-productos').innerHTML = HTML;
}

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];
const botonAbrir = document.getElementById('boton-carrito');
const botonCerrar = document.getElementById('carritoCerrar');
const modalCarrito = document.getElementsByClassName('modal-carrito')[0];

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active');
})

botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active');
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active');
})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation();
})

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId);
    if (existe){ 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){  
                prod.cantidad++;
            };
        })        
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        carrito.push(item)        
    }    
    actualizarCarrito();
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();   
};

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div');        
        div.className = ('productoEnCarrito');        
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div);        
        localStorage.setItem('carrito', JSON.stringify(carrito));        
    })
    contadorCarrito.innerText = carrito.length;    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);    
}