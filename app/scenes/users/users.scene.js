export function UsersScene (){
    const pageContent = `
        <div>Hola mundo desde users</div>
    `;
    const logic = () => {
        console.log("HOLA MUNDO DESDE CONSOLA DE USERS");
    }
    return {
        pageContent,
        logic
    }
}