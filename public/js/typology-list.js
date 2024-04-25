import { list } from './list.object.js';
/* 
* List Title Managment
* Function createListTitle()
*/
function createListTitle(){ 
    list.addTitle((document.getElementById("inputListTitle").value.length > 0) ? document.getElementById("inputListTitle").value : 'Empty Title List');
    document.getElementById("inputListTitle").value = list.title;
    document.getElementById("inputListTitle").disabled = true;
    changenewListTitleButton('newListTitle', 'removeListTitle');
    console.log(list);
}
const newListTileButton = document.getElementById("newListTitle");
newListTileButton.addEventListener('click', createListTitle, false);
/* 
* Function removeListTitle()
* Info : Will be deleted all list content (title, typos, items)
*/
function removeListTitle(){ 
    list.addTitle(document.getElementById("inputListTitle").value = "");
    document.getElementById("inputListTitle").disabled = false;
    changenewListTitleButton('removeListTitle', 'newListTitle');
    console.log(list);
}
const removeListTitleButton = document.getElementById("removeListTitle");
removeListTitleButton.addEventListener('click', removeListTitle, false);
/* 
* List Typologies Managment
* Function addTypology()
*/
function addTypology(){ 
    list.addTypo(document.getElementById("inputTipologyTitle").value);
    console.log(list);
}
const newTypologyButton = document.getElementById("newTypology");
newTypologyButton.addEventListener('click', addTypology, false);
/* 
* Function removeTypology()
* Info : Typologies in use on the list can't be removed
*/
function removeTypology(id){}
/* 
* List Items Managment
* Function addItem()
*/
function addItem(){ 
    list.addItem(document.getElementById("inputItemTitle").value, document.getElementById("inputItemQuantity").value);
    console.log(list);
}
const newItemButton = document.getElementById("newItem");
newItemButton.addEventListener('click', addItem, false);
/* 
* Function removeItem()
*/
function removeItem(id){}
/*
* Preventing key enter usage
*/
window.addEventListener('keydown',function(e) {
    if (e.keyIdentifier=='U+000A' || e.keyIdentifier=='Enter' || e.keyCode==13) {
        if (e.target.nodeName=='INPUT' && e.target.type=='text') {
            e.preventDefault();
            return false;
        }
    }
}, true);
/*
* Function changeClassById(id. actualClass, newClass)
* Changes an id css class removing actualClass and adding newClass
*/
function changenewListTitleButton(idA, idB){
    document.getElementById(idA).classList.add('btnHidden');
    document.getElementById(idB).classList.remove('btnHidden');
}