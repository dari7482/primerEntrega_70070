


let addProduct = document.getElementById("cardProduct")
let cartNumber = document.getElementById('cartNumber').getAttribute('data-cart');
async function checkItem() {
    try {
        console.log(cartNumber)
        const response = await fetch(`/api/cart/${cartNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

        return data.product;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }


}

document.addEventListener('DOMContentLoaded', async function () {

    console.log("ass")

    const forms = document.querySelectorAll('.cardProduct');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const descriptionElement = form.querySelector('.description')
            const priceElement = form.querySelector('.price');
            const stockElement = form.querySelector('.stock');
            const thumbnailElement = form.querySelector('.thumbnail');
            console.log('45', thumbnailElement)
            const idElement = form.querySelector('.id')
            console.log('47', idElement)
            const idName = form.querySelector('.name')

            const btnAdd = form.querySelector('.add')
            const btDes = form.querySelector('.res')
            const btSubmit = form.querySelector('.sub')
            const valorContador = form.querySelector('#valorcontador')
            let cantidad = parseInt(valorContador.textContent.trim()) || 0;

            const id = idElement.textContent.trim();
            const name = idName.textContent.trim();
            const description = descriptionElement.textContent.trim();
            const price = parseInt(priceElement.textContent.replace('$', '').trim());
            const stock = parseInt(stockElement.textContent.replace('STOCK:', '').replace('UN', '').trim());
            const thumbnail = thumbnailElement.textContent.trim();

            //const cantidad = parseInt(cantidadElement.textContent.trim());

            btnAdd.addEventListener("click", (evento) => {
                evento.preventDefault()

                cantidad++
                valorContador.textContent = cantidad
            })
            btDes.addEventListener("click", (evento) => {


                if (cantidad > 0) {
                    cantidad--
                    valorContador.textContent = cantidad
                }
            })


            btSubmit.addEventListener('click', async (e) => {
                e.preventDefault()
                const result = await checkItem()
                const product = {
                    id: id,
                    name: name,
                    description: description,
                    price: price,
                    stock: stock,
                    cantidad: cantidad,
                    thumbnail: thumbnail
                };


                const filter = result.filter((item) => item.id === id)


                const newItemExist = result.some((item) => item.id === id)

                console.log(product)



                if (!newItemExist) {
                    console.log('nuevo item')
                    fetch(`/api/carts/${cartNumber}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(response => response.json())
                        .then(data => {
                            location.reload()
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else {
                    console.log('update item')
                    fetch(`/api/carts/${cartNumber}/products/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(response => response.json())
                        .then(data => {
                            location.reload()
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });


                }
            });
        })
    });
});

///modal carts
document.addEventListener('DOMContentLoaded', async () => {
    const itemsTotal = await checkItem()

    total = itemsTotal.map((item) => item.cantidad).reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0)

    const contenedorCarrito = document.getElementById("contCarrito")
    contenedorCarrito.innerHTML = ""

    const carritoImagen = document.createElement("p")
    carritoImagen.innerHTML = `<img  id="contenidoCarrito" src="/img/cart-icon-28356.png">
                                <p class="itemsGuardados">${total}</p>`
    contenedorCarrito.appendChild(carritoImagen)

    const modal_container = document.getElementById("modal_container")
    const modalCarrito = document.getElementById("contenidoCarrito")
    const btnCerrar = document.getElementById("close")
    const btnVaciar = document.getElementById("vaciar")
    const btnComprar = document.getElementById("comprar")

    if (modalCarrito) {
        modalCarrito.addEventListener("click", async (evento) => {
            evento.preventDefault()
            const result = await checkItem()
            console.log(result)


            if (modal_container) {

                modal_container.classList.add('show')
            }

            const contenedorCarrito = document.getElementById("renderizarCarrito")
            contenedorCarrito.innerHTML = ""

            result.forEach(({ name, id, price, cantidad, description, thumbnail }) => {
                console.log(thumbnail)
                const prodCardCarrito = document.createElement("div")
                prodCardCarrito.style = "width:15rem"
                prodCardCarrito.innerHTML = `
                    <div class="container-modal">                               
                        <div class="card-descripcion">
                            <p>Descripcion:${description}</p>                               
                            <p>Price:${price}</p>
                            <p>Cantidad:${cantidad}</p>                                    
                            <p>Total:1000</p>                                    
                            <button class="eliminar" id="eliminarProd-${id}">Eliminar</button>                                   
                        </div> 
                        <div class="image-modal">
                            <img src=${thumbnail}>
                        </div>
                    </div>`

                contenedorCarrito.appendChild(prodCardCarrito)

                const btnEliminarProdcuto = document.getElementById(`eliminarProd-${id}`)
                if (btnEliminarProdcuto) {
                    btnEliminarProdcuto.addEventListener("click", (e) => {
                        e.preventDefault()
                        fetch(`/api/carts/${cartNumber}/products/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id })

                        })
                            .then(response => response.json())
                            .then(data => {
                                location.reload()
                                modal_container.classList.remove('show')

                                console.log('Success:', data);

                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    })

                }
            })

        })
    }

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            if (modal_container) {

                modal_container.classList.remove('show')
            }
        })
    }
    if (btnVaciar) {
        btnVaciar.addEventListener("click", (e) => {
            if (modal_container) {

                e.preventDefault()
                fetch(`/api/carts/${cartNumber} `, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },


                })
                    .then(response => response.json())
                    .then(data => {
                        location.reload()
                        modal_container.classList.remove('show')

                        console.log('Success:', data);

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });



            }

        })
    }
    if (btnComprar) {
        btnComprar.addEventListener("click", async (e) => {
            console.log(cartNumber)
            if (modal_container) {

                e.preventDefault()
                const products = await checkItem()

                console.log(products)


                fetch(`/api/${cartNumber}/purchase`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(products)


                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.redirectUrl) {
                            window.location.href = data.redirectUrl; // Redirige a la URL enviada por el backend
                        }
                        modal_container.classList.remove('show')

                        console.log('Success:', data);

                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                        // Captura el contenido del error para investigar mejor
                        error.text().then(errorMessage => {
                            console.error('Error message:', errorMessage);
                        });
                    });



            }

        })
    }

})







