const fs = require("fs");
const FeraError = require("./Error.js");
const { set, get, unset, has } = require("lodash");
class FeraDatabase {
    /**
     * @type {string}
     * @private
     */
    #fileName;
    /**
     * @type {object}
     * @private
     */
    #file = {};

    /**
     * @param {string} dataFile
     * @constructor 
     */
    constructor (dataFile = "database.json") {
        this.#fileName = dataFile
        if (!fs.existsSync(dataFile)) {
            fs.writeFileSync(dataFile,'{}', function (err) {
                if (err) throw err;
            })
        } else {
            this.#file = JSON.parse(fs.readFileSync(dataFile, "utf8"));
        }
    }

    /**
     * @param {string} key 
     * @param {v} value 
     */
    set(key, value) {
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar girildi!");
        }
        if (value === 0) {
            set(this.#file, key, value);
            fs.writeFileSync(this.#fileName, JSON.stringify(this.#file, null, 2));
            return this.get(key);
        }
        if (!value || value === undefined || value === null) {
            throw new FeraError("Hatalı veri girildi!");
        }
        set(this.#file, key, value);
        fs.writeFileSync(this.#fileName, JSON.stringify(this.#file, null, 2));
        return this.get(key);
    }

    /**
     * @param {string} key 
     * @returns {any}
     */
    get(key) {
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar girildi!");
        }
        return get(this.#file, key);
    }

    /**
     * @param {string} key 
     * @returns {any}
     */
    fetch(key) {
        return this.get(key);
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        if(!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar kullanımı!");
        }
        return has(this.#file, key);
    }

    /**
     * @param {string} key
     * @returns {boolean} 
     */
    delete(key) {
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar kullanımı!");
        }
        const data = this.get(key);
        if (!data) {
            return false;
        }
        unset(this.#file, key);
        fs.writeFileSync(this.#fileName, JSON.stringify(this.#file, null, 2));
        return true;
    }

    /**
     * @param {string} key 
     * @param {number} amount 
     * @returns {number}
     */
    add(key, amount) {
        amount = parseInt(amount)
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar girildi!");
        }
        if (!amount || typeof amount !== "number") {
            throw new FeraError("Hatalı miktar girildi!");
        }
        const data = get(this.#file, key) || 0;
        if (isNaN(data)) {
            throw new FeraError("Girilen anahtar verisi sayı değil!")
        } 
        this.set(key, data + amount);
        return this.get(key);
    }

    /**
     * @param {string} key 
     * @param {number} amount 
     * @returns {number}
     */
    subtract(key, amount) {
        amount = parseInt(amount)
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar girildi!");
        }
        if (!amount || typeof amount !== "number") {
            throw new FeraError("Hatalı miktar girildi!");
        }
        const data = get(this.#file, key) || 0;
        if (isNaN(data)) {
            throw new FeraError("Girilen anahtar verisi sayı değil!");
        } 
        this.set(key, data - amount);
        return this.get(key);
    }

    /**
     * @param {string} key 
     * @param {any} value 
     */
    push(key, value) {
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar girildi!");
        }
        if (value !== 0 && !value && typeof value !== "boolean") {
            throw new FeraError("Hatalı değer girildi!");
        }
        const data = this.get(key);
        if (!data) {
            this.set(key, [value]);
            return this.get(key);
        }
        if (!Array.isArray(data)) {
            throw new FeraError("Girilen anahtar verisi array değil!");
        } else if (Array.isArray(data)) {
            data.push(value);
            this.set(key, data);
            return this.get(key);
        } else {
            this.set(key, [value]);
            return this.get(key);
        }
    }

    /**
     * @param {string} key
     * @param {any} value
     * @param {any} id
     */
    pull(key, value, id) {
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar girildi!");
        }
        const data = this.get(key);
        if (!data) {
            throw new FeraError("Girilen anahtar bulunamadı!")
        }
        if (!Array.isArray(data)) {
            throw new FeraError("Girilen anahtar verisi array değil!");
        }
        var index = data.map(dt => {
            if(id) {
                return dt[id]
            } else {
                return dt;
            }
        }).indexOf(value);
        if (index !== -1) data.splice(index, 1);
        return this.set(key,data);
    }

    /**
     * @returns {object}
     */
    all() {
        return this.#file;
    }
    /**
     * @param {string} key 
     * @returns {"string" | "number" | "bigint" | "boolean" | "symbol" | "array" | "undefined" | "object" | "function"}
     */
    type(key) {
        if (!key || typeof key !== "string") {
            throw new FeraError("Hatalı anahtar girildi!");
        }
        const data = this.get(key);
        if (Array.isArray(data)) {
            return "array";
        } else {
            return typeof data;
        }
    }

    /**
     * @param {string} newFileName 
     */
    backup(newFileName) {
        if (!newFileName || typeof newFileName !== "string") {
            throw new FeraError("Hatalı dosya ismi girildi girildi!");
        }
        fs.writeFileSync(`${newFileName}.json`, JSON.stringify(this.#file, null, 2));
        return true;
    }

    /**
     * @returns {boolean}
     */
    deleteAll() {
        this.#file = {};
        fs.writeFileSync(this.#fileName, JSON.stringify({}, null, 2));
        return true;
    }
}
module.exports = {FeraDatabase};
