export default class Item {
    constructor(word, meaning) {
        this.id = Math.round(Math.random() * 100000).toString();
        this.word = word;
        this.meaning = meaning
        this.onChangeCallback = null;
        return this.initOnModelChange();
    }
    
    setOnChangeCallback() {
        this.onChangeCallback = onChangeCallback;
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                if (this.onChangeCallback) this.onChangeCallback(this);
                return true;
            }
        }
        return new Proxy(this, handler);
    }
}