export function toggleBackground() {
    if ($(".background-image").css("display") !== "none") {
        $(".background-image").css("opacity", "0").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', hideBackgroundImage);
        displayClearfix();
    }
}

function displayClearfix() {
    $(".main-view").css("opacity", "1").unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend");
    $(".clearfix").css("height", "100%").css("opacity", "1").unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend");
}

function hideBackgroundImage() {
    $(".background-image").css("display", "none");
}