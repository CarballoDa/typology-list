export class List {
    title: string = '';
    typologies: string[];
    items: any[];

    addTitle(title: string): void
    {
        this.title = (title.length === 0) ? title : 'My List'
    }

    removeTitle(): void
    {
        this.title = ''
    }

    addTypo(value: string): void
    {
        if(value.length === 0){ return alert('Typology title can not be empty') }
        this.typologies.push(value)
    }


    deleteTypo(id: number): void
    {
        switch(true)
        {
            case (id === 0):
            this.typologies.shift()
            break
            case (id === this.typologies.length - 1):
            this.typologies.pop()
            break
            default:
            this.typologies.splice(id, 1)
        }
    }

    addItem(valueA: string, valueB: number, valueC: string): void
    {
        if(valueA.length === 0){ return alert('Item title can not be empty') }
        this.items.push({title : valueA, quantity : valueB, typology : valueC})
    }

    deleteItem(id: number): void
    {
        switch(true){
            case (id === 0):
            this.items.shift()
            break
            case (id === this.items.length - 1):
            this.items.pop()
            break
            default:
            this.items.splice(id, 1)
        }
    }

    getTypos(): string[]
    {
        return this.typologies
    }

    getTyposSortAsc(): string[]
    {
        return this.typologies.sort()
    }
    
    getTyposSortDesc(): string[]
    {
        return this.typologies.sort(function(a,b){
            if(a<b){return 1}
            if(a>b){return -1}
            return 0
        })
    }

    getItems(): any[]
    {
        return this.items
    }

    getItemsSortAsc(): any[]
    {
        return this.items.sort()
    }

    getItemsSortDesc(): any[]
    {
        return this.items.sort(function(a,b){
            if(a.title<b.title){return 1}
            if(a.title>b.title){return -1}
            return 0
        })
    }

    loadImportTypologies(values: string[]): void
    {
        values.forEach(element => {
            if(element.length > 0){
                this.addTypo(element)
            }
        })
    }

    loadImportItems(values: any[]): void
    {
        values.forEach(element => {
            if(element.length > 0){
                let values = element.split(';')
                this.addItem(values[1], values[2], values[0])
            }
        });
    }
}