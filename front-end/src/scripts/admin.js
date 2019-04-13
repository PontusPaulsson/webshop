/*
Adds admin functionality which allows user to manage categories, sub-categories and products.
 */

import {mainView, url} from "./products";
import {toggleBackground} from "./background";
import {fetchCategories, fetchSubCategories} from "./utils";
import {loadCategories, loadSubCategories} from "./category";
import {getAllProductsFromDatabase} from "./products";
import {adminButton} from "./utils";


import axios from 'axios';

export function loadAdminPage() {
    $('.main-view').html("");
    $('.pagination').html("");
    $('.amount').html("");
    toggleBackground();
    loadProductButtons();
    createProductForm();
    adminButton('Admin');
}

//Fetches Categories or SubCategories from database and generates <option> elements for these.
async function generateHtml(type) {
    let json = '';
    let html = '';
    switch (type) {
        case 'subcategories':
            json = await fetchSubCategories();
            break;
        case 'categories':
            json = await fetchCategories();
            break;
    }
    json.forEach(function (data) {
        html += `<option data-id="${data.id}">${data.name}</option>`;
    });
    return html;
}


function clearForm() {
    $(".status-label").remove();
    $(".product-form").remove();
    $(".subcategory-form").remove();
    $(".category-form").remove();
}

function loadProductButtons() {
    const html =
        '<button class="admin create-product btn m-2" style="background-color: #a99e93">Create Product</button>' +
        '<button class="admin create-subcategory btn m-2">Create Subcategory</button>' +
        '<button class="admin create-category btn m-2">Create Category</button>';
    mainView.append(html);

    $('.create-product').click(function (e) {
        clearForm();
        toggleButtonBackground(e);
        createProductForm();
    });

    $('.create-subcategory').click(function (e) {
        clearForm();
        toggleButtonBackground(e);
        createSubCategoryForm();
    });
    $('.create-category').click(function (e) {
        clearForm();
        toggleButtonBackground(e);
        createCategoryForm();
    });

}

function createCategoryForm() {
    const html =
        '<form class="category-form" id="myForm" required>' +
        '<div class="form-group">' +
        '<label for="categoryName">Category Name</label>' +
        '<input type="text" class="form-control" id="categoryName" type="number" min="100" max="300"    placeholder="Category name">' +
        '</div>' +
        '<button type="submit" class="submit btn">Submit</button>' +
        '</form>';
    mainView.append(html);

    $('.submit').click(async function (event) {
        event.preventDefault();
        if (!$('#categoryName').val().length > 0) {
            removeStatusLabel();
            $('.main-view').append("<h5 class='status-label'>Category name cannot be empty.</h5>");
        } else {
            await submitCategory();
            $('.category-form')[0].reset();
            $('.navbar-nav').html('');
            await loadCategories();
            await loadSubCategories();
        }
    });
}

async function submitCategory() {
    let formData = new FormData();
    formData.append('name', $('#categoryName').val());
    await axios({
        method: 'POST',
        mode: "CORS",
        url: url + 'category',
        data: formData,
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then(() => {
        generateStatusLabel("Category", "success");
    }).catch((error) => {
        generateStatusLabel("Category", "error", error);
    });
}


async function createSubCategoryForm() {
    const categoriesHtml = await generateHtml('categories');
    const html =
        '<form class="subcategory-form">' +
        '<div class="form-group">' +
        '<label for="subCategoryName">Subcategory Name</label>' +
        '<input type="text" class="form-control" id="subCategoryName" placeholder="Subcategory name">' +
        '</div>' +
        '<div class="form-group">' +
        '<label>Category</label>' +
        '<select class="form-control" id="category">' +
        categoriesHtml +
        '</select>' +
        '</div>' +
        '<button type="submit" class="submit btn">Submit</button>' +
        '</form>';
    mainView.append(html);

    $('.submit').click(async function (event) {
        event.preventDefault();
        if (!$("#subCategoryName").val().length > 0) {
            removeStatusLabel();
            $('.main-view').append("<h5 class='status-label'>Subcategory name cannot be empty.</h5>");
        } else {
            await submitSubCategory();
            $('.subcategory-form')[0].reset();
            $('.navbar-nav').html('');
            await loadCategories();
            await loadSubCategories();
        }
    });
}

async function submitSubCategory() {
    let formData = new FormData();
    formData.append('name', $('#subCategoryName').val());
    formData.append('categoryId', $('#category option:selected').data('id'));

    await axios({
        method: 'POST',
        mode: "CORS",
        url: url + 'subcategory',
        data: formData,
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then(() => {
        generateStatusLabel("Subcategory", "success");
    }).catch((error) => {
        generateStatusLabel("Subcategory", "error", error);
    });
}

async function createProductForm() {
    const subCategoriesHtml = await generateHtml('subcategories');
    const html =
        '<form class="product-form">' +
        '<div class="form-group">' +
        '<label for="productName">Product Name</label>' +
        '<input type="text" class="form-control" id="title" placeholder="Product name" name="title">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="description">Description</label>' +
        '<input type="text" class="form-control" id="description" placeholder="Description" name="description">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="price">Price</label>' +
        '<input type="number" class="form-control" id="price" placeholder="Price" name="price">' +
        '</div>' +
        '<div class="form-group">' +
        '<label>Subcategory</label>' +
        '<select class="form-control" id="subCategory">' +
        subCategoriesHtml +
        '</select>' +
        '</div>' +
        "Image" +
        '<div class="d-flex"">' +
        '<input type="file" class="product-image" name="file">' +
        '</div>' +
        '<button type="submit" class="submit button btn">Submit</button>' +
        '</form>';
    mainView.append(html);

    $('.submit').click(async function (event) {
        event.preventDefault(event);
        if (!$('#title').val().length > 0) {
            removeStatusLabel();
            $('.main-view').append("<h5 class='status-label'>Product name cannot be empty.</h5>");
        } else if ($('.product-image').get(0).files.length === 0) {
            removeStatusLabel();
            $('.main-view').append("<h5 class='status-label'>Please select an image.</h5>");
        } else {
            await submitProduct(event);
            $('.product-form')[0].reset();
            await getAllProductsFromDatabase();
        }
    });
}

async function submitProduct() {
    let formData = new FormData();
    formData.append('file', $('.product-image').prop('files')[0]);
    formData.append('title', $('#price').val());
    formData.append('description', $('#description').val());
    formData.append('price', $('#price').val());
    formData.append('subCategoryId', $('#subCategory option:selected').data('id'));

    await axios({
        method: 'POST',
        mode: "CORS",
        url: url + 'product',
        data: formData,
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then(() => {
        generateStatusLabel("Product", "success");
    }).catch((error) => {
        generateStatusLabel("Product", "error", error);
    });
}


function toggleButtonBackground(e) {
    const clickedButton = $(e.target);
    const buttons = $('.admin');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "";
    }
    clickedButton.css("background-color", "#a99e93");
}

function generateStatusLabel(type, status, error) {
    removeStatusLabel();
    if (status === "success") {
        $('.main-view').append(`<h5 class="status-label">${type} was added successfully.</h5>`);
    } else {
        $('.main-view').append(`<h5 class="status-label>${type} was not added successfully: ${error}</h5>`);
    }
}

function removeStatusLabel() {
    $(".status-label").remove();
}