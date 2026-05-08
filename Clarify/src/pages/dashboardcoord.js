import gato from '../components/assets/GATOGORDO.png'
import * as aux from "../lib/funcoesAuxiliares"
import { popularDemandas } from '../lib/funcoesAuxiliares';
import { carregarLogin, ativarListenerLogin } from './login.js'
import { renderSidebarCoord } from '../components/structures/sidebar.js';
import { renderChipUsuario } from '../components/structures/topbar.js';
import { iconesUsados, processarIcones } from '../components/assets/icons.js';

processarIcones();

export function renderizarAlunos() {
    console.log("Renderizando alunos...");
    const usuariosString = localStorage.getItem('usuarios') || '[]';
    const usuarios = JSON.parse(usuariosString);
    const alunos = usuarios.filter(u => u.cargo === 'aluno');
    const demandasString = localStorage.getItem('demandas') || '[]';
    const demandas = JSON.parse(demandasString);

    const container = document.querySelector('#alunosContainer');
    if (!container) return;
    container.innerHTML = '';

    if (alunos.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-zinc-400">
                <span class="material-symbols-outlined text-4xl mb-2 block">person_off</span>
                <p class="text-sm">Nenhum aluno cadastrado.</p>
            </div>
        `;
        return;
    }

    alunos.forEach((aluno) => {
        const iniciais = aluno.nome
            .split(' ')
            .slice(0, 2)
            .map(n => n[0].toUpperCase())
            .join('');

        const alunoElement = document.createElement('div');
        alunoElement.classList.add(
            'bg-white',
            'border',
            'border-gray-200',
            'rounded-2xl',
            'p-5',
            'shadow-lg',
            'hover:-translate-y-1',
            'transition-transform',
            'duration-200',
            'ease-out'
        );

        alunoElement.innerHTML = `
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container font-bold text-sm shrink-0">
                    ${iniciais}
                </div>
                <div class="min-w-0">
                    <h3 class="text-base font-semibold text-zinc-900 truncate">${aluno.nome}</h3>
                    <p class="text-xs text-zinc-400 truncate">${aluno.email}</p>
                </div>
            </div>
            <div class="grid gap-2 text-sm text-zinc-600">
                <p><span class="font-semibold text-zinc-800">Nome:</span> ${aluno.nome}</p>
                <p><span class="font-semibold text-zinc-800">Matrícula:</span>
                    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 ml-1">
                        ${aluno.matricula}
                    </span>
                </p>
                <p><span class="font-semibold text-zinc-800">Demandas em aberto:</span>
                    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 ml-1">
                        ${demandas.filter(d => d.matriculaAluno === aluno.matricula).length}
                    </span>
                </p>

            </div>
        `;

        container.appendChild(alunoElement);
    });

    return container;
}
export function renderizarDemandas(){
    console.log("Renderizando demandas...");
    const demandasString = localStorage.getItem('demandas') || '[]';
    console.log('localStorage:', demandasString);
    const demandas = JSON.parse(demandasString);
    console.log('Demandas:', demandas);
    const container = document.querySelector('#demandasContainer');
    console.log('Container encontrado:', container);
    if (!container) return;
    container.innerHTML = '';
    demandas.forEach((demanda) =>{
        console.log(demanda)
        const demandaElement = document.createElement('div');
        demandaElement.classList.add(
            'bg-white',
            'border',
            'border-gray-200',
            'rounded-2xl',
            'p-5',
            'shadow-lg',
            'hover:-translate-y-1',
            'transition-transform',
            'duration-200',
            'ease-out'
        );
        demandaElement.classList.add('demandas');
        const statusColor = demanda.status === 'concluido' ? 'bg-emerald-100 text-emerald-700' : demanda.status === 'em_analise' ? 'bg-amber-100 text-amber-700' : demanda.status === 'requer_ajuste' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700';
        const descricao = demanda.descricao ? demanda.descricao : '';
        demandaElement.innerHTML = `
            <div class="flex items-start justify-between gap-4 mb-4">
                <div class="space-y-2">
                    <h3 class="text-lg font-semibold text-zinc-900">${demanda.tipo}</h3>
                    <p class="text-sm text-zinc-500">${descricao}</p>
                </div>
                <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColor}">${demanda.status.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div class="grid gap-2 text-sm text-zinc-600">
                <p><span class="font-semibold text-zinc-800">Protocolo:</span> ${demanda.protocolo}</p>
                <p><span class="font-semibold text-zinc-800">Matrícula:</span> ${demanda.matriculaAluno}</p>
            </div>
        `;
        container.appendChild(demandaElement);
    })
    return container;
}
const coord = JSON.parse(localStorage.getItem('usuarioLogado') || '{"nome":"Usuário"}');

const dashboardViews = {
    nome: `
        <div class="space-y-6">
            <section class="relative overflow-hidden bg-zinc-900 p-5 text-white">
                <div class="absolute inset-0 opacity-15">
                    <img class="w-full h-full object-cover" data-alt="An abstract architectural composition of sharp angles and geometric planes in shades of deep charcoal and burnt orange. The image has a sophisticated, minimalist feel, representing the intersection of data and institutional structure. High-contrast lighting creates strong shadows, reinforcing the geometric institutionalism brand identity of the Clarify platform." src="${gato}"/>
                </div>
                <div class="relative z-10 space-y-4">
                    <span class="text-primary-fixed font-label-caps text-[10px] tracking-[0.2em] uppercase block">PORTAL DO COORDENADOR</span>
                    <h1 class="font-h1 text-3xl lg:text-4xl font-semibold">Bem-vindo, ${coord.nome}</h1>
                    <p class="text-zinc-400 text-sm lg:text-base max-w-2xl">Acompanhe as demandas e gerencie o fluxo de solicitações acadêmicas com precisão e clareza.</p>
                </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white border border-zinc-200 p-4 flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <span class="material-symbols-outlined text-primary text-2xl">person_search</span>
                        <span class="text-[10px] font-bold text-zinc-400 uppercase">+12% ESTE MÊS</span>
                    </div>
                    <div>
                        <h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">REGISTERED USERS</h3>
                        <p class="text-3xl lg:text-4xl font-semibold text-zinc-900">428 <span class="text-base font-normal text-zinc-400">ativos</span></p>
                    </div>
                </div>
                <div class="bg-white border border-zinc-200 border-l-4 border-error p-4 flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <span class="material-symbols-outlined text-error text-2xl">emergency_home</span>
                        <span class="bg-error text-white text-[10px] px-2 py-0.5 font-bold rounded">ALERTA</span>
                    </div>
                    <div>
                        <h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">CRITICAL DEADLINES</h3>
                        <p class="text-3xl lg:text-4xl font-semibold text-zinc-900">05 <span class="text-base font-normal text-error">&lt; 24h</span></p>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-zinc-200 overflow-hidden">
                <div class="bg-zinc-50 border-b border-zinc-200 px-4 py-3 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <h2 class="font-h3 text-base lg:text-lg flex items-center gap-2">
                        <span class="material-symbols-outlined text-error">priority_high</span>
                        Priority Deadlines
                    </h2>
                    <button id="ver-todas" class="text-xs font-bold text-primary hover:underline">VER TODAS</button>
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
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors">chevron_right</button>
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
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors">chevron_right</button>
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
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors">chevron_right</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     `
    ,
    
    alunos: `
    <div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-semibold mb-4">Alunos</h2>
        <p class="text-gray-600">Gerencie a lista de alunos, visualize registros e acesse informações de matrícula.</p>
    </div>
    <div id="alunosContainer" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
`,
demandas: `
    <div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-semibold mb-4">Demandas</h2>
        <p class="text-gray-600">Veja as demandas abertas, tarefas pendentes e notificações importantes.</p>
    </div>
    <div id="demandasContainer" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
`,
    adicionar: `
        <div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Adicionar aluno</h2>
            <p class="text-gray-600">Clique no botão para abrir o formulário de cadastro de aluno.</p>
        </div>
    `
};
function existeDuplicidadeDashboard(matricula, email, usuarios) {
    return usuarios.some((usuario) => {
        return (String(usuario.matricula) === String(matricula) || String(usuario.email) === String(email));
    })
}

