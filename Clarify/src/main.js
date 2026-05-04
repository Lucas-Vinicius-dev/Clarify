import './style.css'
import * as aux from "./lib/funcoesAuxiliares.js"
import { carregarLogin, ativarListenerLogin } from './pages/login.js'
import { dashboardcoord } from './pages/dashboardcoord.js';

// OBS: é de extrema importância resolver tudo no sistema que comece com [OBS:] do programa na fase de entrega
// Tudo que for temporário ou está sendo testado, é recomendado a utilização de [OBS:] pra facilitar a busca de coisas inúteis no futuro

function main() {
   document.querySelector('#app').innerHTML = carregarLogin();
   ativarListenerLogin();
}

main();
