import { navigateTo } from "../../Router";

export function NavBarLayout(pageContent,logic) {
    const root = document.getElementById('root')
    
    const logOut = `
        <button type="button" id="logout">Logout</button>
    `
    root.innerHTML = `
        <nav>
            <li><a href= "/tasks">Tasks</a></li>
            <li><a href= "/profile">Profile</a></li>
            ${logOut}
        </nav>
        ${pageContent}
    `;
    logic();

    const $logoutButton = root.querySelector('#logout');
    $logoutButton.addEventListener('click', () =>{
        localStorage.removeItem('token');
        navigateTo('/login')
    })
}