import { List } from './list.class'
const list = new List()
/*
* Buttons Listeners
*/
const newListTileButton = document.getElementById("inputListTitleButton")
newListTileButton.addEventListener('click', createListTitle, false)
const removeListTitleButton = document.getElementById("removeListTitle")
removeListTitleButton.addEventListener('click', removeListTitle, false)
const newTypologyButton = document.getElementById("inputTypologyTitleButton")
newTypologyButton.addEventListener('click', addTypology, false)
const newItemButton = document.getElementById("inputItemTitleButton")
newItemButton.addEventListener('click', addItem, false)
const downloadListButton = document.getElementById("downloadList")
downloadListButton.addEventListener('click', downloadList, false)
const sendListButton = document.getElementById("sendList")
sendListButton.addEventListener('click', sendList, false)
const exportListButton = document.getElementById("exportList")
exportListButton.addEventListener('click', exportList, false)
const importListButton = document.getElementById("importList")
importListButton.addEventListener('click', importList, false)
const importListfile = document.getElementById('importListfile')
importListfile.addEventListener('change', loadList, false)
/*
* Buttons Listeners Redirecting to action by click event on delete Typo or delete Item button
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
* Functions
*/
/* 
* List Title Managment
* Function createListTitle()
* Getting and checking the title input value, list creation by title
*/
function createListTitle(): void
{ 
    list.addTitle(((document.getElementById("inputListTitle") as HTMLInputElement).value.length > 0 && list.title === null) ? (document.getElementById("inputListTitle") as HTMLInputElement).value : list.title);
    (document.getElementById("inputListTitle") as HTMLInputElement).value = list.title
    ableOrDisableListTools(true)
    changeVisivilityStateById('listActions', 'invisible', 'visible')
}
/* 
* Function removeListTitle()
* Deleting all list content (title, typos, items)
*/
function removeListTitle(): void
{
    if(confirm('Do you want to delete the list?')){
        (document.getElementById("inputListTitle") as HTMLInputElement).value = ""
        list.removeTitle()
        ableOrDisableListTools(false)
        changeVisivilityStateById('listActions', 'visible', 'invisible')
        document.getElementById("typologiesList").innerHTML = ''
        document.getElementById("selectItemTypo").innerHTML = ''
        document.getElementById("itemsList").innerHTML = '' 
    }
}
/* 
* List Typologies Managment
* Function addTypology()
* Getting the typology input value, typology creation
*/
function addTypology(): void
{ 
    list.addTypo((document.getElementById("inputTypologyTitle") as HTMLInputElement).value) 
    loadTypologiesHtml();
    (document.getElementById("inputTypologyTitle") as HTMLInputElement).value = "";
    (document.getElementById("inputTypologyTitle") as HTMLInputElement).focus()
}
/* 
* Function removeTypology()
* Removing typology from List.typologies
* @param {id} number
*/
function removeTypology(id: number): void
{
    list.deleteTypo(id)
    loadTypologiesHtml()
}
/* 
* Function loadTypologiesHtml()
* Preparing the HTML with typos info and actions and loading the HTML into an specific id
*/
function loadTypologiesHtml(): void
{
    document.getElementById("typologiesList").innerHTML = ''
    document.getElementById("selectItemTypo").innerHTML = '<option value="">Typology not selected</option>'
    list.getTypos().forEach((element, index) => {
        document.getElementById("typologiesList").innerHTML += `<li class="list-group-item">${element} <button type="button" data-id="${index}" data-iName="${element}" data-obj="removeTypo" class="remove btn btn-danger float-sm-end pt-1 pb-1"></button></li>`
        document.getElementById("selectItemTypo").innerHTML += `<option value="${element}">${element}</option>`
    }); 
}
/* 
* List Items Managment
* Function addItem()
* Getting the typology select, item input and quantity input value, item creation
*/
function addItem(): void
{ 
    list.addItem((document.getElementById("inputItemTitle") as HTMLInputElement).value, (document.getElementById("inputItemQuantity") as HTMLFormElement).value, (document.getElementById("selectItemTypo") as HTMLInputElement).value)
    loadItemsHtml();
    (document.getElementById("inputItemTitle") as HTMLInputElement).value = "";
    (document.getElementById("inputItemQuantity") as HTMLFormElement).value = 1
    document.getElementById("inputItemTitle").focus()
}
/* 
* Function removeItem()
* Removing item from List.items
* @param {id} number
*/
function removeItem(id): void
{
    list.deleteItem(id)
    loadItemsHtml()
}
/* 
* Function loadItemsHtml()
* Preparing the HTML with items info and actions and loading the HTML into an specific id
*/
function loadItemsHtml(): void
{
    document.getElementById("itemsList").innerHTML = '';
    list.getItems().forEach((element, index) => {
        document.getElementById("itemsList").innerHTML += `<li class="list-group-item">${(element.typology.length > 0) ? element.typology : ""} ${element.title} X ${element.quantity} <button type="button" data-id="${index}" data-iName="${element.title}" data-obj="removeItem" class="remove btn btn-danger float-sm-end pt-1 pb-1"></button></li>`
    })
}
/* 
* Function downloadList()
+ Generating a {List.title}.txt file whith list title and items formated inside. Auto download.
*/
async function downloadList()
{
    let content = `${list.title} \n\nItems : \n\n`
    list.getItems().forEach((element, index) => {
        content += `${index + 1} - ${(element.typology.length > 0) ? element.typology : ""} ${element.title} X ${element.quantity} \n`
    })
    let file = new Blob([content], {
        type: 'text/txt'
    })
    const linkId = (document.getElementById('downloadLink') as HTMLLinkElement);
    (linkId as HTMLLinkElement).href = URL.createObjectURL(file);
    (linkId as any).download = `${list.title}.txt`
    linkId.click();
}
/* 
* Function sendList()
* Generating formated email body with List title and items. Opening email managment in navigator to send to anyone.
*/
function sendList(){ 
    let body = "Items : %0D%0A%0D%0A";
    list.getItems().forEach((element, index) => {
        body += `${index + 1} - ${(element.typology.length > 0) ? element.typology : ""} ${element.title} X ${element.quantity} %0D%0A`;
    });
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=New List : ${list.title}&body=${body}`);
}
/* 
* Function exportList()
+ Generating a {List.title}.export.txt file whith all list data (title, typologies and items) formated inside. Download auto.
* This file could be used to import it as list backup.
* Working on exporting as JSON file...
*/
function exportList(){ 
    let content = `${list.title}\n`;
    list.getTyposSortAsc().forEach(element => {
        content += `${element}|`;
    });
    content += '\n';
    list.getItems().forEach(element => {
        content += `${(element.typology.length > 0) ? element.typology : ""};${element.title};${element.quantity}|`;
    })
    let file = new Blob([content], {type: 'text/txt'});
    const linkId = document.getElementById('downloadLink');
    linkId.href = URL.createObjectURL(file);
    linkId.download = `${list.title}.export.txt`;
    linkId.click();
    
}
/* 
* Function importList()
* Uploading previous {List.title}.export.txt file
*/
function importList(){ 
    document.getElementById('importListfile').click();
}
/* 
* Function loadList()
+ Taking an imported {List.title}.export.txt file whith all list data (title, typologies and items) formated inside
* The information is loaded into the List object and web application
* Working on importing as JSON file...
*/
function loadList(){
    let fr = new FileReader();
    fr.onload = function () {
        fr.result.split('\n').forEach((element, index) => {
            switch(index){
                case 0:
                list.addTitle(element)
                break;
                case 1:
                list.loadImportTypologies(element.split('|'))
                loadTypologiesHtml();
                break;
                case 2:
                list.loadImportItems(element.split('|'))
                loadItemsHtml();
                break;
            }
        })
    }
    fr.readAsText(this.files[0]);
}
/********************************************************************************************************/
/*
* Function changeVisivilityStateById()
* Changes an visible or invisible id css class removing oldClass and adding newClass
* param {id} string
* param {oldClass} string
* param {newClass} string
*/
function changeVisivilityStateById(id: string, oldClass: string, newClass: string): void
{
    document.getElementById(id).classList.remove(oldClass);
    document.getElementById(id).classList.add(newClass);    
}
/*
* Function ableOrDisableListTools()
* Changes an disabled state by id css class on List Tools
* param {a} bool
* param {b} bool
*/
function ableOrDisableListTools(a: boolean): void
{
    (document.getElementById("inputListTitle") as HTMLInputElement).disabled = a;
    (document.getElementById("inputListTitleButton") as HTMLButtonElement).disabled = a;
    (document.getElementById("removeListTitle") as HTMLButtonElement).disabled = !a;
    (document.getElementById("downloadList") as HTMLButtonElement).disabled = !a;
    (document.getElementById("sendList") as HTMLButtonElement).disabled = !a;
    (document.getElementById("exportList") as HTMLButtonElement).disabled = !a;
    (document.getElementById("importList") as HTMLButtonElement).disabled = !a;
}
