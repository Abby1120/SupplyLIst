const list = document.querySelector('#supply-list ul');

// delete items
list.addEventListener('click', function(e){
    if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        list.removeChild(li);
    }
});

// add items
const addForm = document.forms['add-item'];

addForm.addEventListener('submit', function(e){
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;
    document.getElementById('my_text').value = "";
    
// create elements
const li = document.createElement('li');
const schoolItem = document.createElement('span');
const deleteBtn = document.createElement('span');

// add content
deleteBtn.textContent = 'delete';
schoolItem.textContent = value;

// add classes
li.setAttribute('draggable', true);
li.classList.add('column');
schoolItem.classList.add('item');
deleteBtn.classList.add('delete');

// append to Dom
li.appendChild(schoolItem);
li.appendChild(deleteBtn);
list.appendChild(li);
});

// filter items
const searchBar = document.forms['search-items'].querySelector('input');
searchBar.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase();
    const supplies = list.getElementsByTagName('li');
    Array.from(supplies).forEach(function (supply){
        const title = supply.firstElementChild.textContent;
        if(title.toLocaleLowerCase().indexOf(term) != -1){
            supply.style.display = "block";
        } else{
            supply.style.display = "none";
        }
    });
})

// Drag and Drop
var dragElement = null;

// drag and drop effects

$("ul").on("dragstart","li",function(event){
    $(this).css("opacity", 0.4);
    dragElement = $(this);
    event.originalEvent.dataTransfer.effectAllowed = 'move';
    event.originalEvent.dataTransfer.setData('text/html', $(this).html());
});

$("ul").on("dragenter","li",function(){
    $(this).addClass("over");
});

$("ul").on("dragleave","li",function(){
    $(this).removeClass("over");
});


$("ul").on("dragover","li",function(event){
    if (event.preventDefault) {
        event.preventDefault(); 
    }
  event.originalEvent.dataTransfer.dropEffect = 'move';
  return false;
});

// drag and drop handle

$("ul").on("drop","li",function(event){
  if (event.stopPropagation) {
    event.stopPropagation(); 
  }

  if (dragElement != $(this)) {
    $(dragElement).html($(this).html())
    dragElement.innerHTML = this.innerHTML;
    this.innerHTML = event.originalEvent.dataTransfer.getData('text/html');
  }
  return false;
});

$("ul").on("dragend","li",function(){
    $("ul li").removeClass("over");
    $(this).css("opacity", 1);
});

// delete list

function deleteList() {
    var list = document.getElementById("columns");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}



