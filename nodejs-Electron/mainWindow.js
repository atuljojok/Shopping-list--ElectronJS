console.log('main js load');
const electron =  require('electron')
const {ipcRenderer}= electron
const ul =document.querySelector('ul')

//Add item
ipcRenderer.on('item:add',(e,item)=>{
    ul.className ='collection'
    
    const li =document.createElement('li')
      li.className='collection-item'
    const itemText =document.createTextNode(item)
    
    console.log("main js "+itemText);
    li.appendChild(itemText)
    ul.appendChild(li)
})
//clear item

ipcRenderer.on('item:clear',()=>{
   ul.innerHTML =''
   ul.className =''
})

// Remove item
ul.addEventListener('dblclick',removeItem)

function removeItem(e){
    e.target.remove()

   if(ul.children.length == 0){
    ul.className =''
   }
}