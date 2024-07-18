socket = io()
const texto = document.getElementById('texto')


socket.on('getproducts', products => {
    let result = ''
    products.forEach(elemnt => {
        result += `id: ${elemnt.id} title: ${elemnt.title} description: ${elemnt.description} code: ${elemnt.code} price: ${elemnt.price} status: ${elemnt.status} stock: ${elemnt.stock} category: ${elemnt.category}`+ "\n"
    })
    texto.value = result
})

