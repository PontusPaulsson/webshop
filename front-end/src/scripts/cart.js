import {mainView} from "./products";
import {paginator} from "./paginator";
import {amount} from "./products";
import {allItems} from "./products";

const totalPriceLabel = $('.total-price');
const cartItems = $('.cart-items');
const cart = [];
const btnCart = $('.btn-cart');
/*
Functions for handling cart
*/

// This function is called first to generate the table for cart items
export function loadCart() {
    mainView.html("");
    paginator.html("");
    amount.html("");

    //Generate table
    loadCartTable();

    //Generate one tr for every item in cart
    loadCartTableRows(cart);
}




//Set up event listener for cart button wrapper
$('.cart-wrapper').click(function () {
    loadCart(cart);
});

export function addProductToCart(id) {
    allItems.forEach(function (item) {
        if (item.id === id) {
            let fullItem = {
                "item": item,
                "quantity": 1
            };
            //If item already in cart increase qty by 1 else add new item to cart.
            let index = cart.map(function (e) {
                return e.item.id;
            }).indexOf(id);

            if (index === -1) {
                cart.push(fullItem);
            } else {
                cart[index].quantity++;
            }
        }
    });
    updateQuantityInCart();
}

//Handles updating the quantity shown for products in cart as well as hiding / showing the "cart-button".
function updateQuantityInCart() {
    if (cart.length !== 0) {
        btnCart.css("display", "initial");
        let totalQuantity = 0;
        for (let i = 0; i < cart.length; i++) {
            totalQuantity += cart[i].quantity;
        }
        cartItems.html(totalQuantity + " - ITEMS");

        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += parseInt(cart[i].item.price * cart[i].quantity);
        }
        totalPriceLabel.html(totalPrice + "KR");
    } else {
        btnCart.css("display", "none");
        totalPriceLabel.html("");
        cartItems.html("");
    }
}

function deleteProductFromCart(itemId) {
    let index = cart.map(function (e) {
        return e.item.id;
    }).indexOf(itemId);
    if (index > -1) {
        cart.splice(index, 1);
        loadCartTableRows(cart);
    }

}

function loadNewQuantity(quantity, dataId) {
    let quantityElement = $("li[data-id=" + dataId + "]");
    quantityElement.text(quantity);
}

//Loads the table containing all the products in the cart.
function loadCartTable() {
    let html = '<table id="cart-table" class="table table-striped align-middle">' +
        '<tbody class="cart-table">' +
        '<thead>' +
        '<th style="width: 30%">Article</th>' +
        '<th style="width: 20%">Price</th>' +
        '<th style="width: 20%">Quantity</th>' +
        '<th style="width: 5%"></th>' +
        '</thead>' +
        '</tbody>' +
        '</table>';

    mainView.append(html);
}

//Shows that cart is empty
function loadEmptyCart() {
    mainView.html("");
    let html = 'Your cart is empty.';
    mainView.append(html);
}

// Function to generate tr's for cart items
function loadCartTableRows(items) {
    if (items.length !== 0) {
        let cartTable = $('.cart-table');
        cartTable.html("");
        cart.forEach(function (items) {
            let html = '<tr>' +
                '<td class="d-flex" style="align-items: center;">' +
                '<img style="width: 40px; height: 40px;" src="src/img/products/' + items.item.imageURL + '">' +
                '<div class="d-flex" style="margin-left: 25%; flex-flow: column">' +
                '<span class="font-weight-bold">' + items.item.title + '</span>' +
                '<span>' + items.item.description + '</span>' +
                '</div>' +
                '</td>' +
                '<td>' + items.item.price + '</td>' +
                '<td>' +
                '<ul class="list-inline m-0">' +
                '<li class="list-inline-item quantity" data-id="' + items.item.id + '">' + items.quantity + '</li>' +
                '<li class="list-inline-item">' +
                '<div class="stacked-buttons">' +
                '<button class="btn btn-gray-darker increase-qty"><i class="fa fa-angle-up" data-id=' + items.item.id + '></i></button>' +
                '<button class="btn btn-gray-darker decrease-qty" ><i class="fa fa-angle-down" data-id=' + items.item.id + '></i></button>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</td>' +
                '<td>' +
                '<div class="picture d-inline">' +
                '<img class="delete-item-from-cart" src="src/img/trashbin.png" data-id=' + items.item.id + '>' +
                '</div>' +
                '</td>' +
                '</tr>';

            cartTable.append(html);
        });

        //Event listener to increase qty of item in cart.
        $('.increase-qty').click(function (e) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].item.id === $(e.target).data("id")) {
                    items[i].quantity++;
                    loadNewQuantity(items[i].quantity, $(e.target).data("id"));
                }
            }
            updateQuantityInCart();
        });

        //Event listener to decrease qty of item in cart.
        $('.decrease-qty').click(function (e) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].item.id === $(e.target).data("id")) {
                    items[i].quantity--;
                    if (items[i].quantity === 0) {
                        deleteProductFromCart(items[i].item.id);
                    } else {
                        loadNewQuantity(items[i].quantity, $(e.target).data("id"));
                    }
                }
            }
            updateQuantityInCart();
        });

        //Event listener to delete item from cart.
        $('.delete-item-from-cart').click(function (e) {
            deleteProductFromCart($(e.target).data("id"));
            updateQuantityInCart();
        });
    } else {
        loadEmptyCart();
    }

}