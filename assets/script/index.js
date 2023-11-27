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
const yesBtn = select('.yes-button')
const noBtn = select('.no-button')
const confirmationModal = select ('.confirmation-modal')

function validation() {
    let inputValue = input.value.split(', ');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(inputValue)) {
        advice.textContent = 'Please enter a valid email or put it in the correct order'
        return false;
    } else {
        advice.textContent = 'Contact Created'
        return true;
    }

    
}

function listContacts() {
    let inputValues = input.value.split(', ');
    let upperCase = inputValues[1].charAt(0).toUpperCase() + inputValues[1].slice(1);

    if (!validation(inputValues)) {
        return false;
    }

    const contact = new Contact(inputValues[0], inputValues[1], inputValues[2])
    const contactDiv = document.createElement('div')
    contactDiv.className = 'field'
    divContacts.appendChild(contactDiv)
    contactDiv.innerHTML = `<b>Name:</b> ${contact.name}<br><b>City:</b> ${upperCase}<br><b>Email:</b> ${contact.email}`;

    onEvent(contactDiv, 'click', () => {
        confirmationModal.style.display = 'grid';
        onEvent(yesBtn, 'click', () => {
            divContacts.removeChild(contactDiv)
            confirmationModal.style.display = 'none'
        })
        onEvent(noBtn, 'click', () => {confirmationModal.style.display = 'none';})
    })
}

onEvent(addBtn, 'click', listContacts)