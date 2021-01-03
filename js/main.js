/* DOM */
// forms
let formProduct = document.getElementById('formProduct');
let formAddProductToCart = document.getElementById('formAddProductToCart');
let formSearchProduct = document.getElementById('formSearchProduct')


// containers
let containerData = document.getElementById('containerData')
let containerProducts = document.getElementById('containerProducts')
let containerCart = document.getElementById('containerCart')

/* INPUTS */
// product
let productName = document.getElementById('productName')
let productUrlImage = document.getElementById('productUrlImage')
let productDescription = document.getElementById('productDescription')
let productPrice = document.getElementById('productPrice')
let productQuantity = document.getElementById('productQuantity')

// add product cart
let productNameLabel = document.getElementById('productNameLabel')
let productCartQuantity = document.getElementById('productCartQuantity')
let productPos = document.getElementById('productPos')

// form search product
let searchInputProduct = document.getElementById('searchInputProduct')

/* ARRAYS */
let productsArray = [];

let shoppingCartArray = [];

// Default data
productsArray.push(
    {
        'name': 'chicken',
        'image': 'https://i.blogs.es/8ceb02/pollo_entero/450_1000.jpg',
        'description': 'it is delicious',
        'price': '5000',
        'quantity': '20'
    },
    {
        'name': 'sugar',
        'image': 'https://www.getldi.com/wp-content/uploads/2017/09/bigstock-Bowl-and-scoop-with-white-sand-180259339.jpg',
        'description': 'it is delicious',
        'price': '800',
        'quantity': '160'
    },
    {
        'name': 'Rice',
        'image': 'https://themom100.com/wp-content/uploads/2015/08/rice-in-bowl-horiz-with-spoon-copy.jpg',
        'description': 'The rice is white',
        'price': '1500',
        'quantity': '500'
    }
)

/* ADD EVENTS */
formProduct.addEventListener('submit', (e) => {
    e.preventDefault();

    let pn = productName.value.trim()
    let pu = productUrlImage.value.trim()
    let pd = productDescription.value.trim()
    let pp = productPrice.value.trim()
    let pq = productQuantity.value.trim()

    if (!pn || !pu || !pd || !pp || !pq) {
        alert('Some fields are empty')
    } else {
        data = {
            'name': pn,
            'image': pu,
            'description': pd,
            'price': pp,
            'quantity': pq
        }
        addProduct(data)
        formProduct.reset()
    }
})

formAddProductToCart.addEventListener('submit', (e) => {
    e.preventDefault()
    let product = productsArray[productPos.value]
    let quantity = parseInt(productCartQuantity.value)

    if (!validateStock(product, quantity)) {
        return
    }

    reduceStock(product, quantity)

    addProductToCartArray(product, quantity)

    listProducts()

})

formSearchProduct.addEventListener('submit', (e) => {
    e.preventDefault()
})

searchInputProduct.addEventListener('keyup', e => {
    let msg = ''
    let cont = 0

    for (let i = 0; i < productsArray.length; i++) {
        const element = productsArray[i];
        let en = element.name.toString().toLowerCase()
        let sp = searchInputProduct.value.toString().toLowerCase()
        if (en.includes(sp)) {
            msg += show(element, i)
            cont++
        }        
    }
    containerData.innerHTML = msg
})

/* METHODS */

function allProducts() {
    searchInputProduct.value = ''
    listProducts()
}

function show(product, i) {
    let msg = `
    <div class="col">
        <div class="card mt-2 mb-2 p-1">
            <img class="img-fluid"
                style="min-height: 100px;"
                src="${product.image}"
                alt="Image not found">
            <div class="card-body">
                <div class="card-title">
                    <h5>${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between mr-2">
                        <p class="card-text">
                            <small class="text-muted">
                                $${product.price}
                            </small>
                        </p>
                        <p class="card-text">
                            <small class="text-muted">
                                ${product.quantity}
                            </small>
                        </p>
                    </div>
                    
                    <button class="btn btn-outline-primary btn-block" data-toggle="modal"       data-target="#addProductToCartModal"
                    onclick="addProductToCartModalDialog(${i});">
                        <i class="fas fa-cart-plus"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
    return msg
}

function addProduct(product) {
    alert(productsArray.push(product) + ' products')
    listProducts()
}

function listProducts() {
    let msg = ''
    for (let i = 0; i < productsArray.length; i++) {
        const product = productsArray[i];
        msg += show(product, i)
    }
    containerData.innerHTML = msg
}

function addProductToCartModalDialog(i) {
    let product = productsArray[i]
    productNameLabel.value = product.name
    productPos.value = i
}

function validateStock(product, quantityToSell) {
    if ((quantityToSell > product.quantity) || (quantityToSell < 0)) {
        alert('The quantity is invalid')
        return false
    }
    return true
}

function reduceStock(product, quantityToSell) {
    product.quantity = parseInt(product.quantity) - quantityToSell
}

function returnStock(product, quantityToReturn) {
    product.quantity = parseInt(product.quantity) + quantityToReturn
}

function copyDataProduct(product, productTemp, quantity) {
    productTemp.name = product.name
    productTemp.image = product.image
    productTemp.description = product.description
    productTemp.price = product.price
    productTemp.quantity = quantity
}

function addProductToCartArray(product, quantityToSell) {
    let p = {}
    let pos = existsProductInCart(product, shoppingCartArray)
    let size = 0;
    if (pos === -1) {
        shoppingCartArray.push(p)
        copyDataProduct(product, p, quantityToSell)
    } else {
        shoppingCartArray[pos].quantity += quantityToSell;
    }

    size = shoppingCartArray.length;

    alert('quantity of products in the cart: ' + size)
}

function existsProductInCart(product, array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if ((product.name === element.name) && (product.description === element.description) && (product.price === element.price)) {
            return i
        }
    }
    return -1
}

function listCart() {
    let msg = ''
    msg += `
    <div class="table-responsive pt-4 vh-100">
        <h3>Products in cart</h3>
        <table class="table table-bordered table-hover mt-4">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            `
    for (let i = 0; i < shoppingCartArray.length; i++) {
        const element = shoppingCartArray[i];
        msg += `
                <tr>
                    <td style="max-width: 100px;">
                        <img class="img-fluid" src="${element.image}">
                    </td>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.price}</td>
                    <td>${element.quantity}</td>
                    <td>
                        <button class="btn btn-outline-danger btn-block" onclick="deleteProductInCart(${i});">
                            <i class="fas fa-trash-alt"></i>
                            Delete
                        </button>
                    </td>
                </tr>
                `

    }
    msg += `
            </tbody>
        </table >

    </div >
    `
    containerCart.innerHTML = msg
}

function deleteProductInCart(pos) {
    let productInCart = shoppingCartArray[pos]
    shoppingCartArray.splice(pos, 1)
    let posFound = existsProductInCart(productInCart, productsArray)
    let product = productsArray[posFound]
    returnStock(product, productInCart.quantity)
    listCart()
}

function loadDocument(opc) {
    if (opc == 1) {
        containerProducts.classList = 'container container-active'
        containerCart.classList = 'container container-hidden'    
        listProducts()
    } else {
        containerProducts.classList = 'container container-hidden'
        containerCart.classList = 'container bg-light container-active'
        listCart()
    }
}

window.onload = loadDocument(1)