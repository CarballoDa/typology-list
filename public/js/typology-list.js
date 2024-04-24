/*
* Object List Declaration
*/
const list = {
    title : "",
    typologies : [],
    items : [],
    getTypoSortAsc : function(typologies){
        return typologies.sort();
    },
    getTypoSortDesc : function(typologies){
        return typologies.sort(function(a,b){
            if(a<b){return 1;}
            if(a>b){return -1;}
            return 0;
        });
    },
    getItmSortAsc : function(items){
        return typologies.sort();
    },
    getItmSortDesc : function(items){
        return items.sort(function(a,b){
            if(a.title<b.title){return 1;}
            if(a.title>b.title){return -1;}
            return 0;
        });
    },
};
/* 
* List Title Managment
* Function createListTitle()
*/
function createListTitle(){ 
    list.title = (document.getElementById("inputListTitle").value.length > 0) ? document.getElementById("inputListTitle").value : 'Empty Title List';
    document.getElementById("inputListTitle").value = list.title;
    document.getElementById("inputListTitle").disabled = true;
    changeClassById('newListTitle', 'visible', 'invisible');
    changeClassById('removeListTitle', 'invisible', 'visible');    
    console.log(list);
}
const newListTileButton = document.getElementById("newListTitle");
newListTileButton.addEventListener('click', createListTitle, false);
/* 
* Function removeListTitle()
* Info : Will be deleted all list content (title, typos, items)
*/
function removeListTitle(){ 
    list.title = document.getElementById("inputListTitle").value = "";
    document.getElementById("inputListTitle").disabled = false;
    changeClassById('removeListTitle', 'visible', 'invisible');
    changeClassById('newListTitle', 'invisible', 'visible');    
    console.log(list);
}
const removeListTitleButton = document.getElementById("removeListTitle");
removeListTitleButton.addEventListener('click', removeListTitle, false);
/* 
* List Typologies Managment
* Function addTypology()
*/
function addTypology(){ 
    list.typologies.push(document.getElementById("inputTipologyTitle").value);
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
    list.items.push({title : document.getElementById("inputItemTitle").value, quantity : document.getElementById("inputItemQuantity").value});
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
function changeClassById(id, actualClass, newClass){
    document.getElementById(id).classList.remove(actualClass);
    document.getElementById(id).classList.add(newClass);
}