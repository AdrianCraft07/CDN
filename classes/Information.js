"use strict";

let agacraft = "https://raw.githubusercontent.com/AdrianCraft07/CDN/main"
include(agacraft+"/extension/String.js");
module.exports = class Information {
    #info;
    constructor(info = [['', '']]) {
        this.#info = info;
    }
    addData(key, value) {
        this.#info.push([key, value]);
        return this;
    }
    getInfo() {
        return this.#info;
    }
    print() {
        let length = 0;
        for (let i = 0; i < this.#info.length; i++) {
            const element = this.#info[i][0];
            if (element.length > length)
                length = element.length;
        }
        console.log(this.#info
            .map(value => [value[0].setLength(length), value[1]])
            .map(value => value.join(' '))
            .join('\n'));
        return this;
    }
};
