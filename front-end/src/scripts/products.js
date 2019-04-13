import {loadPaginator} from "./paginator";
import {addProductToCart} from "./cart";
import {toggleBackground} from "./background";
import {fetchProducts} from "./utils";

let itemsPerPage = 12;
export let currentPageNumber = 1;
export let allItems;
export const mainView = $('.main-view');
export const amount = $('.amount');
export const url = "http://localhost:1337/api/";

//Fetches all products from database to JS array
export async function getAllProductsFromDatabase(){
    allItems = await fetchProducts();
}

export async function displayProducts(){
    toggleBackground();
    allItems = await fetchProducts();
    loadProducts(allItems, 1);
}

//Function for searching products within allItems variable
export function searchProducts(searchString) {
    toggleBackground();
    let foundItems = [];

    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].description.toLowerCase().includes(searchString.toLowerCase()) || allItems[i].title.toLowerCase().includes(searchString.toLowerCase()))
            foundItems.push(allItems[i]);
    }
    if (foundItems.length > 0) {
        loadProducts(foundItems, 1);
    } else if(foundItems.length === 0){
        amount.html("");
        $('.pagination').html("");
        $('.item-list').html("");
        mainView.html("");
        mainView.append("Could not find any items.");
    }
}


//Generates HTML for the products displayed on the page.
export function loadProducts(items, page) {
    toggleBackground();
    mainView.html("");
    currentPageNumber = page;
    if(items.length > 0){
        loadAmount(items, page);
        loadPaginator(items, currentPageNumber);
    } else{
        amount.html("");
        $('.pagination').html("");
        mainView.append("Could not find any items.");
    }

    let maxItemsToLoad = function () {
        if (items !== undefined) {
            if ((itemsPerPage * page) > items.length) {
                return items.length;
            } else {
                return itemsPerPage * page;
            }
        } else {
            return 0;
        }
    }();

    function loadAmount(items, page) {
        let amountHtml = "";
        amount.html("");

        if (items.length >= 12 && page === 1) {
            amountHtml = '1 - ' + itemsPerPage + ' of ' + items.length;
        } else if (items.length >= 12 && page !== 1) {
            if ((itemsPerPage * page) > items.length) {
                amountHtml = itemsPerPage * (page - 1) + ' - ' + items.length + ' of ' + items.length;
            } else {
                amountHtml = itemsPerPage * (page - 1) + ' - ' + (itemsPerPage * page) + ' of ' + items.length;
            }
        } else {
            amountHtml = items.length + ' products';
        }
        amount.append(amountHtml);
    }

    //Append UL to main-view container - if its not already appended.
    if ($('.item-list').length <= 0) {
        mainView.append('<ul class="list-inline mb-0 item-list"></ul>');
    }
    let itemList = $('.item-list');

    //Append LI's to UL
    for (let i = (page - 1) * itemsPerPage; i < maxItemsToLoad; i++) {
        let html =
            '<li class="list-inline-item">' +
            '<div class="product-container">' +
            '<div class="image-container">' +
            `<img id="product-${items[i].id}" class="item-image" src="src/img/products/${items[i].imageURL}">` +
            '</div>' +
            '<div class="header-footer-container">' +
            '<header class="product-header">' +
            '<h5>' + items[i].title + '</h5>' +
            '<div class="item-description">' + items[i].description + '</div>' +
            '</header>' +
            '<footer class="product-footer">' +
            '<div class="footer-container">' +
            '<span class="item-price">' + items[i].price + 'kr</span>' +
            '<button data-id=' + items[i].id + ' class="buy-btn">Buy</button>' +
            '</footer>' +
            '</div>' +
            '</div>' +
            '</li>';
        itemList.append(html);
    }

    //Add eventlistener to buy-button to place items in cart.
    $('.buy-btn').click(function (e) {
        addProductToCart($(e.target).data("id"));
    });

}
