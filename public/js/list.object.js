/*
* Object List Declaration
*/
export const list = {
    title : "",
    typologies : [],
    items : [],
    addTitle : function(value){
        this.title = value;
    },
    addTypo : function(value){
        this.typologies.push(value);
    },
    addItem : function(valueA, valueB){
        this.items.push({title : valueA, quantity : valueB});
    },
    getTypoSortAsc : function(){
        return this.typologies.sort();
    },
    getTypoSortDesc : function(){
        return this.typologies.sort(function(a,b){
            if(a<b){return 1;}
            if(a>b){return -1;}
            return 0;
        });
    },
    getItmSortAsc : function(){
        return this.items.sort();
    },
    getItmSortDesc : function(){
        return this.items.sort(function(a,b){
            if(a.title<b.title){return 1;}
            if(a.title>b.title){return -1;}
            return 0;
        });
    },
};