'use strict';

class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() {return this.#name};
    get city() {return this.#city};
    get email() {return this.#email};

    toString() {
        return `Name: ${this.#name} City: ${this.#city} Email: ${this.#email}`;
    };
}

const con1 = new Contact('Mark', 'Calgary', 'mark@email.com')
console.log(`${con1.name}`)

export {Contact};