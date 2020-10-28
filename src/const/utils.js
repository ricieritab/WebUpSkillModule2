// utils.js

const elementById = (id) => {
    return document.getElementById(id);
}

const elementsByClassName = (className) => {
    return document.querySelectorAll(`.${className}`);
}

const addFilterToNodeList = () => {
    if (window.NodeList && !NodeList.prototype.filter) {
        NodeList.prototype.filter = Array.prototype.filter;
    }
}

module.exports = {
    elementById, elementsByClassName, addFilterToNodeList
};