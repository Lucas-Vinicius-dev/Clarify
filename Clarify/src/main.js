import './style.css'
import { Login } from './components/login.js'
import { setupLogin } from './services/auth.js'
import { registration } from './components/registration.js'

document.querySelector('#app').innerHTML = registration()

setupLogin()