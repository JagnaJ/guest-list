'use strict';

const inputName = document.getElementById('input-name');
const inputSurname = document.getElementById('input-surname');
const addGuestBtn = document.getElementById('add-guest');
const guestList = document.getElementById('guest-list');
const removeAllBtn = document.getElementById('remove-all');
const allGuests = document.getElementById('all-guests');

let guests = [];

function saveGuests() {
    localStorage.setItem('guests', JSON.stringify(guests));
}

function loadGuests() {
    const savedGuests = localStorage.getItem('guests');
    if (savedGuests) {
        guests = JSON.parse(savedGuests);
        displayGuests();
    }
}

function addGuest() {
    const name = inputName.value.trim();
    const surname = inputSurname.value.trim();
    if (name && surname) {
        const guest = { nameSurname: name + ' ' + surname, present: false };
        guests.push(guest);
        saveGuests();
        displayGuests();
        inputName.value = '';
        inputSurname.value = '';
    }
}

function removeGuest(index) {
    guests.splice(index, 1);
    saveGuests();
    displayGuests();
}

function togglePresent(index) {
    guests[index].present = !guests[index].present;
    saveGuests();
    displayGuests();
}

function displayGuests() {
    guestList.innerHTML = '';
    guests.forEach((guest, index) => {
        const guestElement = document.createElement('li');
        guestElement.textContent = guest.nameSurname;
        if (guest.present) {
            guestElement.classList.add('present');
        }
        guestElement.addEventListener('click', () => togglePresent(index));
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            removeGuest(index);
        });

        guestElement.appendChild(removeButton);
        guestList.appendChild(guestElement);
    });

    updateGuestsCounter();
}

function updateGuestsCounter() {
    allGuests.textContent = `Number of all guests: ${guests.length}`;
}

addGuestBtn.addEventListener('click', addGuest);
removeAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove all guests?')) {
        guests = [];
        saveGuests();
        displayGuests();
    }
});

window.addEventListener('load', loadGuests);
