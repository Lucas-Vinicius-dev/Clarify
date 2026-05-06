import { carregarRegistro, ativarListenerRegistro } from '../pages/registro.js'
import { Carregardashboardcoord, createProfileBtn } from '../pages/dashboardcoord.js';
import { carregarLogin, ativarListenerLogin } from '../pages/login.js';

export function navigateURL(url) {
   switch (url) {
      case "/registro":
        carregarRegistro();
        ativarListenerRegistro();
        break;
      case "/login":
        carregarLogin();
        ativarListenerLogin();
        break;
      case "/dashboardcoord":
        Carregardashboardcoord();
        createProfileBtn();
        break;
      default:
        carregarRegistro();
        ativarListenerRegistro();
        break;
   }
}