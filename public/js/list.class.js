"use strict";
exports.__esModule = true;
exports.List = void 0;
var List = /** @class */ (function () {
    function List() {
        this.title = '';
    }
    List.prototype.addTitle = function (title) {
        this.title = (title.length === 0) ? title : 'My List';
    };
    List.prototype.removeTitle = function () {
        this.title = '';
    };
    List.prototype.addTypo = function (value) {
        if (value.length === 0) {
            return alert('Typology title can not be empty');
        }
        this.typologies.push(value);
    };
    List.prototype.deleteTypo = function (id) {
        switch (true) {
            case (id === 0):
                this.typologies.shift();
                break;
            case (id === this.typologies.length - 1):
                this.typologies.pop();
                break;
            default:
                this.typologies.splice(id, 1);
        }
    };
    List.prototype.addItem = function (valueA, valueB, valueC) {
        if (valueA.length === 0) {
            return alert('Item title can not be empty');
        }
        this.items.push({ title: valueA, quantity: valueB, typology: valueC });
    };
    List.prototype.deleteItem = function (id) {
        switch (true) {
            case (id === 0):
                this.items.shift();
                break;
            case (id === this.items.length - 1):
                this.items.pop();
                break;
            default:
                this.items.splice(id, 1);
        }
    };
    List.prototype.getTypos = function () {
        return this.typologies;
    };
    List.prototype.getTyposSortAsc = function () {
        return this.typologies.sort();
    };
    List.prototype.getTyposSortDesc = function () {
        return this.typologies.sort(function (a, b) {
            if (a < b) {
                return 1;
            }
            if (a > b) {
                return -1;
            }
            return 0;
        });
    };
    List.prototype.getItems = function () {
        return this.items;
    };
    List.prototype.getItemsSortAsc = function () {
        return this.items.sort();
    };
    List.prototype.getItemsSortDesc = function () {
        return this.items.sort(function (a, b) {
            if (a.title < b.title) {
                return 1;
            }
            if (a.title > b.title) {
                return -1;
            }
            return 0;
        });
    };
    List.prototype.loadImportTypologies = function (values) {
        var _this = this;
        values.forEach(function (element) {
            if (element.length > 0) {
                _this.addTypo(element);
            }
        });
    };
    List.prototype.loadImportItems = function (values) {
        var _this = this;
        values.forEach(function (element) {
            if (element.length > 0) {
                var values_1 = element.split(';');
                _this.addItem(values_1[1], values_1[2], values_1[0]);
            }
        });
    };
    return List;
}());
exports.List = List;
