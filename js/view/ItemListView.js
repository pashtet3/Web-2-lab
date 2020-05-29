import ItemView from './ItemView.js';
export default class ItemListView {
    constructor(itemListModel) {
        this.itemListModel = itemListModel;
        this.controllerOnAddItem = null;
        this.controllerOnDelItem = null;
        this.controllerOnEditItem = null;
        this.controllerOnCheckItem = null;
        document.querySelector('#dictionary').addEventListener('click', (e) => this.onClick(e));
    }

    setControllerOnAddItem(controllerOnAddItem) {
        this.controllerOnAddItem = controllerOnAddItem;
    }
    setControllerOnDelItem(controllerOnDelItem) {
        this.controllerOnDelItem = controllerOnDelItem;
    }
    setControllerOnEditItem(controllerOnEditItem) {
        this.controllerOnEditItem = controllerOnEditItem;
    }
    setControllerOnCheckItem(controllerOnCheckItem) {
        this.controllerOnCheckItem = controllerOnCheckItem;
    }
    onClick(e) {
        if (e.target.className === 'del-button') {
            this.controllerOnDelItem(e.target.dataset.id);
            return;
        }
        if (e.target.className === 'edit-button') {
            const word = prompt('Слово:', '');
            const meaning = prompt('Значення:', '')
            this.controllerOnEditItem(e.target.dataset.id, word, meaning);
            return;
        } 
    }
    onAddItem(e) {
        const word = prompt('Слово:', '');
        const meaning = prompt('Значення:', '')
        this.controllerOnAddItem(word, meaning);
    }
    onCheckItem(e) {
        this.controllerOnCheckItem();
    }
    toHtml() {
        const itemsHtml = this.itemListModel.items.map( (item) => {
            const itemView = new ItemView(item);
            return itemView.toHtml();
        }).join("");
        return `<table><tr><th>Word</th><th>Meaning</th></tr>${itemsHtml}</table>`;
    }
}