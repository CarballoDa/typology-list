import { List } from './list.class';
declare global { var list: List }

list = new List();
/*
* Listeners
*/
const newListTileButton = document.getElementById("inputListTitleButton")
newListTileButton?.addEventListener('click', createListTitle, false)

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