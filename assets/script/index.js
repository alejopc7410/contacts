'use strict';

import { Contact } from "./class.js";

/*------------- Utility Functions ----------*/
function select (selector) {
    return document.querySelector(selector);
};

function selectAll (selector) {
    return document.querySelectorAll(selector);
};

function onEvent (selector, event, callback) {
    return selector.addEventListener(event, callback);
};
/*------------------------------------------*/

const advice = select('.advice')
const divContacts = select('.output')
const input = select('input[type=text]')
const addBtn = select('.add-button')

function validation() {
    let inputValue = input.value.split(', ');
    if (
        !inputValue[2].includes('@') || 
        !inputValue[2].includes('.com')
        ) {
        advice.textContent = 'Please enter a valid email or put it in the correct order'
        return false;
    } else {
        advice.textContent = 'Contact Created'
        return true;
    }
}

function listContacts() {
    let inputValues = input.value.split(', ');
    if (!validation(inputValues)) {
        return false;
    }

    const contact = new Contact(inputValues[0], inputValues[1], inputValues[2])
    const contactDiv = document.createElement('div')
    contactDiv.className = 'field'
    divContacts.appendChild(contactDiv)
    contactDiv.innerHTML = `<b>Name:</b> ${contact.name}<br><b>City:</b> ${contact.city}<br><b>Email:</b> ${contact.email}`;

    onEvent(contactDiv, 'click', () => {divContacts.removeChild(contactDiv)})
}

onEvent(addBtn, 'click', listContacts)