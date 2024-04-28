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
    List.addTitle(document.getElementById("inputListTitle").value = "");
    ableOrDisableListTools(false, true);
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
const newTypologyButton = document.getElementById("inputTypologyTitleButton");
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
    document.getElementById("selectItemTypo").innerHTML = '<option value="">Typology not selected</option>';
    List.getTypos().forEach((element, index) => {
        document.getElementById("typologiesList").innerHTML += `<li class="list-group-item">${element} <button type="button" data-id="${index}" data-obj="removeTypo" class="removeTypo btn btn-danger float-sm-end pt-1 pb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" dat-id="${index}" data-obj="removeTypo" class="removeTypo bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path></svg></button></li>`;
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
export function removeItem(id){
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
        document.getElementById("itemsList").innerHTML += `<li class="list-group-item">${(element.typology.length > 0) ? element.typology : ""} ${element.title} X ${element.quantity} <button type="button" data-id="${index}" data-obj="removeItem" class="btn btn-danger float-sm-end pt-1 pb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path></svg></button></li>`;
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
    let file = new Blob([content], {
        type: 'text/txt'
    });
    const linkId = document.getElementById('downloadLink');
    linkId.href = URL.createObjectURL(file);
    linkId.download = `${List.title}.export.txt`;
    linkId.click();
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
    let textContent = '';
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
        List.deleteTypo(e.explicitOriginalTarget.attributes.getNamedItem("data-id").value);
        loadTypologiesHtml();
    }
}, true);
document.getElementById('itemsList').addEventListener("click", function(e){
    if(e.explicitOriginalTarget.attributes.getNamedItem("data-obj").value === 'removeItem'){
        List.deleteItem(e.explicitOriginalTarget.attributes.getNamedItem("data-id").value);
        loadItemsHtml();
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