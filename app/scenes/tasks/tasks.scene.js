import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";
import styles from "./tasks.styles.css"

export function TaskScene() {
    const pageContent = ` 
    <form>
    <input type= "text" placeholder= "Titulo de tarea..." id="title"/>
    <input type= "text" placeholder= "Descripcion..." id="description"/>
    <select name="priority">
    <option value= "" disabled selected>--Selecciona algo --</option>
    <option value= "HIGH">Alta</option>
    <option value= "MEDIUM">Media</option>
    <option value= "LOW">Baja</option>
    </select>
    <input type= "date" id="date" />
    <input type= "submit" />
    </form>
    <div id="all-tasks"></div>
    `;
    const logic = async () => {
        const $form = document.getElementsByTagName('form')[0]
        const $tasksContainer = document.getElementById('all-tasks');


        const allTasks = await fetch('http://localhost:3000/tasks')
        const responseJson = await allTasks.json();
        responseJson.forEach(task => {
            $tasksContainer.innerHTML += `
            <div class="${styles.card}">
                <p>Task: ${task.title}</p>
                <p>Description: ${task.description}</p>
                <p>Priority: ${task.priority}</p>
                <p>Date: ${task.date}</p>
                <button class="edit-class" data-edit-id="${task.id}">Editar</button>
                <button class="delete-class" data-delete-id="${task.id}">Eliminar</button>
            </div>
            `
        })

        //Logic to edit a task
        const $editBtns = document.getElementsByClassName('edit-class')
        const editBtnArray = [...$editBtns];
        editBtnArray.forEach($editBtn => {
            $editBtn.addEventListener('click', () => {
                navigateTo(`/tasks/edit?taskId=${$editBtn.getAttribute('data-edit-id')}`)
            })
        })


        //Logic to add event listener to delete buttons
        const $deleteBtns = document.getElementsByClassName('delete-class')
        const deleteBtnArray = [...$deleteBtns];
        deleteBtnArray.forEach($deleteBtn => {
            $deleteBtn.addEventListener('click', () => {
                const taskId = $deleteBtn.getAttribute('data-delete-id');
                deleteTask(taskId);
            })
        })

        //Logic to eliminate a task
        const deleteTask = async (taskId) => {
            const confirmation = confirm("¿Estás seguro de que quieres eliminar esta tarea?");
            if (confirmation) {
                try {
                    const response = await fetchApi(`http://localhost:3000/tasks/${taskId}`, {
                        method: "DELETE"
                    })
                    if (response) {
                        console.log("Se eliminó la tarea correctamente");
                        navigateTo('/tasks')
                    } else {
                        console.log("Error al eliminar la tarea");
                    }

                } catch (error) {
                    console.log("ERROR", error);
                }
            } else {
                console.log("El usuario canceló la eliminación");
            }
        }

        //Logica del boton enviar o submit
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const $inputTitle = document.getElementById('title').value
            const $inputDescription = document.getElementById('description').value
            const $inputSelect = document.querySelector('[name="priority"]').value
            const $inputDate = document.getElementById('date').value


            //Agregar informacion a db.json mediante fetch
            const userTasks = await fetchApi('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: $inputTitle,
                    description: $inputDescription,
                    priority: $inputSelect,
                    date: $inputDate
                })
            })
            if (userTasks) {
                alert("Tarea creada con exito")
                navigateTo('/tasks')
            }
        })

    }

    return {
        pageContent,
        logic
    }
}