import ItemListModel from './model/ItemListModel.js';
import ItemListView from './view/ItemListView.js';
import Controller from './controller/Controller.js';

let itemListModel = new ItemListModel();
let itemListView = new ItemListView(itemListModel);

let controller = new Controller(itemListModel, itemListView);

controller.addItem('лаба');
controller.addItem('ВЕБ');

