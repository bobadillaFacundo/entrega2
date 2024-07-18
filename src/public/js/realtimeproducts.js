socket = io()

const title = document.getElementById('title')
const description = document.getElementById('description')
const code = document.getElementById('code')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const submitAdd = document.getElementById('submitAdd')
const submitDelete = document.getElementById('submitDelete')
const id = document.getElementById('id')
const texto = document.getElementById('texto')




socket.on('getproducts', products => {
    let result = ''
    products.forEach(elemnt => {
        result += `id: ${elemnt.id} title: ${elemnt.title} description: ${elemnt.description} code: ${elemnt.code} price: ${elemnt.price} status: ${elemnt.status} stock: ${elemnt.stock} category: ${elemnt.category}`+ "\n"
    })
    texto.value = result
})


socket.on('message', data => {
    window.alert(data)
})


submitAdd.addEventListener('click', () => {
    if (title.value || description.value || code.value || price.value || stock.value || category.value) {
        product = {
            id: -1,
            title: title.value,
            description: description.value,
            code: code.value,
            price: price.value,
            status: true,
            stock: stock.value,
            category: category.value,
            thumbnails: []
        }
        socket.emit('postProduct', product)
        title.value = ''
        description.value = ''
        code.value = ''
        price.value = ''
        stock.value = ''
        category.value = ''
    } else window.alert('Faltan ingresar los datos del producto')

})

submitDelete.addEventListener('click', () => {
    if (id.value) {
        socket.emit('deleteProduct', id.value)
        id.value = ''
    } else window.alert('Falta ingresar el id del producto')
})