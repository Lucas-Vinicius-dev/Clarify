import gato from '../components/assets/GATOGORDO.png'
import * as aux from "../lib/funcoesAuxiliares"
import { carregarLogin, ativarListenerLogin } from './login.js'

const coord = JSON.parse(localStorage.getItem('usuarioLogado') || '{"nome":"Usuário"}');
const dashboardViews = {
    nome: `
        <div class="space-y-6">
            <section class="relative overflow-hidden bg-zinc-900 p-6  text-white">
                <div class="absolute inset-0 opacity-15">
                    <img class="w-full h-full object-cover" data-alt="An abstract architectural composition of sharp angles and geometric planes in shades of deep charcoal and burnt orange. The image has a sophisticated, minimalist feel, representing the intersection of data and institutional structure. High-contrast lighting creates strong shadows, reinforcing the geometric institutionalism brand identity of the Clarify platform." src="https://lh3.googleusercontent.com/aida/ADBb0ujSia4aBQLXG-iDCxNtnt-voKc0tRw5t7i4W1HWCnTaojCWcpeB9NtLb32npBd2nD3bGRRrA_rXE-koIkxkVicCaAQV-0dJmJGCNNXUgg58Hab_xfgty2yUY2F8jxKrOKTnub9NABjLE97Cn754GRPyzD5CB3AXGadtJdXOnWumA41elODuvAfKMNMbGoaHhZeyO46Zgtz_ojolL124-2l7Wk_iioeNE2b41S5j0mNWvnuP0lLWLNAwP5KHRdcTCjOmL6BVtAsc-OQ"/>
                </div>
                <div class="relative z-10 space-y-4">
                    <span class="text-primary-fixed font-label-caps text-[10px] tracking-[0.2em] uppercase block">PORTAL DO COORDENADOR</span>
                    <h1 class="font-h1 text-3xl lg:text-4xl font-semibold">Bem-vindo, ${coord.nome}</h1>
                    <p class="text-zinc-400 text-sm lg:text-base max-w-2xl">Acompanhe as demandas e gerencie o fluxo de solicitações acadêmicas com precisão e clareza.</p>
                </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white border border-zinc-200 p-4 flex flex-col justify-between min-h-[140px] ">
                    <div class="flex justify-between items-start gap-4">
                        <span class="material-symbols-outlined text-primary text-2xl" data-icon="person_search">person_search</span>
                        <span class="text-[10px] font-bold text-zinc-400 uppercase">+12% ESTE MÊS</span>
                    </div>
                    <div>
                        <h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">REGISTERED USERS</h3>
                        <p class="text-3xl lg:text-4xl font-semibold text-zinc-900">428 <span class="text-base font-normal text-zinc-400">ativos</span></p>
                    </div>
                </div>
                <div class="bg-white border border-zinc-200 p-4 flex flex-col justify-between min-h-[140px]  border-l-4 border-error">
                    <div class="flex justify-between items-start gap-4">
                        <span class="material-symbols-outlined text-error text-2xl" data-icon="emergency_home">emergency_home</span>
                        <span class="bg-error text-white text-[10px] px-2 py-0.5 font-bold rounded">ALERTA</span>
                    </div>
                    <div>
                        <h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">CRITICAL DEADLINES</h3>
                        <p class="text-3xl lg:text-4xl font-semibold text-zinc-900">05 <span class="text-base font-normal text-error">&lt; 24h</span></p>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-zinc-200 overflow-hidden ">
                <div class="bg-zinc-50 border-b border-zinc-200 px-4 py-3 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <h2 class="font-h3 text-base lg:text-lg flex items-center gap-2">
                        <span class="material-symbols-outlined text-error" data-icon="priority_high">priority_high</span>
                        Priority Deadlines
                    </h2>
                    <button id="ver-todas" class=" text-xs font-bold text-primary hover:underline">VER TODAS</button>
                </div>
                <div class="divide-y divide-zinc-100">
                    <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">AC</div>
                            <div>
                                <h4 class="font-h3 text-base text-zinc-900">Aproveitamento de Créditos</h4>
                                <p class="text-sm text-zinc-500">Solicitante: Mariana Costa (202100452)</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 lg:gap-8">
                            <div class="text-right">
                                <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
                                <p class="text-sm font-bold text-error">04 horas</p>
                            </div>
                            <span class="bg-error-container text-on-error-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Urgente</span>
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</button>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">TM</div>
                            <div>
                                <h4 class="font-h3 text-base text-zinc-900">Trancamento de Matrícula</h4>
                                <p class="text-sm text-zinc-500">Solicitante: João Pedro Santos (202001183)</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 lg:gap-8">
                            <div class="text-right">
                                <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
                                <p class="text-sm font-bold text-error">12 horas</p>
                            </div>
                            <span class="bg-error-container text-on-error-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Urgente</span>
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</button>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">QT</div>
                            <div>
                                <h4 class="font-h3 text-base text-zinc-900">Quebra de Pré-requisito</h4>
                                <p class="text-sm text-zinc-500">Solicitante: Ana Beatriz Lima (202200812)</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 lg:gap-8">
                            <div class="text-right">
                                <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
                                <p class="text-sm font-bold text-error">19 horas</p>
                            </div>
                            <span class="bg-error-container text-on-error-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Urgente</span>
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    alunos: `
        <div class=" border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Alunos</h2>
            <p class="text-gray-600">Gerencie a lista de alunos, visualize registros e acesse informações de matrícula.</p>
        </div>
    `,
    demandas: `
        <div class=" border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Demandas</h2>
            <p class="text-gray-600">Veja as demandas abertas, tarefas pendentes e notificações importantes.</p>
        </div>
    `,
    adicionar: `
        <div class=" border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Adicionar aluno</h2>
            <p class="text-gray-600">Clique no botão para abrir o formulário de cadastro de aluno.</p>
        </div>
    `
};

export function checarDashboardCoord() {
    const nome = document.querySelector("#nome");
    const matricula = document.querySelector("#matricula");
    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");
    const cargo = document.querySelector("#cargo");

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
}

// Adiciona um listener para o evento de submit do formulário de dashboard
export function ativarListenerDashboardCoord() {
    document.querySelector('#dashboardCoordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checarDashboardCoord();
    });
}

export function checarDashboardCoord() {
    const nome = document.querySelector("#nome");
    const matricula = document.querySelector("#matricula");
    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");
    const cargo = document.querySelector("#cargo");

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
}

export function ativarListenerDashboardCoord() {
    document.querySelector('#dashboardCoordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checarDashboardCoord();
    });
}

export function renderDashboardView(view = 'nome') {
    const container = document.querySelector('#dashboardContent');
    if (!container) return;
    container.innerHTML = dashboardViews[view] || dashboardViews.nome;
    setActiveDashboardTab(view);
}

export function setActiveDashboardTab(view) {
    const buttons = document.querySelectorAll('[data-view]');
    const vertodos = document.getElementById('ver-todas');
    if (vertodos) {
        vertodos.addEventListener('click', () => {
            renderDashboardView('demandas');
            setActiveDashboardTab('demandas');
        });
    }
        });
    }

    buttons.forEach((button) => {
        const isActive = button.dataset.view === view;
        button.classList.toggle('bg-brand-primary/10', isActive);
        button.classList.toggle('text-brand-primary', isActive);
        button.classList.toggle('bg-transparent', !isActive);
        button.classList.toggle('text-gray-700', !isActive);
    });
}

export function setupDashboardState() {
    renderDashboardView('nome');
    const buttons = document.querySelectorAll('[data-view]');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            if (!view) return;

            renderDashboardView(view);
            const modal = document.getElementById('criarPerfil');
            if (view === 'adicionar') {
                modal?.classList.remove('hidden');
            } else {
                modal?.classList.add('hidden');
            }
        });
    });
}

export function createProfileBtn() {
    const criarPerfilBtns = document.querySelectorAll("[data-view='adicionar']");
    if (!criarPerfilBtns.length) return;
    const criarPerfilBtns = document.querySelectorAll("[data-view='adicionar']");
    if (!criarPerfilBtns.length) return;

    criarPerfilBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.getElementById('criarPerfil').classList.remove('hidden');
        });
    criarPerfilBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.getElementById('criarPerfil').classList.remove('hidden');
        });
    });
}


export function Carregardashboardcoord() {
    aux.adicionarCaminhoURL("dashboardcoord");
    document.querySelector("title").innerHTML = `Dashboard - Clarify`;
    document.querySelector('#app').innerHTML = `
    <div class="min-h-screen w-full bg-pink-50 flex flex-col md:flex-row relative overflow-hidden">
        <div class="md:hidden bg-white border-b border-gray-200 p-4">
            <div class="flex flex items-center justify-center gap-2 mb-4">
                <img src="${gato}" alt="Clarify Logo" class="h-10 w-10 object-contain" />
                <h1 class="text-lg font-bold text-orange-600">Clarify</h1>
            </div>

            <div class="flex gap-2 overflow-x-auto justify-center">
                <button type="button" data-view="nome" aria-label="Nome" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </button>
                <button type="button" data-view="alunos" aria-label="Alunos" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                </button>
                <button type="button" data-view="adicionar" class="criarPerfilBtn min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10" aria-label="Adicionar aluno">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button type="button" data-view="demandas" aria-label="Demandas" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note">
                        <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                        <path d="M15 3v5a1 1 0 0 0 1 1h5"/>
                    </svg>
                </button>
            </div>
        </div>
        <aside class="w-full md:w-72 bg-gray-50 shadow p-6 border border-gray-100">
        <div class="md:hidden bg-white border-b border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <img src="${gato}" alt="Clarify Logo" class="h-10 w-10 object-contain" />
                    <h1 class="text-lg font-bold text-orange-600">Clarify</h1>
                </div>
                <!-- Botão logout mobile -->
                <button id="btnLogoutMobile" type="button" title="Sair da conta"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sair
                </button>
            </div>
            <div class="flex gap-2 overflow-x-auto justify-center">
                <button type="button" data-view="nome" aria-label="Nome" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </button>
                <button type="button" data-view="alunos" aria-label="Alunos" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                </button>
                <button type="button" data-view="adicionar" class="criarPerfilBtn min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10" aria-label="Adicionar aluno">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button type="button" data-view="demandas" aria-label="Demandas" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note">
                        <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                        <path d="M15 3v5a1 1 0 0 0 1 1h5"/>
                    </svg>
                </button>
            </div>
        </div>
        <aside class="hidden md:flex md:flex-col w-72 bg-gray-50 shadow border border-gray-100 p-6">
            <div class="h-18 mb-3 rounded-xl p-3 flex items-center justify-center w-full gap-3">
                <img src="${gato}" alt="Clarify Logo" class="w-12 h-12 object-contain" />
                <h1 class="text-2xl font-bold text-orange-600">Clarify</h1>
            </div>
            <ul class="flex flex-col gap-3 mt-6 flex-1">
                <li><button type="button" data-view="nome" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>Nome</button></li>
                <li><button type="button" data-view="alunos" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg></span>Alunos</button></li>
                <li id="criarPerfilBtn"><button type="button" data-view="adicionar" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg></span>Adicionar aluno</button></li>
                <li><button type="button" data-view="demandas" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg></span>Demandas</button></li>
            </ul>
            <!-- Botão logout desktop — no rodapé da sidebar -->
            <div class="mt-auto pt-4 border-t border-gray-200">
                <button id="btnLogoutDesktop" type="button"
                    class="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sair da conta
                </button>
            </div>
        </aside>
        <main class="flex-1 p-6" id="dashboardContent">
            <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-6 shadow-sm">
                <h2 class="text-2xl font-semibold mb-3">Visão Geral</h2>
                <p class="text-gray-600 text-sm">Escolha um item na barra lateral para carregar o conteúdo aqui sem alterar a sidebar.</p>
            </div>
        </main>
    </div>

    <div class="hidden fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" id="criarPerfil">
        <div class="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6">Criar Perfil</h2>
            <form id="criarPerfilForm" class="space-y-4">
                <div>
                    <label for="nome" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="nome" name="nome" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="matricula" class="block text-sm font-medium text-gray-700">Matrícula</label>
                    <input type="text" id="matricula" name="matricula" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Institucional</label>
                    <input type="email" id="email" name="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="senha" class="block text-sm font-medium text-gray-700">Senha</label>
                    <input type="password" id="senha" name="senha" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="cargo" class="block text-sm font-medium text-gray-700">Tipo de Conta</label>
                    <select id="cargo" name="cargo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                    <label for="cargo" class="block text-sm font-medium text-gray-700">Tipo de Conta</label>
                    <select id="cargo" name="cargo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="button" class=" hover:cursor-pointer mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onclick="document.getElementById('criarPerfil').classList.add('hidden')">Cancelar</button>
                    <button id="dashboardCoordForm" type="submit" class=" hover:cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Criar</button>
                    <button type="button" class="hover:cursor-pointer mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onclick="document.getElementById('criarPerfil').classList.add('hidden')">Cancelar</button>
                    <button id="dashboardCoordForm" type="submit" class="hover:cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Criar</button>
                </div>
            </form>
        </div>
    </div>`;

    setupDashboardState();

    // Logout desktop
    document.querySelector('#btnLogoutDesktop').addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('auth');
        carregarLogin();
        ativarListenerLogin();
    });

    // Logout mobile
    document.querySelector('#btnLogoutMobile').addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('auth');
        carregarLogin();
        ativarListenerLogin();
    });
}