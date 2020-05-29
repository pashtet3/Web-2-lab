import Item from "../model/Item.js";

export default class Controller {
    constructor(itemListModel, itemListView) {
        this.itemListModel = itemListModel;
        this.itemListView = itemListView;
        this.itemListModel.setOnChangeCallback((e) => this.onChangeCallback(e));
        this.itemListView.setControllerOnAddItem(this.addItem);
        this.itemListView.setControllerOnDelItem(this.delItem);
        this.itemListView.setControllerOnEditItem(this.editItem);
        this.itemListView.setControllerOnCheckItem(this.checkItem);
        this.initOnModelChange();       
        document.querySelector('#add-item').addEventListener('click', (e)=>itemListView.onAddItem(e));
        document.querySelector('#check-item').addEventListener('click', (e)=>itemListView.onCheckItem(e));
        document.getElementById("word").addEventListener('input', () => {document.getElementById("word").style.color = "black"});
    }

    onChangeCallback() {
        document.querySelector('#dictionary').innerHTML = this.itemListView.toHtml();
    }
    addItem(word, meaning) {
        const item = new Item(word, meaning);
        this.itemListModel.add(item);
    }
   delItem(id) { 
        this.itemListModel.delete(id);
    }
    editItem(id, word, meaning) {
        this.itemListModel.edit(id, word, meaning);
    }
    checkItem() {
        this.itemListModel.check(document.getElementById("word"));
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                document.querySelector('#dictionary').innerHTML = this.itemListView.toHtml();
                return true;
            }
        }
        this.itemListModel.items = new Proxy(this.itemListModel.items, handler);
    }
}