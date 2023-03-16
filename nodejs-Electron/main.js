const electron =require('electron')
const url = require('url')
const path =require('path')
const { notEqual } = require('assert')
const { ChildProcess } = require('child_process')
// var child = require(ChildProcess).execFile
var child = require('child_process').execFile;


const {BrowserWindow,app,Menu,ipcMain} = electron

//Set ENV 
process.env.NODE_ENV ='production'


let mainWindow 
let addWindow
let flipakartWindow
let amazoneWindow

// path for to open exe.file
const notePad= 'C:\\windows\\system32\\notepad.exe'
const Wordpath ='C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.exe'

//listen for app to ready 

 app.on('ready',()=>{
   
    //create main window
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
            enableRemoteModule: true,
        }
    })
    //load html page 
    mainWindow.loadURL(url.format({
       
        pathname:path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }))
    //quit app when closed
    mainWindow.on('closed',()=>{
        app.quit()
    })
       
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
 })
//catch item add
ipcMain.on('item:add',(e,item)=>{
   
    mainWindow.webContents.send('item:add',item)
    addWindow.close();
})
 
 function createAddWindow(){
    
        //create main window
        addWindow = new BrowserWindow({
                width:300,
                height:200,
                title:"Add Shopping List Item",
                webPreferences:{
                    nodeIntegration:true,
                    contextIsolation:false,
                    enableRemoteModule: true,
                }
                
              })
        //load html page 
       addWindow.loadURL(url.format({
           
            pathname:path.join(__dirname,'addWindow.html'),
            protocol:'file:',
            slashes:true
        }))
        //garbage collection handle
         addWindow.on('close',()=>{
            addWindow= null
         })   
       
  }
  function openFlipkart(){
    
      //create main window
      flipakartWindow = new BrowserWindow({
        width:1000,
        height:800,
        title:"Add Shopping List Item",
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
            enableRemoteModule: true,
        }
        
          })
        //load html page 
        flipakartWindow.loadURL('https://www.flipkart.com')

   
}
function opneAmazon(){
    
    //create main window
    amazoneWindow = new BrowserWindow({
      width:1000,
      height:800,
      title:"Add Shopping List Item",
      webPreferences:{
          nodeIntegration:true,
          contextIsolation:false,
          enableRemoteModule: true,
      }
      
        })
      //load html page 
      amazoneWindow.loadURL('https://www.amazon.in')

 
}

function openNotepad(){
    child(notePad, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
    });
}
function openWord(){
    child(Wordpath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
    });
}
  



 // create menu template
const mainMenuTemplate =[
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
                mainWindow.webContents.send('item:clear')
            }
           },
           {
            label:'Note Pad',
            click(){
                openNotepad()
            }

           },
           {
              label:'MS Word',
              click(){
                openWord()
              }
           },
           {
            label:'Quit',
            accelerator: process.platform =='darwin'? 'Command+Q' : 'Ctrl+Q',
            
            click(){
                app.quit()
             }
           }
        ]
    },
    {
        label:'E-commerce',
        submenu:[
            {
                label:'Amazon',
                click(){
                    opneAmazon()
                }
            },
            {
                label:'Flipakart',
                click(){
                openFlipkart()
                }
            },
           
        ]
    }
]
 // if mac,add empty  object to menu
 if(process.platform =='darwin'){
    mainMenuTemplate.unshift({})
 }  
 // add dev tools item if not in prod
  if (process.env.NODE_ENV !=='production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle DevTools',
                accelerator: process.platform =='darwin'? 'Command+I' : 'Ctrl+I',
                click(item,focusedWindow){
                  focusedWindow.toggleDevTools()
                }
            },
            {
                role:'reload'
            }
        ]
    })
  }