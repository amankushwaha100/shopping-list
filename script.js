const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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

// Event Listeners
itemForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const newItem = itemInput.value;
   // Validate Input
   if(itemInput.value === ''){
      alert('Please add an item');
      return;
    }
   
   // Create list item
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(newItem));
   
   // Create a button
   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);
   itemList.appendChild(li);
   
   // Add li to the DOM
   checkUI();
   itemInput.value = ''; 
});

itemList.addEventListener('click', (e) =>{
if(e.target.parentElement.classList.contains('remove-item')){
   if(confirm('Are you sure?')){
   e.target.parentElement.parentElement.remove();
   checkUI();
 }
}
});

clearBtn.addEventListener('click', ()=>{
   while(itemList.firstChild){
      itemList.removeChild(itemList.firstChild);
   } 
   checkUI();
});

function checkUI(){
   const items = itemList.querySelectorAll('li');
   if(items.length === 0){
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
   }else{
      clearBtn.style.display = 'block';
      itemFilter.style.display = 'block';
   }
}

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