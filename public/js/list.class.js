/*
* Class List Declaration
*/
export class List{

    addTitle(value){
        this.title = value;
    }

    addTypo(value){
        this.typologies.push(value);
    }

    addItem(valueA, valueB){
        this.items.push({title : valueA, quantity : valueB});
    }
 
}