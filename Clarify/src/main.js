import './style.css'
import { Login } from './components/login.js'
import { setupLogin } from './services/auth.js'

document.querySelector('#app').innerHTML = Login()

setupLogin()