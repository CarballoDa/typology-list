/*
* Object List Declaration
*/
const list = {
    title : "",
    typologies : [],
    items : [],
    getSortAsc : function(typologies){
        return typologies.sort();
    },
    getSortDesc : function(typologies){
        return typologies.sort(function(a,b){
            if(a<b){return 1;}
            if(a>b){return -1;}
            return 0;
        });
    },
};

/* 
* List Title Managment
* Function createListTitle()
*/
const newListTileButton = document.getElementById("newListTitle");
function createListTitle(){ 
    list.title = (document.getElementById("inputListTitle").value.length > 0) ? document.getElementById("inputListTitle").value : 'Empty Title List';
    document.getElementById("inputListTitle").value = list.title;
    document.getElementById('newListTitle').classList.remove('visible');
    document.getElementById('newListTitle').classList.add('invisible');
    document.getElementById('removeListTitle').classList.remove('invisible');
    document.getElementById('removeListTitle').classList.add('visible');
    document.getElementById("inputListTitle").disabled = true;
    console.log(list);
}
newListTileButton.addEventListener('click', createListTitle, false);
/* 
* Function removeListTitle()
*/
const removeListTitleButton = document.getElementById("removeListTitle");
function removeListTitle(){ 
    list.title = document.getElementById("inputListTitle").value = "";
    document.getElementById('newListTitle').classList.remove('invisible');
    document.getElementById('newListTitle').classList.add('visible');
    document.getElementById('removeListTitle').classList.remove('visible');
    document.getElementById('removeListTitle').classList.add('invisible');
    document.getElementById("inputListTitle").disabled = false;
    console.log(list);
}
removeListTitleButton.addEventListener('click', removeListTitle, false);
/* 
* List Typologies Managment
*/
const newTypologyButton = document.getElementById("newTypology");
function addTypology(){ 
    list.typologies.push(document.getElementById("inputTipologyTitle").value);
    console.log(list);
}
newTypologyButton.addEventListener('click', addTypology, false);

/* 
* List Items Managment
*/
const newItemButton = document.getElementById("newItem");
function addItem(){ 
    list.items.push({title : document.getElementById("inputItemTitle").value, quantity : document.getElementById("inputItemQuantity").value});
    console.log(list);
}
newItemButton.addEventListener('click', addItem, false);



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