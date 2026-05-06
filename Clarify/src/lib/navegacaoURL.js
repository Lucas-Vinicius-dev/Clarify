import { carregarRegistro, ativarListenerRegistro } from '../pages/registro.js'
import { Carregardashboardcoord, createProfileBtn, setupDashboardState } from '../pages/dashboardcoord.js';
import { carregarLogin, ativarListenerLogin } from '../pages/login.js';

const isAuthenticated = () => localStorage.getItem('auth') === 'true';

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
        if (!isAuthenticated()) {
          window.history.replaceState({}, '', '/login');
          carregarLogin();
          ativarListenerLogin();
          break;
        }

        Carregardashboardcoord();
        setupDashboardState();
        createProfileBtn();
        break;
      default:
        carregarRegistro();
        ativarListenerRegistro();
        break;
   }
}