import {loadProducts} from "./products";
import {allItems} from "./products";
import {fetchSubCategories, fetchCategories} from "./utils";

export async function loadCategories() {

    const categories = await fetchCategories();
    categories.forEach(function (category) {
        let html = '<li class="navbar-item dropdown">' +
            '<a class="nav-link dropdown-toggle" data-id="' + category.id + '"href="#"data-toggle="dropdown">' + category.name + '</a>' +
            '<div class="dropdown-menu cid-' + category.id + '">' +
            '</div>' +
            '</li>';
        $('.navbar-nav').append(html);
    });
}

export async function loadSubCategories() {

    const subCategories = await fetchSubCategories();
    subCategories.forEach(function (subcategory) {

        //Create dropdown-menu div for this subcategory
        const subCatHtml = '<a class="dropdown-item sub-category-' + subcategory.id + '"href="#">' + subcategory.name + '</a>';
        $(".cid-" + subcategory.category.id).append(subCatHtml);

        //Set up eventlistener for subcategory buttons and filter shown products on subcategory id
        $(".sub-category-" + subcategory.id).click(function (e) {
            const filteredItems = allItems.filter(item => item.subCategory.id === subcategory.id);
            loadProducts(filteredItems, 1);
        });
    });
}
