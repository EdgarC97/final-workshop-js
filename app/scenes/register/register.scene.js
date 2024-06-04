import { navigateTo } from '../../Router';
import { encryptData } from '../../helpers/encrypt';
import { fetchApi } from '../../helpers/fetch-api';
import styles from './register.styles.css'

export function RegisterScene() {
    const root = document.getElementById('root')
    root.innerHTML = `
        <form class="${styles.form}">
            <input type="text" placeholder="Nombre" autocomplete="name">
            <input type="email" placeholder="johndoe@gmail.com" autocomplete="email">
            <input type="password" placeholder="password" autocomplete="current-password">
            <button type="submit">Register</button>
        </form>
    `
        //logic
        const $nameHtml = root.querySelector('input[type="text"]');
        const $emailHtml = root.querySelector('input[type="email"]');
        const $passwordHtml = root.querySelector('input[type="password"]');
        const $myForm = root.getElementsByTagName('form')[0];

        $myForm.addEventListener('submit', async (event) => {
            event.preventDefault();

        if (!$nameHtml.value || !$emailHtml.value || !$passwordHtml.value) {
            alert("INGRESA TODA ESA MONDA HPTA")
            return
        }

        // Verificar si el correo electrónico ya está registrado
        const existingUser = await fetchApi(`http://localhost:3000/users?email=${$emailHtml.value}`);
        if (existingUser.length > 0) {
            alert("El email ya esta registrado");
            return;
        }

        //conexion con db.json a través de fetch 
        const userCreated = await fetchApi('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: $nameHtml.value,
                email: $emailHtml.value,
                password: encryptData($passwordHtml.value)
            })
        })
        if (userCreated) {
            alert("Usuario creado correctamente")
            navigateTo('/login')
        }
    })
}