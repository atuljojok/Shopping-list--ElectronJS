console.log('JS page called');
const electron = require('electron')
const {ipcRenderer}= electron

const form = document.querySelector('form')
 form.addEventListener('submit',formSubmit)

 function formSubmit(e){
    e.preventDefault()
    console.log('123');
    const item = document.querySelector('#item').value
    console.log(item);
    ipcRenderer.send('item:add',item)
 }