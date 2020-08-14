// utils.js

function $(id) {
    return document.getElementById(id);
}

function elementsByClassName(className) {
    return document.querySelectorAll(`.${className}`);
}

if (window.NodeList && !NodeList.prototype.filter) {
    NodeList.prototype.filter = Array.prototype.filter;
}

function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}