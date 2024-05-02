import { List } from './list.class'
const list = new List()
/*
* Listeners
*/
const newListTileButton = document.getElementById("inputListTitleButton")
newListTileButton.addEventListener('click', createListTitle, false)
const removeListTitleButton = document.getElementById("removeListTitle")
removeListTitleButton.addEventListener('click', removeListTitle, false)
const newTypologyButton = document.getElementById("inputTypologyTitleButton")
newTypologyButton.addEventListener('click', addTypology, false)

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
        document.getElementById("typologiesList").innerHTML += `<li class="list-group-item">${element} <button type="button" data-id="${index}" data-iName="${element}" data-obj="removeTypo" class="remove btn btn-danger float-sm-end pt-1 pb-1"></button></li>`;
        document.getElementById("selectItemTypo").innerHTML += `<option value="${element}">${element}</option>`;
    }); 
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