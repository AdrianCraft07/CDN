"use strict";

let agacraft = "https://raw.githubusercontent.com/AdrianCraft07/CDN/main"
include(agacraft+"/functions/colors.js");
function type(data) {
    return toString.call(data);
}
function isArray(data) {
    return type(data) === '[object Array]';
}
function isObject(data) {
    return type(data) === '[object Object]';
}
function isBuffer(data) {
    return type(data) === '[object Uint8Array]';
}
function isArrayBuffer(data) {
    return type(data) === '[object ArrayBuffer]';
}
Date.prototype.getFullDate = function () {
    return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()} ${this.getHours()}-${this.getMinutes()}-${this.getSeconds()}`;
};
class Log {
    #options;
    constructor(options = {}) {
        this.#options = options;
        this.#options.stream ||= process.stdout;
        this.#options.stream.write('\n');
    }
    #getKey(key) {
        return key.replace(/[A-Za-z0-9$_]/g, '') ? `"${key}"`.green : key;
    }
    #logObject(object) {
        if (typeof object === 'object')
            if (isArray(object))
                return `[ ${object.map(v => this.#logObject(v)).join(', ')} ]`;
            else if (isObject(object))
                return `{ ${Object.keys(object)
                    .map(key => `${this.#getKey(key)}: ${this.#logObject(object[key])}`)
                    .join(', ')} }`;
            else if (isBuffer(object)) {
                let arr = object.toString('hex').split('');
                arr.map((v, i) => {
                    if (v == null)
                        return;
                    arr[i] = v + arr[i + 1];
                    arr[i + 1] = null;
                });
                return `<Buffer ${arr.filter(v => v != null).join(' ')}>`;
            }
            else if (isArrayBuffer(object)) {
                let buffer = Buffer.from(object);
                let arr = buffer.toString('hex').split('');
                arr.map((v, i) => {
                    if (v == null)
                        return;
                    arr[i] = v + arr[i + 1];
                    arr[i + 1] = null;
                });
                return `ArrayBuffer { ${'[Uint8Contents]'.cyan}: <${arr
                    .filter(v => v != null)
                    .join(' ')}>, byteLength: 2 }`;
            }
        if (typeof object === 'string')
            return `"${object.replace(/\r/g, '\\r').replace(/\n/g, '\\n')}"`.green;
        if (typeof object === 'number')
            return `${object}`.yellow;
        if (typeof object === 'boolean')
            return `${object}`.yellow;
        if (object === null)
            return 'null'.whiteBright;
        return object;
    }
    #format(object, countOpen = 0) {
        let countArray = 0;
        let isArray = false;
        let isString = false;
        let isBuffer = false;
        let isBufferArray = false;
        return object
            .split('')
            .map((v, i, arr) => {
            let response = v;
            let isArrayBuffer = () => {
                let text = '';
                for (let e = 12; e >= 0; e--)
                    text += arr[i - e];
                return text == 'ArrayBuffer {';
            };
            if (v == '"')
                isString = !isString;
            if (v == '<')
                isBuffer = true;
            if (v == '>')
                isBuffer = false;
            if (v == ',')
                response = ',\n' + ' '.repeat(countOpen * 2);
            if (v == ':')
                response = ': ';
            if (v == ' ')
                response = '';
            if (isArrayBuffer())
                isBufferArray = true;
            if (isBufferArray && v == '}') {
                isBufferArray = false;
                return v;
            }
            if (isBuffer || isString || isBufferArray)
                return v;
            if (v == '{') {
                countOpen++;
                response = v + '\n' + ' '.repeat(countOpen * 2);
            }
            if (v == '}') {
                countOpen--;
                response = '\n' + ' '.repeat(countOpen * 2) + v;
            }
            if (v == '[' && arr[i + 1] == ' ') {
                countOpen++;
                isArray = true;
                response = v + '\n' + ' '.repeat(countOpen + 1 * 2);
            }
            if (v == ']') {
                countOpen--;
                isArray = false;
                response = '\n' + ' '.repeat(countOpen * 2) + v;
            }
            if (isArray) {
                if (v == ',')
                    response = ', ';
                if (v == ',' && countArray >= 30) {
                    countArray = 0;
                    response = ',\n' + ' '.repeat(countOpen * 2);
                }
                countArray++;
            }
            return response;
        })
            .join('');
    }
    #log(level, message) {
        const date = new Date();
        const logTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        let newMessage = '';
        if (level.clear != 'error')
            newMessage = [
                `[${logTime}]${level == 'log' ? '' : `[${level}]`}`,
                ...message.map(v => {
                    if (typeof v === 'string')
                        return v.includes('\r') ? v.split('\r').reverse()[0] : v;
                    return this.#format(this.#logObject(v));
                }),
            ].join(' ');
        else
            newMessage = [
                `${level == 'LOG' ? '' : `[${level}]`}[${logTime}]`,
                message,
            ].join(' ');
        this.#options.stream?.write(newMessage + '\n');
    }
    log(...message) {
        this.#log('LOG', message);
    }
    warn(...message) {
        this.#log('WARN'.yellowBrightBg.black, message);
    }
    info(...message) {
        this.#log('INFO'.blueBrightBg, message);
    }
    error(...message) {
        this.#log('ERROR'.redBrightBg, message);
    }
}
module.exports = Log;
