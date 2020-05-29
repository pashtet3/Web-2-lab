export default class itemListModel {
    constructor() {
        this.items = [];
        this.onChangeCallback = null;
    }

    add(item) {
        item.onChangeCallback = this.onChangeCallback;
        this.items.push(item);
    }
    delete(itemId) {
        const itemIndex = this.items.findIndex( (item) => item.id === itemId); 
        this.items.splice(itemIndex, 1);
    }
    edit(itemId, word, meaning) {
        const itemIndex = this.items.findIndex( (item) => item.id === itemId);
        this.items[itemIndex].word = word;
        this.items[itemIndex].meaning = meaning;
    }

    check(wordObject) {
        var w;
        if (typeof(Worker) !== "undef") {
            if (typeof(w) == "undef") {
                w = new Worker("/js/check.js");
            }
            var items = JSON.parse(JSON.stringify(this.items));
            w.postMessage({ "items": items, "word": wordObject.value });

            w.onmessage = function(event) {
                if (event.data === false)
                    wordObject.style.color = "red";
                else
                    wordObject.style.color = "green";
            };
        } else {
            console.log("undef")
        }
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}