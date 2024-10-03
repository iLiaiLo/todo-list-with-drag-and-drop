let input=document.getElementById("todoinput");
let elem=document.getElementById("todoContainer");
let completedTasks=document.getElementById("completedTasks");


completedTasks.addEventListener("dragover",function(e){
    e.preventDefault();
})

elem.addEventListener("dragover",function(e){
    e.preventDefault();
})

elem.addEventListener("drop",function(e){
    let data=e.dataTransfer.getData("text");
    let el=document.getElementById(data);
    this.appendChild(el)

    document.querySelectorAll("#todoContainer > .todo.completed .clickTog").forEach(but=>{
        but.disabled=false;
   })
   document.querySelectorAll("#todoContainer>.todo>#todoText").forEach(el=>{
    el.contentEditable=true;
   })


   updateLocalStorage()
})

completedTasks.addEventListener("drop",function(e){
    let data=e.dataTransfer.getData("text");
    let el=document.getElementById(data);
    this.appendChild(el);

    document.querySelectorAll("#completedTasks > .todo.completed .clickTog").forEach(but=>{
        but.disabled=true;
   })
   document.querySelectorAll("#completedTasks>.todo.completed>#todoText").forEach(el=>{
    el.contentEditable=false;
   })
    updateLocalStorage(); 
       
})



function addTodo(){    

    let todo=document.createElement("div");
    let todoText=document.createElement("div");
    todo.className="todo";
    todo.id=`${Math.random()}`;
    
    todoText.id="todoText";
    todoText.contentEditable=true;
    todoText.innerText=input.value;

    let clickable=document.createElement("button");
    clickable.className="clickTog";
    todo.appendChild(clickable)

    todo.draggable=false;
    todo.appendChild(todoText);
    elem.appendChild(todo)

    let removeBut=document.createElement("button");
    removeBut.className="removeBut"
    removeBut.innerHTML="<i class='fa fa-trash'></i>";
    todo.appendChild(removeBut);

    clickable.addEventListener("click", function(e) {
        e.target.parentNode.classList.toggle("completed");
        if(e.target.parentNode.className.includes("completed")){
            e.target.parentNode.draggable=true;
            e.target.innerHTML="&#x2714;";
    
        }
        else{
            e.target.parentNode.draggable=false;
            e.target.innerHTML='';
        }
        updateLocalStorage();
      });



    removeBut.addEventListener("click",function(e){
        e.target.parentNode.remove();
        updateLocalStorage()
    })

    removeBut.firstChild.addEventListener("click",function(e){
        e.target.parentNode.parentNode.remove();
        updateLocalStorage()
    })

    todoText.addEventListener("input",()=>{
        updateLocalStorage();
    })

    todo.addEventListener("dragstart",function(e){
        e.dataTransfer.setData("text",e.target.id);
    })


    updateLocalStorage()

}



function updateLocalStorage() {
    localStorage.setItem("incomplete", elem.innerHTML);
    localStorage.setItem("complete", completedTasks.innerHTML);
}



function show(){
    
    let savedContent_1=localStorage.getItem("incomplete");
    let savedContent_2=localStorage.getItem("complete");

    if(!savedContent_1 && !savedContent_2){
        return
    }

    elem.innerHTML=savedContent_1;
    completedTasks.innerHTML=savedContent_2


    let todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        let clickable = todo.querySelector('.clickTog');
        clickable.addEventListener("click", function (e) {
            e.target.parentNode.classList.toggle("completed");
            if(e.target.parentNode.className.includes("completed")){
                e.target.parentNode.draggable=true;
                e.target.innerHTML="&#x2714;";
            }
            else{
                e.target.parentNode.draggable=false;
                e.target.innerHTML="";
            }
            updateLocalStorage();
        });
    });

    todos.forEach(todo=>{
        todo.addEventListener("dragstart",function(e){
        e.dataTransfer.setData("text",e.target.id)
    })
    })


    document.querySelectorAll('.removeBut').forEach(button => {
        button.addEventListener('click', function(e) {
            e.target.parentNode.remove();
            updateLocalStorage()
    });
    });

    document.querySelectorAll('.removeBut i').forEach(icon=>{
        icon.addEventListener("click",function(e){
            e.target.parentNode.parentNode.remove();
            updateLocalStorage()
        })
    })


    document.querySelectorAll(".todo>#todoText").forEach(el=>{
        el.addEventListener("input",()=>{
            updateLocalStorage()
        })
    })


    completedTasks.addEventListener("dragover",function(e){
        e.preventDefault();
    })
    elem.addEventListener("dragover",function(e){
        e.preventDefault()
    })


    completedTasks.addEventListener("drop",function(e){
        e.preventDefault();
        let data=e.dataTransfer.getData("text");
        let el=document.getElementById(data)
        this.appendChild(el);

        document.querySelectorAll("#completedTasks>.todo.completed .clickTog").forEach(but=>{
            but.disabled=true;
       })
       document.querySelectorAll("#completedTasks>.todo.completed>#todoText").forEach(el=>{
        el.contentEditable=false;
       })
        updateLocalStorage()
    })


    elem.addEventListener("drop",function(e){
        let data=e.dataTransfer.getData("text");
        let el=document.getElementById(data);
        this.appendChild(el);
        document.querySelectorAll("#todoContainer>.todo.completed .clickTog").forEach(but=>{
            but.disabled=false
        })
        document.querySelectorAll("#todoContainer>.todo>#todoText").forEach(el=>{
            el.contentEditable=true;
           })
    
        updateLocalStorage()
    })
    
}
    


function removeTask(){
    document.getElementById("todoContainer").innerHTML=""
    localStorage.removeItem("incomplete");
}

function removeComplete(){
    document.getElementById("completedTasks").innerHTML="";
    localStorage.removeItem("complete");
}

function clearEverything(){
    document.getElementById("todoContainer").innerHTML="";
    document.getElementById("completedTasks").innerHTML="";
    input.value="";
    localStorage.clear()
}

document.addEventListener("DOMContentLoaded", function(){
    show();
})
