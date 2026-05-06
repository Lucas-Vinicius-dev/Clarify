import { carregarRegistro, ativarListenerRegistro } from '../pages/registro.js'
import { Carregardashboardcoord, createProfileBtn, setupDashboardState } from '../pages/dashboardcoord.js';
import { carregarLogin, ativarListenerLogin } from '../pages/login.js';
import { carregarCentralDemandas, ativarListenerCentralDemandas } from '../pages/centralDemandas.js';

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
        setupDashboardState();
        createProfileBtn();
        break;
      case "/centraldemandas":
        carregarCentralDemandas();
        ativarListenerCentralDemandas();
        break;
      default:
        carregarRegistro();
        ativarListenerRegistro();
        break;
   }
}