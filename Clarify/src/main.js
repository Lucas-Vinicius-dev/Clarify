import './style.css'
import * as aux from "./lib/funcoesAuxiliares.js"
import { carregarRegistro, ativarListenerRegistro } from './pages/registro.js'
import { Carregardashboardcoord, createProfileBtn, renderizarDemandas, aprovarDemanda } from './pages/dashboardcoord.js';
import { carregarLogin, ativarListenerLogin } from './pages/login.js';
import * as nav from "./lib/navegacaoURL.js"

// OBS: é de extrema importância resolver tudo no sistema que comece com [OBS:] do programa na fase de entrega
// Tudo que for temporário ou está sendo testado, é recomendado a utilização de [OBS:] pra facilitar a busca de coisas inúteis no futuro

function main() {
   aux.createKeys();
   aux.popularLocalStorage();

   window.addEventListener("popstate", () => {
      nav.navigateURL(window.location.pathname);
   });
   
   if (localStorage.getItem('auth') === "true" && window.location.pathname === "/") {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};
      if (usuarioLogado.cargo === "aluno") {
         aux.adicionarCaminhoURL("centraldemandas");
      } else {
         aux.adicionarCaminhoURL("dashboardcoord");
      }
   }

   nav.navigateURL(window.location.pathname);
}

main();

