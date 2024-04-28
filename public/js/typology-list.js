import { List } from './list.object.js';
/* 
* List Title Managment
* Function createListTitle()
*/
function createListTitle(){ 
    List.addTitle((document.getElementById("inputListTitle").value.length > 0 && List.title === null) ? document.getElementById("inputListTitle").value : List.title);
    document.getElementById("inputListTitle").value = List.title;
    ableOrDisableListTools(true, false);
    changeVisivilityStateById('listActions', 'invisible', 'visible');
}
const newListTileButton = document.getElementById("inputListTitleButton");
newListTileButton.addEventListener('click', createListTitle, false);
/* 
* Function removeListTitle()
* Info : Will be deleted all list content (title, typos, items)
*/
function removeListTitle(){
    if(confirm('Do you want to delete the list?')){
        document.getElementById("inputListTitle").value = ""; 
        List.deleteTitle();
        ableOrDisableListTools(false, true);
        changeVisivilityStateById('listActions', 'visible', 'invisible');
        document.getElementById("typologiesList").innerHTML = '';
        document.getElementById("selectItemTypo").innerHTML = '';
        document.getElementById("itemsList").innerHTML = '';        
    }
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
const newTypologyButton = document.getElementById("inputTypologyTitleButton");
newTypologyButton.addEventListener('click', addTypology, false);
/* 
* Function removeTypology()
* Info : Typologies in use on the list can't be removed
*/
function removeTypology(id){
    List.deleteTypo(id);
    loadTypologiesHtml();  
}
/* 
* Function loadTypologiesHtml()
* Info : Prepare the HTML with typos info and actions and load the HTML into an specific id
*/
function loadTypologiesHtml(){
    document.getElementById("typologiesList").innerHTML = '';
    document.getElementById("selectItemTypo").innerHTML = '<option value="">Typology not selected</option>';
    List.getTypos().forEach((element, index) => {
        document.getElementById("typologiesList").innerHTML += `<li class="list-group-item">${element} <button type="button" data-id="${index}" data-iName="${element}" data-obj="removeTypo" class="remove btn btn-danger float-sm-end pt-1 pb-1"></button></li>`;
        document.getElementById("selectItemTypo").innerHTML += `<option value="${element}">${element}</option>`;
    }); 
}
/* 
* List Items Managment
* Function addItem()
*/
function addItem(){ 
    List.addItem(document.getElementById("inputItemTitle").value, document.getElementById("inputItemQuantity").value, document.getElementById("selectItemTypo").value);
    loadItemsHtml();
    document.getElementById("inputItemTitle").value = "";
    document.getElementById("inputItemQuantity").value = 1;
    document.getElementById("inputItemTitle").focus();
}
const newItemButton = document.getElementById("inputItemTitleButton");
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
        document.getElementById("itemsList").innerHTML += `<li class="list-group-item">${(element.typology.length > 0) ? element.typology : ""} ${element.title} X ${element.quantity} <button type="button" data-id="${index}" data-iName="${element.title}" data-obj="removeItem" class="remove btn btn-danger float-sm-end pt-1 pb-1"></button></li>`;
    });
}
/********************************************************************************************************/
/* 
* Function downloadList()
*/
async function downloadList(){
    let content = `${List.title} \n\nItems : \n\n`;
    List.getItems().forEach((element, index) => {
        content += `${index + 1} - ${(element.typology.length > 0) ? element.typology : ""} ${element.title} X ${element.quantity} \n`;
    })
    let file = new Blob([content], {
        type: 'text/txt'
    });
    const linkId = document.getElementById('downloadLink');
    linkId.href = URL.createObjectURL(file);
    linkId.download = `${List.title}.txt`;
    linkId.click();
}
const downloadListButton = document.getElementById("downloadList");
downloadListButton.addEventListener('click', downloadList, false);
/* 
* Function sendList()
*/
function sendList(){ 
    let body = "Items : %0D%0A%0D%0A";
    List.getItems().forEach((element, index) => {
        body += `${index + 1} - ${(element.typology.length > 0) ? element.typology : ""} ${element.title} X ${element.quantity} %0D%0A`;
    });
    body += "%0D%0ARemember : make sure that your bag has inside all items. Your life depends on!!";
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=New List : ${List.title}&body=${body}`);
}
const sendListButton = document.getElementById("sendList");
sendListButton.addEventListener('click', sendList, false);
/* 
* Function exportList()
*/
function exportList(){ 
    let content = `${List.title}\n`;
    List.getTyposSortAsc().forEach(element => {
        content += `${element}|`;
    });
    content += '\n';
    List.getItems().forEach(element => {
        content += `${(element.typology.length > 0) ? element.typology : ""};${element.title};${element.quantity}|`;
    })
    let file = new Blob([content], {type: 'text/txt'});
    const linkId = document.getElementById('downloadLink');
    linkId.href = URL.createObjectURL(file);
    linkId.download = `${List.title}.export.txt`;
    linkId.click();
    
    /* JSON EXPORT 
    const content = JSON.stringify(List);
    const file= new Blob([content], {type: "application/json"});
    const linkId = document.getElementById('downloadLink');
    linkId.href = URL.createObjectURL(file);
    linkId.download = `${List.title}.export.json`;
    linkId.click();
    */
    
}
const exportListButton = document.getElementById("exportList");
exportListButton.addEventListener('click', exportList, false);
/* 
* Function importList()
*/
function importList(){ 
    document.getElementById('importListfile').click();
}
const importListButton = document.getElementById("importList");
importListButton.addEventListener('click', importList, false);
/* 
* Function loadList()
*/
function loadList(){
    let fr = new FileReader();
    fr.onload = function () {
        fr.result.split('\n').forEach((element, index) => {
            switch(index){
                case 0:
                createListTitle(List.title = element);
                break;
                case 1:
                List.loadImportTypologies(element.split('|'));
                loadTypologiesHtml();
                break;
                case 2:
                List.loadImportItems(element.split('|'));
                loadItemsHtml();
                break;
            }
        })
        /* JSON Import
        console.log(JSON.parse(fr.result));
        createListTitle(List.title = fr.result.title);
        List.typologies = fr.result.typologies;
        List.items = fr.result.items;
        loadTypologiesHtml();
        loadItemsHtml();*/
    }
    fr.readAsText(this.files[0]);
}
const importListfile = document.getElementById('importListfile')
importListfile.addEventListener('change', loadList, false);
/********************************************************************************************************/
/*
* Preventing key enter usage and given click action to relationed button
*/
window.addEventListener('keydown',function(e) {
    if (e.keyIdentifier=='U+000A' || e.keyIdentifier=='Enter' || e.keyCode==13) {
        if (e.target.nodeName=='INPUT' && (e.target.type=='text' || e.target.type=='number')) {
            e.preventDefault();
            let target = (e.target.id === 'inputItemQuantity') ? 'inputItemTitle' : e.target.id;
            document.getElementById(target + 'Button').click();
        }
    }
}, true);
/*
* Redirecting to action by click event on delete Typo or delete Item button
*/
document.getElementById('typologiesList').addEventListener("click", function(e){
    //console.log(e.explicitOriginalTarget.attributes.getNamedItem("data-obj").value);
    if(e.explicitOriginalTarget.attributes.getNamedItem("data-obj").value === 'removeTypo'){
        if(confirm('Do you want to delete typology ' + e.explicitOriginalTarget.attributes.getNamedItem("data-iName").value + '?')){
            removeTypology(e.explicitOriginalTarget.attributes.getNamedItem("data-id").value);
        }
    }
}, true);
document.getElementById('itemsList').addEventListener("click", function(e){
    if(e.explicitOriginalTarget.attributes.getNamedItem("data-obj").value === 'removeItem'){
        if(confirm('Do you want to delete item ' + e.explicitOriginalTarget.attributes.getNamedItem("data-iName").value + '?')){
            removeItem(e.explicitOriginalTarget.attributes.getNamedItem("data-id").value);
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
/*
* Function ableOrDisableListTools(bool a. bool b)
* Changes an disabled state by id css class on List Tools
*/
function ableOrDisableListTools(a, b){
    document.getElementById("inputListTitle").disabled = a;
    document.getElementById("inputListTitleButton").disabled = a;
    document.getElementById("removeListTitle").disabled = b;
    document.getElementById("downloadList").disabled = b;
    document.getElementById("sendList").disabled = b;
    document.getElementById("exportList").disabled = b;
    document.getElementById("importList").disabled = a;
}