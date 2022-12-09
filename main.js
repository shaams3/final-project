updateCartTotal();

document.getElementById('emptycart').addEventListener('click', emptyCart)
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () { addToCart(this) })
}

function updateCartTotal() {
    var total = 0;
    var price = 0;
    var items = 0;
    var productName = "";
    var carttable = "";
    if (sessionStorage.getItem('cart')) {
        // get cart data & parse from string to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        items = cart.length;

        // loop over cart array
        for (var i = 0; i < items; i++) {
            // get item & parse from string to object
            var item = JSON.parse(cart[i]);

            price = parseFloat(item.price.split('$')[1]);
            productName = item.productName;

            carttable += "<tr><td>" + productName + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
    }

    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById('itemsquantity').innerHTML = items;
    document.getElementById("carttable").innerHTML = carttable;
}

function addedToCart(pName) {
    var message = pName + " was added to the cart!";
    var alerts = document.getElementById('alerts');
    alerts.innerHTML = message;

    if (!alerts.classList.contains("message")) {
        alerts.classList.add("message")
    }
}

function addToCart(elem) {
    var getPrice;
    var getProductName;
    var cart = [];
    var stringCart;
    while (elem = elem.previousSibling) {
        if (elem.className == 'price') {
            getPrice = elem.innerText
        }
        if (elem.className == 'productname') {
            getProductName = elem.innerText
        }
    }
    var product = {
        productName: getProductName,
        price: getPrice
    }
    var stringProduct = JSON.stringify(product);

    if (!sessionStorage.getItem('cart')) {
        cart.push(stringProduct);

        stringCart = JSON.stringify(cart);

        sessionStorage.setItem('cart', stringCart);
        addedToCart(getProductName);
        updateCartTotal();
    } else {
        cart = JSON.parse(sessionStorage.getItem('cart'));

        cart.push(stringProduct);

        stringCart = JSON.stringify(cart);

        sessionStorage.setItem('cart', stringCart);
        addedToCart(getProductName);
        updateCartTotal();
    }
}

function emptyCart() {
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();

        var alerts = document.getElementById('alerts');
        alerts.innerHTML = "";
        if (alerts.classList.contains('message')) {
            alerts.classList.remove('message');
        }
    }
}