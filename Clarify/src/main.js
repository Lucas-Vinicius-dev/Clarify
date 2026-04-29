import './style.css'
import { Login } from './components/login.js'
document.querySelector('#app').innerHTML = Login()
 // Lógica de manipulação do formulário
    document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Dados de autenticação:', data);
    alert('Tentativa de login enviada! Verifique o console.');
    });