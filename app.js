

// url del API
const urlProducts = 'https://aqueous-fjord-68634.herokuapp.com/https://thawing-eyrie-55353.herokuapp.com/products/';

const urlCategories = 'https://aqueous-fjord-68634.herokuapp.com/https://thawing-eyrie-55353.herokuapp.com/categories/'


document.addEventListener("DOMContentLoaded", () => {
    fetch(urlProducts)
})
       
fetch(urlProducts)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))
    
        
const mostrarData = (data) => {
    pintarProductos(data)
    detectarBotones(data)
    
}

const contendorProductos = document.querySelector('#contenedor-productos')
function pintarProductos  (data)  {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    
    contendorProductos.innerHTML = ''

    data.forEach(producto => {
        // console.log(producto)
        template.querySelector('img').setAttribute('src', producto.url_image)
        template.querySelector('h5').textContent = producto.name
        template.querySelector('p span').textContent = producto.price
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contendorProductos.appendChild(fragment)
}

let carrito = {}

const detectarBotones = data => {
    const botones = document.querySelectorAll('.card button')

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            carrito[producto.id] = { ...producto }
            // console.log('carrito', carrito)
            pintarCarrito()
        })
    })
}


const items = document.querySelector('#items')

const pintarCarrito = () => {

    //pendiente innerHTML
    items.innerHTML = ''

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()

    Object.values(carrito).forEach(producto => {
        // console.log('producto', producto)
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.name
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.price * producto.cantidad
        template.querySelectorAll('span')[1].textContent = producto.price * producto.cantidad
        
        
        
        

        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()

}

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price ,0)
     //console.log(carrito)
     //console.log(nCantidad)
     //console.log(nPrecio)
     

     
    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio
    template.querySelectorAll('span')[1].textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    // console.log(botonesAgregar)

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log('eliminando...')
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
}

//busqeuda de items por id  

const searchResult = document.querySelector('#search-result');
const searchInput = document.querySelector('#search-input');
const botonSearch = document.querySelector('#buscar-items');



botonSearch.addEventListener('click', filter);

function searchItems  () {
    


  const input = document.getElementById("search-input").value;
  fetch('https://aqueous-fjord-68634.herokuapp.com/https://thawing-eyrie-55353.herokuapp.com/products/'+ input )
  .then(response => response.json())
  .then(data => pintarProductos(data));
    


}

function pay () {
    alert('pagaste XD')
}

 

