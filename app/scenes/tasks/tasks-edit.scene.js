// Import necessary functions
import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";

export function TaskEditScene() {
    // Define the HTML content for the page
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
    `

    // Define the logic for the page
    const logic = async () => {
        // Get the taskId from the URL
        const searchParams = window.location.search;
        const paramsTransformed = new URLSearchParams(searchParams)
        const taskId = paramsTransformed.get('taskId')

        // Fetch the task data from the API
        const fetchedTaskId = await fetch(`http://localhost:3000/tasks/${taskId}`)
        const responseJson = await fetchedTaskId.json();

        // Store the original values of the task fields
        const originalTitle = responseJson.title;
        const originalDescription = responseJson.description;
        const originalPriority = responseJson.priority;
        const originalDate = responseJson.date;

        // Get references to the form fields
        const $inputTitle = document.getElementById('title')
        const $inputDescription = document.getElementById('description')
        const $selectPriority = document.querySelector('[name="priority"]')
        const $inputDate = document.getElementById('date')

        // Populate the form fields with the original values
        $inputTitle.value = responseJson.title
        $inputDescription.value = responseJson.description
        $selectPriority.value = responseJson.priority
        $inputDate.value = responseJson.date

        // Get a reference to the form
        const $form = document.querySelector('form');

        // Add an event listener to the form submit event
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get the updated values from the form fields
            const updatedTitle = $inputTitle.value;
            const updatedDescription = $inputDescription.value;
            const updatedPriority = $selectPriority.value;
            const updatedDate = $inputDate.value;

            // Check if each field has been modified
            const isTitleModified = updatedTitle !== originalTitle;
            const isDescriptionModified = updatedDescription !== originalDescription;
            const isPriorityModified = updatedPriority !== originalPriority;
            const isDateModified = updatedDate !== originalDate;

            // Check if all fields have been modified
            const isAllModified = isTitleModified && isDescriptionModified && isPriorityModified && isDateModified;

            // Determine the method to use based on whether all fields have been modified
            const method = isAllModified ? 'PUT' : 'PATCH';

            // Log the method used
            console.log(`Método utilizado: ${method}`);

            // Send a request to the API to update the task
            const response = await fetchApi(`http://localhost:3000/tasks/${taskId}`, {
                method: method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    description: updatedDescription,
                    priority: updatedPriority,
                    date: updatedDate
                })
            })

            // Check the response and show a message to the user
            if (response) {
                alert("Tarea actualizada con éxito")
                navigateTo('/tasks')
            } else {
                console.log("Error al actualizar la tarea");
            }
        })
    }

    // Return the page content and logic
    return {
        pageContent,
        logic
    }
}
