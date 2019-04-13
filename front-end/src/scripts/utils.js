import {url} from "./products";
import {loadAdminPage} from "./admin";
import {loadApplication} from "./index";

export function fetchSubCategories(){
    return fetch(url + "subcategories").then(response => response.json().then(data => data));
}

export function fetchCategories(){
    return fetch(url + "categories").then(response => response.json().then(data => data));
}

export function fetchProducts(){
    return fetch(url + "products").then(response => response.json().then(data => data));
}

//Logic for admin/home button
export function adminButton(page){
    const adminButton = $('.admin-button');
    switch(page){
        case 'Home':
            adminButton.unbind("click");
            adminButton.text('Admin');
            adminButton.click(function(){
                loadAdminPage();
            });
            break;
        case 'Admin':
            adminButton.unbind("click");
            adminButton.text('Home');
            adminButton.click(function(){
                loadApplication();
            });
            break;
    }
}