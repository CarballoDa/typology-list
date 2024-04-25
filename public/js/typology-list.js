import { List } from './list.object.js';
/* 
* List Title Managment
* Function createListTitle()
*/
function createListTitle(){ 
    List.addTitle((document.getElementById("inputListTitle").value.length > 0) ? document.getElementById("inputListTitle").value : 'Empty Title List');
    document.getElementById("inputListTitle").value = List.title;
    document.getElementById("inputListTitle").disabled = true;
    changeVisivilityStateById('newListTitle', 'visible', 'invisible');
    changeVisivilityStateById('removeListTitle', 'invisible', 'visible');
    changeVisivilityStateById('listActions', 'invisible', 'visible');
}
const newListTileButton = document.getElementById("newListTitle");
newListTileButton.addEventListener('click', createListTitle, false);
/* 
* Function removeListTitle()
* Info : Will be deleted all list content (title, typos, items)
*/
function removeListTitle(){ 
    List.addTitle(document.getElementById("inputListTitle").value = "");
    document.getElementById("inputListTitle").disabled = false;
    changeVisivilityStateById('newListTitle', 'invisible', 'visible');
    changeVisivilityStateById('removeListTitle', 'visible', 'invisible');   
    changeVisivilityStateById('listActions', 'visible', 'invisible');
}
const removeListTitleButton = document.getElementById("removeListTitle");
removeListTitleButton.addEventListener('click', removeListTitle, false);
/* 
* List Typologies Managment
* Function addTypology()
*/
function addTypology(){ 
    List.addTypo(document.getElementById("inputTypologyTitle").value);    
    loadTypologiesHtml();
    document.getElementById("inputTypologyTitle").value = "";
    document.getElementById("inputTypologyTitle").focus();
}
const newTypologyButton = document.getElementById("newTypology");
newTypologyButton.addEventListener('click', addTypology, false);
/* 
* Function removeTypology()
* Info : Typologies in use on the list can't be removed
*/
export function removeTypology(id){
    List.deleteTypo(id);
    loadTypologiesHtml();  
}
/* 
* Function loadTypologiesHtml()
* Info : Prepare the HTML with typos info and actions and load the HTML into an specific id
*/
function loadTypologiesHtml(){
    document.getElementById("typologiesList").innerHTML = '';
    List.getTyposSortAsc().forEach((element, index) => {
        document.getElementById("typologiesList").innerHTML += `<li class="list-group-item">${element} <button onclick="removeTypology(${index})" type="button" class="btn btn-outline-warning float-sm-end pt-1 pb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path></svg></button></li>`;
    });
}
/* 
* List Items Managment
* Function addItem()
*/
function addItem(){ 
    List.addItem(document.getElementById("inputItemTitle").value, document.getElementById("inputItemQuantity").value);
    loadItemsHtml();
    document.getElementById("inputItemTitle").value = "";
    document.getElementById("inputItemQuantity").value = 1;
    document.getElementById("inputItemTitle").focus();
}
const newItemButton = document.getElementById("newItem");
newItemButton.addEventListener('click', addItem, false);
/* 
* Function removeItem()
*/
function removeItem(id){
    List.deleteItem(id);
    loadItemsHtml();
}
/* 
* Function loadItemsHtml()
* Info : Prepare the HTML with items info and actions and load the HTML into an specific id
*/
function loadItemsHtml(){
    document.getElementById("itemsList").innerHTML = '';
    List.getItems().forEach((element, index) => {
        document.getElementById("itemsList").innerHTML += `<li class="list-group-item">${element.title}    X    ${element.quantity} <button type="button" class="btn btn-outline-warning float-sm-end pt-1 pb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path></svg></button></li>`;
    });
}
/********************************************************************************************************/
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
* Function changeVisivilityStateById(id. oldClass, newClass)
* Changes an visible or invisible id css class removing oldClass and adding newClass
*/
function changeVisivilityStateById(id, oldClass, newClass){
    document.getElementById(id).classList.remove(oldClass);
    document.getElementById(id).classList.add(newClass);    
}