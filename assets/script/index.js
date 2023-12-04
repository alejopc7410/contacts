'use strict';

import { Contact } from "./Contact.js";

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

function validation(input) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(input[2]) || input === '') {
        advice.textContent = 'Please enter a valid email or put it in the correct order'
        return false;
    } else {
        advice.textContent = 'Contact Created'
        return true;
    } 
}

function listContacts() {
    let inputValue = input.value.split(', ');
    if (!validation(inputValue)) {
        return false;
    }
    let upperCase = inputValue[1].charAt(0).toUpperCase() + inputValue[1].slice(1);

    const contact = new Contact(inputValue[0], inputValue[1], inputValue[2])
    const contactDiv = document.createElement('div')
    contactDiv.className = 'field'
    divContacts.appendChild(contactDiv)
    contactDiv.innerHTML = `<b>Name:</b> ${contact.name}<br><b>City:</b> ${upperCase}<br><b>Email:</b> ${contact.email}`;
    input.value = ''

    onEvent(contactDiv, 'click', () => {
        confirmationModal.style.display = 'grid';
        onEvent(yesBtn, 'click', () => {
            if (divContacts.contains(contactDiv)) {
                divContacts.removeChild(contactDiv)
            }
            confirmationModal.style.display = 'none'
            advice.textContent = 'Contact Deleted'
            setTimeout(() => {advice.textContent = ''}, 5000)
        });
        onEvent(noBtn, 'click', () => {confirmationModal.style.display = 'none';})
    })

    setTimeout(() => {advice.textContent = ''}, 5000)
}

onEvent(addBtn, 'click', listContacts)