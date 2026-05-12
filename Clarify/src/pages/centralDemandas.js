import * as aux from '../lib/funcoesAuxiliares.js'
import { iconesUsados, processarIcones } from '../components/assets/icons.js';
import { carregarLogin, ativarListenerLogin } from './login.js'
import { renderChipUsuario } from '../components/structures/topbar.js';
import { abrirModalNovaDemanda, abrirModalDetalhesDemanda } from '../components/structures/modais.js';
import logoClarify from '../components/assets/GATOGORDO.png';
import * as dms from '../services/demands.js';


// Card "vazio" que convida o aluno a abrir uma nova demanda.

export function renderCardNovaDemanda() {
    return `
        <button type="button" data-acao="nova-demanda" class="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-primary hover:text-brand-primary hover:bg-white transition-colors min-h-[180px] cursor-pointer">
            <span class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <i data-lucide="plus" class="w-5 h-5"></i>
            </span>
            <span class="text-sm font-bold">Nova Solicitação</span>
            <span class="text-xs">Abra uma nova demanda acadêmica</span>
        </button>
    `;
}


// Abre/fecha o drawer de navegação no mobile.
function alternarDrawer(abrir) {
    const drawer = document.querySelector('#drawerMobile');
    const painel = document.querySelector('#drawerPainel');
    if (!drawer || !painel) return;

    if (abrir) {
        drawer.classList.remove('hidden');
        setTimeout(() => painel.classList.remove('-translate-x-full'), 10);
        document.body.classList.add('overflow-hidden');
    } else {
        painel.classList.add('-translate-x-full');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => drawer.classList.add('hidden'), 200);
    }
}

// Anexa os listeners de filtro, busca e logout. Precisa ser chamado depois do innerHTML.
export function ativarListenerCentralDemandas() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        carregarLogin();
        ativarListenerLogin();
        return;
    }

    // Cada rerender tem que reler do localStorage senão fica com a lista antiga depois
    // de criar uma demanda nova.

    function rerender() {
        const demandas = dms.obterDemandas();
        atualizarMetricasNoTopo(demandas);
        dms.renderListaDemandas(demandas);
    }

    processarIcones();
    rerender();

    document.querySelector('#filtroBusca').addEventListener('input', (e) => {
        filtros.busca = e.target.value;
        dms.renderListaDemandas(dms.obterDemandas());
    });

    document.querySelector('#filtroStatus').addEventListener('change', (e) => {
        filtros.status = e.target.value;
        dms.renderListaDemandas(dms.obterDemandas());
    });

    document.querySelector('#limparFiltros').addEventListener('click', () => {
        filtros.busca = '';
        filtros.status = 'todos';
        document.querySelector('#filtroBusca').value = '';
        document.querySelector('#filtroStatus').value = 'todos';
        dms.renderListaDemandas(dms.obterDemandas());
    });

    // O botão de nova demanda existe em 3 lugares (desktop, FAB do mobile, card vazio).
    // Todos abrem a mesma modal.
    function disparaNovaDemanda() {
        abrirModalNovaDemanda({ onCriado: rerender });
    }

    const btnNovaDesktop = document.querySelector('#btnNovaDemandaDesktop');
    const btnNovaMobile = document.querySelector('#btnNovaDemandaMobile');
    if (btnNovaDesktop) btnNovaDesktop.addEventListener('click', disparaNovaDemanda);
    if (btnNovaMobile) btnNovaMobile.addEventListener('click', disparaNovaDemanda);

    // Os botões de ver detalhes e o card vazio são recriados a cada rerender,
    // então preciso usar delegação no container pai pra não ter que reanexar os listeners.
    const containerLista = document.querySelector('#listaDemandasAbertas');
    if (containerLista) {
        containerLista.addEventListener('click', (event) => {
            const botaoDetalhes = event.target.closest('[data-acao="ver-detalhes"]');
            if (botaoDetalhes) {
                const protocolo = botaoDetalhes.getAttribute('data-protocolo');
                if (protocolo) abrirModalDetalhesDemanda(protocolo);
                return;
            }

            const botaoNova = event.target.closest('[data-acao="nova-demanda"]');
            if (botaoNova) disparaNovaDemanda();
        });
    }

    // Logout pode ser disparado por mais de um botão (mobile e desktop).
    const botoesSair = document.querySelectorAll('.btnSairConta');
    for (let i = 0; i < botoesSair.length; ++i) {
        botoesSair[i].addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('auth');
            document.body.classList.remove('overflow-hidden');
            carregarLogin();
            ativarListenerLogin();
        });
    }

    // Drawer de navegação no mobile.
    const btnAbrirDrawer = document.querySelector('#abrirDrawer');
    const btnFecharDrawer = document.querySelector('#fecharDrawer');
    const drawerOverlay = document.querySelector('#drawerOverlay');

    if (btnAbrirDrawer) {
        btnAbrirDrawer.addEventListener('click', () => alternarDrawer(true));
    }
    if (btnFecharDrawer) {
        btnFecharDrawer.addEventListener('click', () => alternarDrawer(false));
    }
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => alternarDrawer(false));
    }
}

