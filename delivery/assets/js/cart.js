
const listCart = [];
const cartId = document.getElementById("cart-id");
const order = document.getElementById("cart-finalizar");
const itensCart = document.getElementById("itens-cart");
const totalElement = document.getElementById("cart-total");
const subTotalElement = document.getElementById("cart-subtotal");
const endereco = document.getElementById("endereco");
const numero = document.getElementById("numero");
const ref = document.getElementById("ref");

var total = 0;
var subTotal = 0;
var embalagem = 2;
var minValue = 20;

var init = function () {
    openCart();
    closeCart();
    sendOrder();
};

var addCart = function (id) {
    var byId = byIdItem(id);
    if (byId.length) {
        var item = byId[0];
        item.qtd += 1;
    } else {
        var itemMenu = listMenu.filter(x => x.id === id)[0];
        itemMenu.qtd = 1;
        listCart.push(itemMenu);
    }
    sumCart();
};

var byIdItem = function (id) {
    return listCart.filter(x => x.id === id);
};

var sumCart = function () {
    itensCart.innerText = parseInt(itensCart.textContent) + 1;
};

var minusCart = function () {
    itensCart.innerText = parseInt(itensCart.textContent) - 1;
};

var openCart = () => {
    const nav = document.getElementById("nav-toggle");
    nav.addEventListener('click', () => {
        if(listCart.length){
            update();
            document.querySelector("aside").style.left = "0";
        }
    });
};

var sendOrder = () => {
    order.addEventListener('click', () => {
        if(subTotal >= minValue) {
            var sendOrder = "";
            listCart.forEach((cartItem, cartIndex) => {
                var itemPrice = cartItem.price * cartItem.qtd;
                sendOrder += cartItem.qtd + "x " + cartItem.name + " ";
                sendOrder += "R$" + formatPrice(itemPrice) + "%0a";
            });

            sendOrder += "1x Embalagem R$2,00%0a";
            sendOrder += "%0aTotal: R$" + formatPrice(total) + "%0a";

            sendOrder += "%0aEndereço: " + endereco.value;
            sendOrder += "%0aNúmero: " + numero.value;
            sendOrder += "%0aPonto de Referência: " + ref.value;

            location.href = "https://api.whatsapp.com/send?phone=5561999778907&text=" + sendOrder;
        }
    });
};

var closeCartModal = function () {
    document.querySelector("aside").style.left = "100vw";
};

var closeCart = () => {
    var close = document.getElementById("m-closer");
    close.addEventListener('click', () => {
        closeCartModal();
    });
};

var addCartItem = function (id) {
    addCart(id);
    update();
};

var removeCartItem = function (index) {
    if (listCart[index].qtd > 1) {
        listCart[index].qtd--;
      } else {
        listCart.splice(index, 1);
      }
    minusCart();
    update();
};

var update = () => {
    reset();
    if(!listCart.length){
        closeCartModal();
    } else {
        listCart.forEach((cartItem, cartIndex) => {
            const pizzaItemElement = setItemDOM(cartItem, cartIndex);
            cartId.innerHTML += pizzaItemElement;
        });
    }
    setValues();
    updateColorOrder();
};

var updateColorOrder = () => {
    var color = "#818181";
    if(subTotal >= minValue){
        color = "#48d05f";
    }
    order.style.backgroundColor = color;
};

var setItemDOM = function (cartItem, cartIndex) {

    var itemPrice = cartItem.price * cartItem.qtd; 
    var cartItem = "<div class='cart--item'>"
            + "<div class='cart--item-nome'>" + cartItem.name + "<br>R$ "+ formatPrice(itemPrice) + "</div>"
            + "<div class='cart--item--qtarea'>"
                + "<button class='cart--item-qtmenos' onclick='removeCartItem("+ cartIndex +")'>-</button>"
                + "<div class='cart--item--qt'>" + cartItem.qtd + "</div>"
                + "<button class='cart--item-qtmais' onclick='addCartItem("+ cartItem.id +")'>+</button>"
            + "</div>"
        + "</div>";
    subTotal += itemPrice;
    return cartItem;
};

var reset = function () {
    cartId.innerHTML = "";
    total = 0;
    subTotal = 0;
};

var setValues = function () {
    total = subTotal + embalagem;
    subTotalElement.innerHTML = `R$ ${formatPrice(subTotal)}`;
    totalElement.innerHTML = `R$ ${formatPrice(total)}`;
};

var formatPrice = function (price) {
    return (price.toFixed(2)).toString().replace(".", ",");
};

init();