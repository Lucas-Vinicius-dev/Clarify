import { carregarRegistro, ativarListenerRegistro } from '../pages/registro.js'
import { Carregardashboardcoord, createProfileBtn, setupDashboardState } from '../pages/dashboardcoord.js';
import { carregarLogin, ativarListenerLogin } from '../pages/login.js';
import { carregarCentralDemandas, ativarListenerCentralDemandas } from '../pages/centralDemandas.js';
import { carregarLanding, ativarListenerLanding } from '../pages/landing.js';

const isAuthenticated = () => localStorage.getItem('auth') === 'true';
const getCargo = () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    return usuario.cargo || '';
  } catch {
    return '';
  }
};

const goTo = (path, load, activate) => {
  if (path) {
    window.history.replaceState({}, '', path);
  }

  if (load) {
    load();
  }

  if (activate) {
    activate();
  }
};

const goToLogin = () => goTo('/login', carregarLogin, ativarListenerLogin);
const goToRegistro = () => goTo('/registro', carregarRegistro, ativarListenerRegistro);

const goToDashboardCoord = () => {
  Carregardashboardcoord();
  setupDashboardState();
  createProfileBtn();
};

const goToCentralDemandas = () => {
  carregarCentralDemandas();
  ativarListenerCentralDemandas();
};

export function navigateURL(url) {
  switch (url) {
    case "/":
      carregarLanding();
      ativarListenerLanding();
      break;
    case "/registro":
      goToRegistro();
      break;
    case "/login":
      goToLogin();
      break;
    case "/dashboardcoord":
      if (!isAuthenticated()) {
        carregarLanding();
        ativarListenerLanding();
        break;
      }

      if (getCargo() === 'aluno') {
        goTo('/centraldemandas', carregarCentralDemandas, ativarListenerCentralDemandas);
        break;
      }

      goToDashboardCoord();
      break;
    case "/dashboardaluno":
      if (!isAuthenticated()) {
        carregarLanding();
        ativarListenerLanding();
        break;
      }

      if (getCargo() !== 'aluno') {
        goTo('/dashboardcoord', goToDashboardCoord);
        break;
      }
      
    case "/centraldemandas":
      if (!isAuthenticated()) {
        carregarLanding();
        ativarListenerLanding();
        break;
      }

      if (getCargo() !== 'aluno') {
        goTo('/dashboardcoord', goToDashboardCoord);
      }
      else {
        goTo('/centraldemandas', goToCentralDemandas);
      }
      break;

    default:
      carregarLanding();
      ativarListenerLanding();
      break;
  }
}