// Os cards de métrica do topo são gerados no innerHTML inicial, mas depois precisam
// ser atualizados quando o aluno cria uma nova demanda. Por isso atualizo só o textContent.
function atualizarMetricasNoTopo(demandas) {
    const metricas = calcularMetricas(demandas);
    const total = document.querySelector('[data-metrica="total"]');
    const emAnalise = document.querySelector('[data-metrica="em-analise"]');
    const eficiencia = document.querySelector('[data-metrica="eficiencia"]');
    const eficienciaBarra = document.querySelector('[data-metrica="eficiencia-barra"]');

    if (total) total.textContent = metricas.total;
    if (emAnalise) emAnalise.textContent = metricas.emAnalise < 10 ? '0' + metricas.emAnalise : metricas.emAnalise;
    if (eficiencia) eficiencia.textContent = `${metricas.eficiencia}%`;
    if (eficienciaBarra) eficienciaBarra.style.width = `${metricas.eficiencia}%`;
}

// Calcula as métricas exibidas nos cards do topo a partir das demandas do aluno.
function calcularMetricas(demandas) {
    const total = demandas.length;
    const emAnalise = demandas.filter((d) => d.status === 'em_analise').length;
    const concluidas = demandas.filter((d) => d.status === 'concluido').length;
    const eficiencia = total > 0 ? Math.round((concluidas / total) * 100) : 0;

    return { total, emAnalise, eficiencia };
}

// Links de navegação (usados na sidebar e no drawer).
function renderNavegacao() {
    return `
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-surface-dim/40 text-brand-primary font-semibold">
            <i data-lucide="clipboard-list" class="w-4 h-4"></i> Minhas Demandas
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Nova Demanda
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50">
            <i data-lucide="settings" class="w-4 h-4"></i> Configurações
        </a>
    `;
}


