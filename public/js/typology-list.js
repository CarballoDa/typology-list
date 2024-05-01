"use strict";
exports.__esModule = true;
var list_class_1 = require("./list.class");
list = new list_class_1.List();
/*
* Listeners
*/
var newListTileButton = document.getElementById("inputListTitleButton");
newListTileButton === null || newListTileButton === void 0 ? void 0 : newListTileButton.addEventListener('click', createListTitle, false);
/*
* Functions
*/
/*
* List Title Managment
* Function createListTitle()
* Getting and checking the title input value, list creation by title
*/
function createListTitle() {
    list.addTitle((document.getElementById("inputListTitle").value.length > 0 && list.title === null) ? document.getElementById("inputListTitle").value : list.title);
    document.getElementById("inputListTitle").value = list.title;
    ableOrDisableListTools(true, false);
    changeVisivilityStateById('listActions', 'invisible', 'visible');
}
/********************************************************************************************************/
/*
* Function changeVisivilityStateById()
* Changes an visible or invisible id css class removing oldClass and adding newClass
* param {id} string
* param {oldClass} string
* param {newClass} string
*/
function changeVisivilityStateById(id, oldClass, newClass) {
    document.getElementById(id).classList.remove(oldClass);
    document.getElementById(id).classList.add(newClass);
}
/*
* Function ableOrDisableListTools()
* Changes an disabled state by id css class on List Tools
* param {a} bool
* param {b} bool
*/
function ableOrDisableListTools(a, b) {
    document.getElementById("inputListTitle").disabled = a;
    document.getElementById("inputListTitleButton").disabled = a;
    document.getElementById("removeListTitle").disabled = b;
    document.getElementById("downloadList").disabled = b;
    document.getElementById("sendList").disabled = b;
    document.getElementById("exportList").disabled = b;
    document.getElementById("importList").disabled = a;
}
