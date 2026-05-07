import { carregarRegistro, ativarListenerRegistro } from '../pages/registro.js'
import { Carregardashboardcoord, createProfileBtn, setupDashboardState } from '../pages/dashboardcoord.js';
import { carregarLogin, ativarListenerLogin } from '../pages/login.js';
import { carregarCentralDemandas, ativarListenerCentralDemandas } from '../pages/centralDemandas.js';
import { Carregardashboardaluno, createRequestBtn, setupDashboardState as setupDashboardStateAluno } from '../pages/dashboardaluno.js';

const isAuthenticated = () => localStorage.getItem('auth') === 'true';
const getCargo = () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    return usuario.cargo || '';
  } catch {
    return '';
  }
};

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

        if (getCargo() === 'aluno') {
          window.history.replaceState({}, '', '/centraldemandas');
          carregarCentralDemandas();
          ativarListenerCentralDemandas();
          break;
        }

        Carregardashboardcoord();
        setupDashboardState();
        createProfileBtn();
        break;
      case "/dashboardaluno":
        if (!isAuthenticated()) {
          window.history.replaceState({}, '', '/login');
          carregarLogin();
          ativarListenerLogin();
          break;
        }

        if (getCargo() !== 'aluno') {
          window.history.replaceState({}, '', '/dashboardcoord');
          Carregardashboardcoord();
          setupDashboardState();
          createProfileBtn();
          break;
        }

        Carregardashboardaluno();
        setupDashboardStateAluno();
        createRequestBtn();
        break;
      case "/centraldemandas":
        if (!isAuthenticated()) {
          window.history.replaceState({}, '', '/login');
          carregarLogin();
          ativarListenerLogin();
          break;
        }

        if (getCargo() !== 'aluno') {
          window.history.replaceState({}, '', '/dashboardcoord');
          Carregardashboardcoord();
          setupDashboardState();
          createProfileBtn();
          break;
        }

        carregarCentralDemandas();
        ativarListenerCentralDemandas();
        break;
      default:
        carregarRegistro();
        ativarListenerRegistro();
        break;
   }
}