import gato from '../components/assets/GATOGORDO.png'

const dashboardViews = {
    nome: `
        <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Visão Geral</h2>
            <p class="text-gray-600">Aqui você pode ver informações do coordenador, status do sistema e atalhos rápidos.</p>
        </div>
    `,
    alunos: `
        <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Alunos</h2>
            <p class="text-gray-600">Gerencie a lista de alunos, visualize registros e acesse informações de matrícula.</p>
        </div>
    `,
    demandas: `
        <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Demandas</h2>
            <p class="text-gray-600">Veja as demandas abertas, tarefas pendentes e notificações importantes.</p>
        </div>
    `,
    adicionar: `
        <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Adicionar aluno</h2>
            <p class="text-gray-600">Clique no botão para abrir o formulário de cadastro de aluno.</p>
        </div>
    `
};

export function renderDashboardView(view = 'nome') {
    const container = document.querySelector('#dashboardContent');
    if (!container) return;
    container.innerHTML = dashboardViews[view] || dashboardViews.nome;
    setActiveDashboardTab(view);
}

export function setActiveDashboardTab(view) {
    const buttons = document.querySelectorAll('[data-view]');
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

export function Carregardashboardcoord(){
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
        <aside class="hidden md:block w-full md:w-72 bg-gray-50 shadow p-8 border border-gray-100">
            <div class="h-20 mb-4 rounded-xl p-4 flex items-center justify-center w-full">
                <img src="${gato}" alt="Clarify Logo" class="w-full h-full object-contain" />
                <h1 class="text-3xl font-bold text-orange-600">Clarify</h1>
            </div>
            <ul class="flex flex-col gap-4 mt-8">
                <li><button type="button" data-view="nome" class="flex items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>Nome</button></li>
                <li><button type="button" data-view="alunos" class="flex items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg></span>Alunos</button></li>
                <li id="criarPerfilBtn"><button type="button" data-view="adicionar" class="flex items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg></span>Adicionar aluno</button></li>
                <li><button type="button" data-view="demandas" class="flex items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg></span>Demandas</button></li>
            </ul>
        </aside>
        <main class="flex-1 p-8" id="dashboardContent">
            <div class="rounded-2xl border border-dashed border-gray-300 bg-white p-8 shadow-sm">
                <h2 class="text-2xl font-semibold mb-4">Visão Geral</h2>
                <p class="text-gray-600">Escolha um item na barra lateral para carregar o conteúdo aqui sem alterar a sidebar.</p>
            </div>
        </main>
    </div>


    // Pop-up de criação de perfil
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
                    <label for="tipoconta" class="block text-sm font-medium text-gray-700">Tipo de Conta</label>
                    <select id="tipoconta" name="tipoconta" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="button" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onclick="document.getElementById('criarPerfil').classList.add('hidden')">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Criar</button>
                </div>
            </form>
        </div>
    </div>`
}
