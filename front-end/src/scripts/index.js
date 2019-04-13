import {displayProducts} from "./products";
import {searchProducts} from "./products";
import {loadCategories, loadSubCategories} from "./category";
import {adminButton} from "./utils";

require('./admin.js');
require('./background.js');
require('./cart.js');
require('./category.js');
require('./products.js');
require('./paginator.js');
require('./utils.js');

document.addEventListener("DOMContentLoaded", function () {
    setUpEventListeners();
    loadApplication();
    loadCategories();
    loadSubCategories();

});

export function loadApplication() {
    $('.main-view').html("");
    displayProducts();
    adminButton('Home');
}

function setUpEventListeners() {
    //Set up event listener for search button
    $('.searchBtn').click(function (e) {
        e.preventDefault();
        searchProducts($('.search-text-field').val());
    });
    //Set up event listener that listens for input in searchField and then performs search
    $('.search-text-field').on('keyup', function () {
        searchProducts($('.search-text-field').val());
    });
}