export function carregarCentralDemandas() {
    aux.adicionarCaminhoURL("centraldemandas");
    document.querySelector("title").innerHTML = `Central de Demandas - Clarify`;

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};
    const primeiroNome = (usuarioLogado.nome || 'Aluno').split(' ')[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();

    const demandasDoAluno = dms.obterDemandas();
    const metricas = calcularMetricas(demandasDoAluno);
    const total = metricas.total;
    const emAnalise = metricas.emAnalise;
    const eficiencia = metricas.eficiencia;

    document.querySelector('#app').innerHTML = `
    <div class="min-h-screen w-full bg-brand-surface">

        <!-- Drawer de navegação (mobile) -->
        <div id="drawerMobile" class="fixed inset-0 z-40 hidden md:hidden">
            <div id="drawerOverlay" class="absolute inset-0 bg-black/40"></div>
            <aside id="drawerPainel" class="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-white shadow-xl flex flex-col -translate-x-full transition-transform duration-200 ease-out">
                <div class="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                    <div>
                        <h1 class="text-lg font-bold text-brand-primary">Clarify</h1>
                        <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mt-0.5">
                            Federal Institution
                        </p>
                    </div>
                    <button id="fecharDrawer" type="button" class="w-9 h-9 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer" title="Fechar menu">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <nav class="flex-1 px-4 py-4 space-y-1 text-sm overflow-y-auto">
                    ${renderNavegacao()}
                </nav>
            </aside>
        </div>

        <!-- Conteúdo principal -->
        <main class="overflow-x-hidden">

            <!-- Topbar mobile (sticky) -->
            <header class="md:hidden sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between gap-3 px-4 h-14">
                <div class="flex items-center gap-2">
                    <button id="abrirDrawer" type="button" class="-ml-2 w-10 h-10 flex items-center justify-center text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" title="Abrir menu">
                        <i data-lucide="menu" class="w-5 h-5"></i>
                    </button>
                    <h1 class="text-lg font-bold text-brand-primary">Clarify</h1>
                </div>

                <div class="flex items-center gap-1.5">
                    <button type="button" class="w-9 h-9 rounded-full text-gray-500 hover:text-brand-primary hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer" title="Notificações">
                        <i data-lucide="bell" class="w-4 h-4"></i>
                    </button>
                    ${renderChipUsuario(JSON.parse(localStorage.getItem('usuarioLogado')))}
                </div>
            </header>

            <div class="px-4 py-5 md:px-10 md:py-8">

                <!-- Topbar desktop -->
                <div class="hidden md:flex items-center justify-between gap-3 mb-8">
                    <a href="/" class="flex items-center gap-2.5 group">
                        <img src="${logoClarify}" alt="Clarify" class="w-10 h-10 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)] transition-transform group-hover:scale-105" />
                        <div class="leading-none">
                            <p class="text-lg font-bold text-slate-900 tracking-tight">Clarify</p>
                            <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                        </div>
                    </a>

                    <div class="flex items-center gap-3">
                        <button type="button" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
                            <i data-lucide="bell" class="w-4 h-4"></i>
                        </button>
                        <button type="button" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
                            <i data-lucide="help-circle" class="w-4 h-4"></i>
                        </button>
                        ${renderChipUsuario(JSON.parse(localStorage.getItem('usuarioLogado')))}
                    </div>
                </div>

                <!-- Cabeçalho da página -->
                <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <p class="hidden md:inline-flex text-xs font-semibold text-gray-400 uppercase tracking-widest items-center gap-1">
                            Portal <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i> Central de Demandas
                        </p>
                        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 md:mt-1">Central de Demandas</h2>
                        <p class="text-sm text-gray-500 mt-1">
                            Olá, ${primeiroNome}. Acompanhe aqui suas solicitações.
                        </p>
                    </div>

                    <button id="btnNovaDemandaDesktop" type="button" class="hidden sm:inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-bold px-5 py-3 rounded-xl shadow hover:bg-orange-700 transition-colors cursor-pointer self-start sm:self-auto">
                        <i data-lucide="plus" class="w-4 h-4"></i> Nova Demanda
                    </button>
                </div>

                <!-- Métricas -->
                <div class="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 md:mb-8 flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-2 sm:pb-0">
                    <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total de Solicitações</p>
                        <div class="flex items-end gap-3 mt-2">
                            <span class="text-3xl font-bold text-gray-900" data-metrica="total">${total}</span>
                            <span class="text-xs text-gray-500 pb-1">no semestre</span>
                        </div>
                    </div>

                    <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Em Análise</p>
                        <div class="flex items-end gap-3 mt-2">
                            <span class="text-3xl font-bold text-gray-900" data-metrica="em-analise">${emAnalise < 10 ? '0' + emAnalise : emAnalise}</span>
                            <i data-lucide="hourglass" class="w-4 h-4 text-blue-500 mb-2"></i>
                        </div>
                    </div>

                    <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eficiência</p>
                        <div class="flex items-center gap-3 mt-2">
                            <span class="text-3xl font-bold text-gray-900" data-metrica="eficiencia">${eficiencia}%</span>
                            <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full bg-brand-primary rounded-full" data-metrica="eficiencia-barra" style="width: ${eficiencia}%"></div>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-400 mt-1">Demandas concluídas sobre o total</p>
                    </div>
                </div>

                <!-- Barra de filtros -->
                <div class="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 flex flex-wrap gap-2 sm:gap-3 items-center mb-6 md:mb-8">
                    <div class="flex-1 min-w-[12rem] relative">
                        <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            id="filtroBusca"
                            placeholder="Pesquisar protocolo ou tipo..."
                            class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div class="relative">
                        <i data-lucide="filter" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        <select id="filtroStatus" class="pl-9 pr-8 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer max-w-[10rem] sm:max-w-none">
                            <option value="todos">Status: Todos</option>
                            <option value="pendente">Pendente</option>
                            <option value="em_analise">Em Análise</option>
                            <option value="requer_ajuste">Requer Ajuste</option>
                            <option value="concluido">Concluído</option>
                        </select>
                    </div>

                    <button id="limparFiltros" type="button" class="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline px-2 cursor-pointer" title="Limpar filtros">
                        <i data-lucide="x" class="w-4 h-4"></i>
                        <span class="hidden sm:inline">Limpar Filtros</span>
                    </button>
                </div>

                <!-- Demandas em aberto -->
                <section class="mb-10">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg md:text-xl font-bold text-gray-900">
                            Em Aberto
                            <span id="contadorAbertas" class="ml-2 text-xs font-bold text-gray-400 align-middle">0</span>
                        </h3>
                        <a href="#" class="text-xs font-semibold text-brand-primary hover:underline inline-flex items-center gap-1">
                            <span class="hidden sm:inline">Ver histórico completo</span>
                            <span class="sm:hidden">Histórico</span>
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>

                    <div id="listaDemandasAbertas" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    </div>
                </section>

                <!-- Histórico recente -->
                <section class="pb-24 sm:pb-0">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
                        <i data-lucide="history" class="w-5 h-5 text-gray-500"></i>
                        Histórico Recente
                    </h3>

                    <!-- Mobile: cards -->
                    <div id="listaHistoricoMobile" class="md:hidden space-y-3"></div>

                    <!-- Desktop: tabela -->
                    <div class="hidden md:block bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <th class="pb-2">Protocolo</th>
                                    <th class="pb-2">Assunto</th>
                                    <th class="pb-2">Status</th>
                                    <th class="pb-2">Última Modificação</th>
                                </tr>
                            </thead>
                            <tbody id="corpoHistorico"></tbody>
                        </table>
                    </div>
                </section>

            </div>

            <!-- FAB Nova Demanda (mobile) -->
            <button id="btnNovaDemandaMobile" type="button" class="sm:hidden fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-brand-primary text-white shadow-lg shadow-orange-900/20 flex items-center justify-center hover:bg-orange-700 transition-colors cursor-pointer" title="Nova Demanda">
                <i data-lucide="plus" class="w-6 h-6"></i>
            </button>

        </main>

    </div>
    `;
    processarIcones();
}
