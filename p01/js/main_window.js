const {ipcRenderer} = require('electron');

console.log("main_window.js");
const ul = document.querySelector('ul')

//index.js
//mainWindow.webContents.send('item:add',item)
ipcRenderer.on('item:add',(e,item)=>{
    ul.className = 'collection'
    const li = document.createElement('li');
    li.className = 'collection-item'
    const itemText=document.createTextNode(item)
    li.appendChild(itemText);
    ul.appendChild(li)
});

//index.js
//mainWindow.webContents.send('item:clear')
ipcRenderer.on('item:clear',()=>{
   ul.innerHTML='';
   if(ul.children.length==0){
    ul.className='';
    }
});

//remove item
ul.addEventListener('dblclick',(e)=>{
    e.target.remove();
    if(ul.children.length==0){
        ul.className='';
    }
});

//see in View >> Toggle Developer Tools
//alert("What do you want")
//Gtk-Message: 14:44:39.800: GtkDialog mapped without a transient parent. This is discouraged.