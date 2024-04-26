/*
* Object List Declaration
*/
export const List = {
    title : "",
    typologies : [],
    items : [],
    addTitle : function(value){
        this.title = value;
    },
    addTypo : function(value){
        if(value.length === 0){ return alert('Typology title can not be empty');}
        this.typologies.push(value);
    },
    deleteTypo : function(id){
        switch(id){
            case 0:
            this.typologies.shift();
            break;
            case (id === this.typologies.length - 1):
            this.typologies.pop();
            break;
            default:
            this.typologies.splice(id - 1, 1);
        }
    },
    addItem : function(valueA, valueB, valueC){
        if(valueA.length === 0){ return alert('Item title can not be empty');}
        this.items.push({title : valueA, quantity : valueB, typology : valueC});
    },
    deleteItem : function(id){
        switch(id){
            case 0:
            this.items.shift();
            break;
            case (id === this.items.length - 1):
            this.items.pop();
            break;
            default:
            this.items.splice(id - 1, 1);
        }
    },
    getTypos : function(){
        return this.typologies;
    },
    getTyposSortAsc : function(){
        return this.typologies.sort();
    },
    getTyposSortDesc : function(){
        return this.typologies.sort(function(a,b){
            if(a<b){return 1;}
            if(a>b){return -1;}
            return 0;
        });
    },
    getItems : function(){
        return this.items;
    },
    getItemsSortAsc : function(){
        return this.items.sort();
    },
    getItemsSortDesc : function(){
        return this.items.sort(function(a,b){
            if(a.title<b.title){return 1;}
            if(a.title>b.title){return -1;}
            return 0;
        });
    },
};