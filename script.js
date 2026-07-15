let taskData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;
const columns = [todo, progress, done];

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data){
        const column = document.querySelector(`#${col}`)

        data[col].forEach((task) => {
            const div = document.createElement("div");

            div.classList.add("task")
            div.setAttribute("draggable", "true")

            div.innerHTML = `
                <h2>${task.title}</h2> 
                <p>${task.desc}</p>
                <button class="delete-btn">Delete</button>    
            `
            column.appendChild(div)
            div.addEventListener("drag", (e) => {
                dragElement = div;
            })
            const deleteBtn = div.querySelector(".delete-btn");
            if (deleteBtn) {
                deleteBtn.addEventListener("click", () => {
                    div.remove();
                    updateTaskCount();
                })
            }

            
        })

        updateTaskCount();
   
    }
}


const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("drag", () => {
        // console.log("dragging", e)
        dragElement = task;
    })
})


function updateTaskCount(){
    columns.forEach((col)  => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        count.innerHTML = tasks.length;

        taskData[col.id] = Array.from(tasks).map((t) => {
            return{
                title:t.querySelector("h2").innerHTML,
                desc:t.querySelector("p").innerHTML
            }
        })
        localStorage.setItem("tasks", JSON.stringify(taskData)); 
    })
}

function addEventOnColumn(column){
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();

    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();

        
        updateTaskCount();

        //console.log("dropped", dragElement, column)
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
        
    })
}

addEventOnColumn(todo);
addEventOnColumn(progress);
addEventOnColumn(done);

// Add task logic //

const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", (e) => {
    modal.classList.toggle("active");
})
modalBg.addEventListener("click", (e) => {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    const div = document.createElement("div");

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${taskTitle}</h2> 
        <p>${taskDesc}</p>
        <button class="delete-btn">Delete</button>    
    `
    todo.appendChild(div)

    updateTaskCount();

    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    const deleteBtn = div.querySelector(".delete-btn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            div.remove();
            updateTaskCount();
        })
    }

    modal.classList.remove("active")

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";
})

