const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems(){
   const itemsFromStorage = getItemsFromStorage();
   itemsFromStorage.forEach(item => addItemToDOM(item));
   checkUI();
}

function checkUI(){
   itemInput.value = '';
   const items = itemList.querySelectorAll('li');
   if(items.length === 0){
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
   }else{
      clearBtn.style.display = 'block';
      itemFilter.style.display = 'block';
   }

   formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
   formBtn.style.backgroundColor = '#333';
   isEditMode = false;
}

function checkIfItemExists(item) {
   const itemsFromStorage = getItemsFromStorage();
   return itemsFromStorage.includes(item);
}

function addItemToDOM(item){
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(item));
   
   // Create a button
   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);
   itemList.appendChild(li);
}

function addItemToStorage(item){
   const itemsFromStorage = getItemsFromStorage();

   // Add new item to array
   itemsFromStorage.push(item);

   // Convert to JSON string and set to local storage
   localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
   let itemsFromStorage;

   if(localStorage.getItem('items') === null){
      itemsFromStorage = [];
   }else{
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
   }
   return itemsFromStorage;
}
// Button
function createButton(classes) {
   const button = document.createElement('button');
   button.className = classes;
   const icon = createIcon('fa-solid fa-xmark');
   button.appendChild(icon);
   return button;
}

// icon
function createIcon(classes){
   const icon = document.createElement('i');
   icon.className = classes;
   return icon;
}

// remove item
function removeItem(item){
   if(confirm('Are you sure?')){
      // Remove item from DOM
      item.remove();
      
      // Remove item from stroage
      removeItemFromStroage(item.textContent);
      checkUI();
   }
}

function removeItemFromStroage(item){
   let itemsFromStorage = getItemsFromStorage();

   // filter out item to be remove
   itemsFromStorage = itemsFromStorage.filter((i) => i!=item );

   // Re-set to localStorage
   localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function setItemToEdit(item){
   isEditMode = true;
   
   itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
   item.classList.add('edit-mode');
   formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
   formBtn.style.backgroundColor = '#228822';
   itemInput.value = item.textContent;
}

// Initialize app
function init(){
// Event Listeners
itemForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const newItem = itemInput.value;
   // Validate Input
   if(itemInput.value === ''){
      alert('Please add an item');
      return;
    }
   
   //  Check for edit mode
   if(isEditMode){
      const itemToEdit = itemList.querySelector('.edit-mode');

      removeItemFromStroage(itemToEdit.textContent);
      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();
      isEditMode = false;
   }else{
      if(checkIfItemExists(newItem)){
         alert('That item already exists!');
         return;
      }
   }

   // Create item Dom element
  addItemToDOM(newItem);

//   Add item to local storage
addItemToStorage(newItem);

   checkUI();
   itemInput.value = ''; 
});

itemList.addEventListener('click', (e) =>{
if(e.target.parentElement.classList.contains('remove-item')){
   removeItem(e.target.parentElement.parentElement);
 }else{
   setItemToEdit(e.target);
 }
});

clearBtn.addEventListener('click', ()=>{
   while(itemList.firstChild){
      itemList.removeChild(itemList.firstChild);
   } 

   // Clear from localStroage
   localStorage.removeItem('items');
   checkUI();
});


checkUI();

itemFilter.addEventListener('input',(e)=>{
   const items = itemList.querySelectorAll('li');
   const text = e.target.value.toLowerCase();

   items.forEach(item =>{
      const itemName = item.firstChild.textContent.toLowerCase();
      if(itemName.indexOf(text) != -1){
         item.style.display = 'flex';
      }else{
         item.style.display = 'none';
      }
   })
});
document.addEventListener('DOMContentLoaded', displayItems);
}
init();