import './style.css'
import * as aux from "./lib/funcoesAuxiliares.js"
import { carregarRegistro, ativarListenerRegistro } from './pages/registro.js'
import { Carregardashboardcoord, createProfileBtn } from './pages/dashboardcoord.js';
import { carregarLogin, ativarListenerLogin } from './pages/login.js';
import * as nav from "./lib/navegacaoURL.js"

// OBS: é de extrema importância resolver tudo no sistema que comece com [OBS:] do programa na fase de entrega
// Tudo que for temporário ou está sendo testado, é recomendado a utilização de [OBS:] pra facilitar a busca de coisas inúteis no futuro

window.addEventListener("popstate", () => {
   nav.navigateURL(window.location.pathname);
});

function main() {
   aux.createKeys();
   aux.popularLocalStorage();
   
   if (localStorage.getItem('auth') === "true" && window.location.pathname === "/") {
      window.history.replaceState({}, "", "/dashboardcoord");
   }

   nav.navigateURL(window.location.pathname);
}

main();

