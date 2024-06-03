import { navigateTo } from '../../Router';
import { decryptData } from '../../helpers/encrypt';
import { fetchApi } from '../../helpers/fetch-api';
import styles from './login.styles.css'

export function LoginScene() {
  const root = document.getElementById('root')
  root.innerHTML = `
      <form class= "${styles.form}">
        <input type="email" placeholder="jhondoe@gmail.com" autocomplete="email">
        <input type="password" placeholder="password" autocomplete="current-password">
        <button type="submit">Login</button>
      </form>
  `;
  const $emailHtml = root.querySelector('input[type="email"]');
  const $passwordHtml = root.querySelector('input[type="password"]');

  const $myForm = root.getElementsByTagName('form')[0];
  $myForm.addEventListener('submit', async (event) =>{
    event.preventDefault();

    if (!$emailHtml.value || !$passwordHtml.value){
      alert("RELLENA TODA ESA MONDA CV")
    }

    const users = await fetchApi('http://localhost:3000/users')
    const user = users.find(user => user.email === $emailHtml.value && decryptData(user.password) === $passwordHtml.value )

    if (user) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      navigateTo('/tasks')
    } else {
      alert("Usuario o contraseña invalidos")
    }
  });
}
