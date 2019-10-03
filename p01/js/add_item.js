const {ipcRenderer} = require('electron');

console.log('add_item.js')
const form = document.querySelector('form');
form.addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();
    const item = document.querySelector('#item').value;
    ipcRenderer.send('item:add',item);
}
//Electron has node (server) behind html 
//we use send payload from js to js
//and catch paylod 