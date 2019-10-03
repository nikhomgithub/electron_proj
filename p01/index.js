// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu,ipcMain} = require('electron')
const path = require('path')
const url = require('url');

//SET ENV
process.env.NODE_ENV='production'

// Keep a global reference of the window object, if you don't, the window will 
//be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let subWindow
let subWin2

//Handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 300,
        title:'Add Shopting List Item',
        webPreferences: {
            nodeIntegration: true
        }
    });
    addWindow.loadFile('addWindow.html');
    addWindow.on('close',()=>{
        addWindow=null;
    })
}

//add_item.js => submit
//ipcRenderer.send('item:add',item)
ipcMain.on('item:add',(e,item)=>{
    console.log(item);
    mainWindow.webContents.send('item:add',item);
    addWindow.close();
});

const mainMenuTemplate=[
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Item',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' :'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//if mac, add empty object to menu
if(process.platform=='darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools item if not in production
if(process.env.NODE_ENV!='production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle DevTools',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                },
                accelerator: process.platform == 'darwin' ? 'Command+I' :'Ctrl+I',
            },
            {
                role:'reload'
            }
        ]
    });
}

//status ready
app.on('ready',()=>{
    //1)mainWindow
    mainWindow = new BrowserWindow({
        width: 600,
        height:400,
        webPreferences: {
            nodeIntegration: true
        }
        //frame:false
        //https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    });
    
    //Menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert Menu
    Menu.setApplicationMenu(mainMenu);

    //Html
    mainWindow.loadFile('mainWindow.html')
    console.log(process.type)

    //status close
    //Quite App when closed
    mainWindow.on('closed',()=>{
        app.quit();
    })
    
    /*
    //2)subWindow
    subWindow = new BrowserWindow({
        width: 300,
        height:300,
        parent:mainWindow
        //frame:false
        //https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    });
    subWindow.loadURL('https://www.sanook.com')
    subWindow.on('closed',()=>{

        //3)subWin2
        subWin2 = new BrowserWindow({
            width: 100,
            height:100,
        });
        subWin2.loadURL('https://www.pantip.com')
    })
    */

})