function checarDashboardCoord() {
    const nome = document.querySelector("#nome").value;
    const matricula = document.querySelector("#matricula").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const cargo = document.querySelector("#cargo").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (existeDuplicidadeDashboard(matricula, email, usuarios)) {
        alert("Usuário já existe");
        aux.limparFormulario(["#nome", "#matricula", "#email", "#senha", "#cargo"]);
        return;
    }

    const coordenadorLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    alert("Usuário criado com sucesso!");
    aux.adicionarUsuario(nome, matricula, email, senha, cargo);
    console.log(aux.acharUsuario(coordenadorLogado["matricula"]));
    aux.atribuirAluno(coordenadorLogado.matricula, matricula);
}

export function ativarListenerDashboardCoord() {
    document.querySelector('#criarPerfilForm').onsubmit = (e) => {
        e.preventDefault();
        checarDashboardCoord();
        aux.limparFormulario(["#nome", "#matricula", "#email", "#senha", "#cargo"]);
    });
}

export function renderDashboardView(view = 'nome') {
    const container = document.querySelector('#dashboardContent');
    if (!container) return;
    container.innerHTML = dashboardViews[view] || dashboardViews.nome;
    if (view === 'demandas') {
        renderizarDemandas();
    }
    if (view === 'alunos') {
        renderizarAlunos();
    }
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
        ${renderSidebarCoord()}
        <!-- Navbar mobile -->
        <div class="md:hidden bg-white border-b border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <img src="${gato}" alt="Clarify Logo" class="h-10 w-10 object-contain" />
                    <h1 class="text-lg font-bold text-orange-600">Clarify</h1>
                </div>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </button>
                <button type="button" data-view="alunos" aria-label="Alunos" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
                </button>
                <button type="button" data-view="adicionar" aria-label="Adicionar aluno" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg>
                </button>
                <button type="button" data-view="demandas" aria-label="Demandas" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg>
                </button>
            </div>
        </div>


<!-- Área principal -->
<main class="flex-1 flex flex-col min-w-0 ">

    <!-- Topbar -->
    <div class="hidden md:flex items-center justify-end gap-3 px-6 py-4 bg-white border-b border-gray-200">

        <button type="button"
            class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
            <i data-lucide="bell" class="w-4 h-4"></i>
        </button>

        <button type="button"
            class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
            <i data-lucide="help-circle" class="w-4 h-4"></i>
        </button>

        ${renderChipUsuario(coord)}
    </div>

    <!-- Conteúdo dashboard -->
    <div class="flex-1 p-5 overflow-y-auto" id="dashboardContent"></div>

</main>
   
    </div>

    <!-- Modal: Criar Perfil -->
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
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="button" class="hover:cursor-pointer mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onclick="document.getElementById('criarPerfil').classList.add('hidden')">Cancelar</button>
                    <button id="dashboardCoordForm" type="submit" class="hover:cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Criar</button>
                </div>
            </form>
        </div>
    </div>`
    processarIcones();

    setupDashboardState();
    ativarListenerDashboardCoord();

    document.querySelector('#btnLogoutDesktop').addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('auth');
        carregarLogin();
        ativarListenerLogin();
    });

    document.querySelector('#btnLogoutMobile').addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('auth');
        carregarLogin();
        ativarListenerLogin();
    });
}