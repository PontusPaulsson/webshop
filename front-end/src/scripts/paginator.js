import {loadProducts} from "./products";

export const paginator = $('.pagination');

/*
    Functions for dynamic paginator and amount label for search results.
*/

export function loadPaginator(items, currentPageNumber) {
    let pageNrHtml;
    paginator.html("");
    let pagesToLoad = Math.ceil(items.length / 12);

    //Adds a previous button
    pageNrHtml = '<li class="page-item-previous">' +
        '<a class="page-link" href="#">' +
        '<span>&laquo;</span>' +
        '<span class="sr-only">Previous</span>' +
        '</a>' +
        '</li>';
    paginator.append(pageNrHtml);
    $('.page-item-previous').click(function (e) {
        if (currentPageNumber > 1) {
            currentPageNumber--;
            loadProducts(items, currentPageNumber);
        }
    });

    //Dynamically adds pages to pagination ul
    for (let i = 1; i <= pagesToLoad; i++) {
        let pageNrHtml = "";
        if (i === currentPageNumber) {

            pageNrHtml = '<li class="page-item"">' +
                '<a class="page-link" style="background-color: #ffffff" href="#">' + i + '</a></li>';
        } else {
            pageNrHtml = '<li class="page-item">' +
                '<a class="page-link" href="#">' + i + '</a></li>';
        }
        paginator.append(pageNrHtml);
    }

    //Add event listener for pagination buttons
    $('.page-item').click(function (e) {
        loadProducts(items, Number.parseInt($(this).text()));
    });

    //Adds the next button
    pageNrHtml = '<li class="page-item-next">' +
        '<a class="page-link" href="#">' +
        '<span>&raquo;</span>' +
        '<span class="sr-only text-dark">Next</span>' +
        '</a>' +
        '</li>';
    paginator.append(pageNrHtml);
    $('.page-item-next').click(function () {
        if (currentPageNumber < pagesToLoad) {
            currentPageNumber++;
            loadProducts(items, currentPageNumber);
        }
    });
}