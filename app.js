
/** 
 * estas son las url de los datos que se van a traer 
 * esta utilizado con una instancia de CorsAnywhere
 *  Que permite hacer peticiones a una url desde cualquier lugar
 * @type {object}
 * 
 * 
 * 
 *  **/

const urlProducts = 'https://aqueous-fjord-68634.herokuapp.com/https://thawing-eyrie-55353.herokuapp.com/products/';

const urlCategories = 'https://aqueous-fjord-68634.herokuapp.com/https://thawing-eyrie-55353.herokuapp.com/categories/'


/**
 * registramos el request del api
 * y se activa DOMContentLoaded cuando el html esta listo
 *
 *  **/

document.addEventListener("DOMContentLoaded", () => {
    fetch(urlProducts)
})
document.addEventListener("DOMContentLoaded", () => {
    fetch(urlCategories)
})
       
/**
 * con las funciones fetch traemos los datos de la api
 * y con el metodo json() los convertimos a json
 * los guardamos en una variable
 * e imprimimos un error en consola si no hay datos
 *
 *  **/

fetch(urlProducts)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))

fetch(urlCategories)
    .then(response => response.json())
    .then(dataCateg => console.log(dataCateg)) // categoria => terminar
    .catch(error => console.log(error))
     

/**
 *  los datos guardados los pasamos por las funciones
 *  respectivas ( pintarProductos, detectarBotones)
 *  para que se dibujen en el html
 * @type {json} data
 * 
 * 
 *  
 *  **/
        
const mostrarData = (data) => {
    pintarProductos(data)
    detectarBotones(data)
    
}

const contendorProductos = document.querySelector('#contenedor-productos')
/**
 * 
 * @param { object } carrito datos del carrito
 * @param { number } carrito.id  identificador del carrito
 * @param { number } carrito.cantidad cantidad de productos en el carrito
 * @param { number } carrito.price precio del producto
 * @type {element} contenedorProductos
 * 
 *   
 * 
 *  **/



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

/**
 * @param {object} carrito datos del carrito
 * 
 * declaramos la constante carrito vacia para que no se repita
 * 
 *  **/


let carrito = {}

/**
 *  detectamos la funcion click en los botones
 * y agregamos el producto a pintar carrito, en el html para
 * que se vea en el carrito de compras
 * 
 *  
 *  **/

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

/**
 *  
 * 
 * 
 * 
 *  **/

const items = document.querySelector('#items')


/**
 * la funcion pintarCarrito recibe la data e imprime 
 * en el html elementos del carrito
 * y los botones de accion.
 * 
 * @param { object } carrito datos del carrito
 * @param { number } carrito.id  identificador del carrito
 * @param { number } carrito.cantidad cantidad de productos en el carrito
 * @param { number } carrito.price precio del producto
 * @type {element} contenedorProductos
 * 
 * 
 * 
 *  **/
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
/**
 * funciones que procesan informacion (data) para imprimir el footer
 * y detectar los botones de accion, respectivamente.
 * 
 * 
 *  **/
    pintarFooter()
    accionBotones()

}

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    footer.innerHTML = ''

/**
 * si el carrito esta vacio, se imprime un <th> con "carrito vacio"
 * obviamente, si no, se imprime un <th> con el total de productos
 * y un <th> con el total de precio.    
 * 
 * 
 * 
 *  **/



    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío!</th>
        `
        return
    }


 

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    
    /**
     * se declaran las constantes para el total de productos y precio
     *  
     * 
     *  **/


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

/**
 * 
 *  * agrega los botones agregar y eliminar producto de la lista
 * de productos en el carrito
 * 
 *  **/

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    // console.log(botonesAgregar)

/**
 * por cada boton agregar, se le agrega un evento click
 * y se le agrega una funcion que se ejecuta al hacer click
 * que agrega productos al carrito
 * @param {producto} producto
 * 
 * 
 *  **/


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

 

const searchResult = document.querySelector('#search-result');
const searchInput = document.querySelector('#search-input');
const botonSearch = document.querySelector('#buscar-items');




botonSearch.addEventListener('click', filter);


/**
 * la funcion searchItem trae con fetch los items de la url concatenando el nombre del item 
 * o los items a buscar con la variable input, que recoge los datos del search-input
 * y para mostrarlos con searchResult.
 * 
 *  
 * @param {items} items - lista de items a filtrar
 * @param {searchInput} searchInput - input de busqueda
 * @param {searchResult} searchResult - resultado de la busqueda
 * 
 * 
 * **/

function searchItems  () {
    
  const input = document.getElementById("search-input").value;
  fetch('https://aqueous-fjord-68634.herokuapp.com/https://thawing-eyrie-55353.herokuapp.com/products/'+ input )
  .then(response => response.json())
  .then(data => pintarProductos(data));


}


 

