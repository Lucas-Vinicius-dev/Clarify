import * as aux from '../lib/funcoesAuxiliares.js'
import { iconesUsados, processarIcones } from '../components/assets/icons.js';
import { carregarLogin, ativarListenerLogin } from './login.js'
import { renderChipUsuario } from '../components/structures/topbar.js';
import { renderSidebarAlunos } from '../components/structures/sidebar.js';
import gato from '../components/assets/GATOGORDO.png';

// Estado dos filtros aplicados no board.
const filtros = {
    busca: '',
    status: 'todos'
}

// Mapeia a chave técnica do status para o rótulo exibido na tela.
const ROTULOS_STATUS = {
    pendente: 'Pendente',
    em_analise: 'Em Análise',
    requer_ajuste: 'Requer Ajuste',
    concluido: 'Concluído'
}

// Retorna as classes Tailwind do badge de cada status.
function classesDoStatus(status) {
    switch (status) {
        case 'pendente':
            return 'bg-amber-100 text-amber-800 border border-amber-200';
        case 'em_analise':
            return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'requer_ajuste':
            return 'bg-rose-100 text-rose-800 border border-rose-200';
        case 'concluido':
            return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        default:
            return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}

// Aplica os filtros de busca e status sobre a lista de demandas do aluno.
function aplicarFiltros(demandas) {
    return demandas.filter((demanda) => {
        const casaStatus = filtros.status === 'todos' || demanda.status === filtros.status;

        const termo = filtros.busca.trim().toLowerCase();
        const casaBusca = termo === ''
            || demanda.protocolo.toLowerCase().includes(termo)
            || demanda.tipo.toLowerCase().includes(termo);

        return casaStatus && casaBusca;
    });
}

// Renderiza um card de demanda em aberto (status diferente de "concluido").
function renderCardDemanda(demanda) {
    const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
    return `
        <article class="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold text-gray-500 tracking-wider">#${demanda.protocolo}</span>
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${classesDoStatus(demanda.status)}">
                    ${rotulo}
                </span>
            </div>

            <div>
                <h3 class="text-base font-bold text-gray-900">${demanda.tipo}</h3>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2">${demanda.descricao}</p>
            </div>

            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span class="inline-flex items-center gap-1.5">
                    <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                    ${aux.formatarData(demanda.dataCriacao)}
                </span>
                <span class="inline-flex items-center gap-1.5">
                    <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                    ${aux.formatarData(demanda.dataAtualizacao)}
                </span>
            </div>

            ${demanda.feedback ? `
                <div class="text-xs bg-gray-50 border border-gray-100 rounded-md p-2 text-gray-700">
                    <strong class="text-gray-900">Observação:</strong> ${demanda.feedback}
                </div>
            ` : ''}

            <button type="button" class="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-primary uppercase tracking-widest hover:underline self-start cursor-pointer">
                Ver Detalhes
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
        </article>
    `;
}

// Card "vazio" que convida o aluno a abrir uma nova demanda.
function renderCardNovaDemanda() {
    return `
        <button type="button" class="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-primary hover:text-brand-primary hover:bg-white transition-colors min-h-[180px] cursor-pointer">
            <span class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <i data-lucide="plus" class="w-5 h-5"></i>
            </span>
            <span class="text-sm font-bold">Nova Solicitação</span>
            <span class="text-xs">Abra uma nova demanda acadêmica</span>
        </button>
    `;
}

// Linha do histórico para a tabela (md+).
function renderLinhaHistorico(demanda) {
    const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
    return `
        <tr class="border-t border-gray-100">
            <td class="py-3 text-xs font-semibold text-gray-500">#${demanda.protocolo}</td>
            <td class="py-3 text-sm text-gray-900">${demanda.tipo}</td>
            <td class="py-3">
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${classesDoStatus(demanda.status)}">
                    ${rotulo}
                </span>
            </td>
            <td class="py-3 text-xs text-gray-500">${aux.formatarData(demanda.dataAtualizacao)}</td>
        </tr>
    `;
}

// Card compacto do histórico para o mobile (substitui a tabela em telas pequenas).
function renderCardHistorico(demanda) {
    const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
    return `
        <article class="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold text-gray-500 tracking-wider">#${demanda.protocolo}</span>
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${classesDoStatus(demanda.status)}">
                    ${rotulo}
                </span>
            </div>
            <h4 class="text-sm font-bold text-gray-900">${demanda.tipo}</h4>
            <span class="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                Concluído em ${aux.formatarData(demanda.dataAtualizacao)}
            </span>
        </article>
    `;
}

// Mostra mensagem amigável quando o aluno ainda não tem nenhuma demanda.
function renderEstadoVazio() {
    return `
        <div class="col-span-full bg-white border border-dashed border-gray-300 rounded-xl p-8 sm:p-10 text-center">
            <h3 class="text-base font-bold text-gray-900">Você ainda não possui solicitações</h3>
            <p class="text-sm text-gray-500 mt-1">
                Quando você abrir uma demanda, ela aparecerá aqui para acompanhamento.
            </p>
        </div>
    `;
}

// Atualiza a lista de cards e o histórico.
function renderListaDemandas(demandasDoAluno) {
    const filtradas = aplicarFiltros(demandasDoAluno);

    const emAberto = filtradas.filter((d) => d.status !== 'concluido');
    const concluidas = filtradas.filter((d) => d.status === 'concluido');

    const containerCards = document.querySelector('#listaDemandasAbertas');
    const containerTabelaHistorico = document.querySelector('#corpoHistorico');
    const containerCardsHistorico = document.querySelector('#listaHistoricoMobile');
    const contador = document.querySelector('#contadorAbertas');

    if (contador) {
        contador.textContent = emAberto.length;
    }

    if (containerCards) {
        const cards = emAberto.map(renderCardDemanda).join('');
        containerCards.innerHTML = emAberto.length > 0
            ? cards + renderCardNovaDemanda()
            : renderEstadoVazio();
    }

    if (containerTabelaHistorico) {
        containerTabelaHistorico.innerHTML = concluidas.length > 0
            ? concluidas.map(renderLinhaHistorico).join('')
            : `<tr><td colspan="4" class="py-4 text-center text-xs text-gray-400">Nenhuma demanda concluída ainda.</td></tr>`;
    }

    if (containerCardsHistorico) {
        containerCardsHistorico.innerHTML = concluidas.length > 0
            ? concluidas.map(renderCardHistorico).join('')
            : `<div class="bg-white border border-dashed border-gray-200 rounded-xl p-6 text-center text-xs text-gray-400">Nenhuma demanda concluída ainda.</div>`;
    }

    processarIcones();
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

    renderAlunoView('inicio');
    setActiveSidebarTab('inicio');

    const sidebarButtons = document.querySelectorAll('[data-view]');
    sidebarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            renderAlunoView(btn.dataset.view);
            setActiveSidebarTab(btn.dataset.view);
        });
    });

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
        <button type="button" data-view="inicio" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
            <i data-lucide="home" class="w-4 h-4"></i> Início
        </button>
        <button type="button" data-view="demandas" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
            <i data-lucide="clipboard-list" class="w-4 h-4"></i> Central de Demandas
        </button>
        <a href="#" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-left transition-colors">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Nova Demanda
        </a>
        <button type="button" data-view="turmas" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M12 22s8-4 8-10V5l-8 3-8-3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span class="font-medium">Turmas</span>
                </button>   
    `;
}

function renderInicioView(demandasDoAluno, primeiroNome, metricas) {
    const efficiency = metricas.eficiencia;
    const demandasRecentes = demandasDoAluno.slice().sort((a, b) => new Date(b.dataAtualizacao) - new Date(a.dataAtualizacao)).slice(0, 3);
    
    let recentesHtml = '';
    if (demandasRecentes.length === 0) {
        recentesHtml = `<div class="p-4 text-center text-sm text-zinc-500">Nenhuma demanda recente.</div>`;
    } else {
        recentesHtml = demandasRecentes.map(demanda => {
            const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
            return `
            <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gray-100 flex items-center justify-center text-brand-primary font-bold rounded">#${demanda.protocolo.substring(0, 4)}</div>
                    <div>
                        <h4 class="font-bold text-base text-zinc-900">${demanda.tipo}</h4>
                        <p class="text-sm text-zinc-500">Atualizado em: ${aux.formatarData(demanda.dataAtualizacao)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 lg:gap-8">
                    <span class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${classesDoStatus(demanda.status)}">${rotulo}</span>
                    <button type="button" data-view="demandas" class="text-zinc-400 hover:text-brand-primary transition-colors cursor-pointer"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
                </div>
            </div>`;
        }).join('');
    }

    return `
        <div class="space-y-6 max-w-6xl mx-auto">
            <section class="relative overflow-hidden bg-zinc-900 p-6 md:p-8 text-white rounded-2xl shadow-md">
                <div class="absolute inset-0 opacity-15">
                    <img class="w-full h-full object-cover" src="${gato}"/>
                </div>
                <div class="relative z-10 space-y-4">
                    <span class="text-orange-500 font-bold text-[10px] tracking-[0.2em] uppercase block">PORTAL DO ALUNO</span>
                    <h1 class="text-3xl lg:text-4xl font-semibold">Bem-vindo, ${primeiroNome}</h1>
                    <p class="text-zinc-400 text-sm lg:text-base max-w-2xl">Acompanhe suas solicitações acadêmicas e comunique-se com a coordenação de forma clara e ágil.</p>
                </div>
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <i data-lucide="bar-chart" class="w-6 h-6 text-brand-primary"></i>
                        <span class="text-[10px] font-bold text-gray-400 uppercase">Demandas Atendidas</span>
                    </div>
                    <div class="mt-4">
                        <div class="flex justify-between items-end mb-2">
                            <h3 class="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold">PROGRESSO</h3>
                            <span class="text-xl font-bold text-gray-900">${efficiency}%</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5">
                            <div class="bg-brand-primary h-2.5 rounded-full transition-all duration-500" style="width: ${efficiency}%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2 font-medium">${metricas.total > 0 ? metricas.concluidas + ' de ' + metricas.total + ' concluídas' : 'Sem demandas'}</p>
                    </div>
                </div>

                <div class="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <i data-lucide="message-circle" class="w-6 h-6 text-orange-500"></i>
                        <span class="bg-orange-100 text-orange-800 text-[10px] px-2 py-0.5 font-bold rounded uppercase">CONTATO</span>
                    </div>
                    <div class="mt-4">
                        <h3 class="text-gray-500 uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">SUPORTE</h3>
                        <p class="text-sm text-gray-700 mb-4 font-medium">Fale diretamente com o coordenador do seu curso.</p>
                        <a href="mailto:coordenacao@clarify.edu.br" class="inline-flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto">
                            <i data-lucide="mail" class="w-4 h-4"></i>
                            Enviar Mensagem
                        </a>
                    </div>
                </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div class="bg-gray-50 border-b border-gray-200 px-5 py-4 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <h2 class="font-bold text-base lg:text-lg flex items-center gap-2 text-gray-900">
                        <i data-lucide="clock" class="w-5 h-5 text-gray-500"></i>
                        Demandas Recentes
                    </h2>
                    <button type="button" data-view="demandas" class="text-xs font-bold text-brand-primary hover:underline cursor-pointer">VER TODAS</button>
                </div>
                <div class="divide-y divide-gray-100">
                    ${recentesHtml}
                </div>
            </div>
        </div>
    `;
}

function renderDemandasView(primeiroNome, total, emAnalise, eficiencia) {
    return `
        <div class="max-w-6xl mx-auto">
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

                <button type="button" class="hidden sm:inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-bold px-5 py-3 rounded-xl shadow hover:bg-orange-700 transition-colors cursor-pointer self-start sm:self-auto">
                    <i data-lucide="plus" class="w-4 h-4"></i> Nova Demanda
                </button>
            </div>

            <!-- Métricas -->
            <div class="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 md:mb-8 flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-2 sm:pb-0">
                <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total de Solicitações</p>
                    <div class="flex items-end gap-3 mt-2">
                        <span class="text-3xl font-bold text-gray-900">${total}</span>
                        <span class="text-xs text-gray-500 pb-1">no semestre</span>
                    </div>
                </div>

                <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Em Análise</p>
                    <div class="flex items-end gap-3 mt-2">
                        <span class="text-3xl font-bold text-gray-900">${emAnalise < 10 ? '0' + emAnalise : emAnalise}</span>
                        <i data-lucide="hourglass" class="w-4 h-4 text-blue-500 mb-2"></i>
                    </div>
                </div>

                <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eficiência</p>
                    <div class="flex items-center gap-3 mt-2">
                        <span class="text-3xl font-bold text-gray-900">${eficiencia}%</span>
                        <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-brand-primary rounded-full" style="width: ${eficiencia}%"></div>
                        </div>
                    </div>
                    <p class="text-[10px] text-gray-400 mt-1">Demandas concluídas sobre o total</p>
                </div>
            </div>

            <!-- Barra de filtros -->
            <div class="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 flex flex-wrap gap-2 sm:gap-3 items-center mb-6 md:mb-8 shadow-sm">
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
                <div class="hidden md:block bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto shadow-sm">
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
    `;
}

function setActiveSidebarTab(view) {
    const buttons = document.querySelectorAll('[data-view]');
    buttons.forEach((button) => {
        const isActive = button.dataset.view === view;
        if (isActive) {
            button.classList.add('bg-orange-50', 'text-orange-600');
            button.classList.remove('text-gray-700');
        } else {
            button.classList.remove('bg-orange-50', 'text-orange-600');
            button.classList.add('text-gray-700');
        }
    });
}

function renderAlunoView(view = 'inicio') {
    const container = document.querySelector('#alunoContent');
    if (!container) return;

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};
    const primeiroNome = (usuarioLogado.nome || 'Aluno').split(' ')[0];
    const demandasDoAluno = aux.buscarDemandasPorAluno(usuarioLogado.matricula);
    const metricas = calcularMetricas(demandasDoAluno);
    
    if (view === 'inicio') {
        container.innerHTML = renderInicioView(demandasDoAluno, primeiroNome, metricas);
    } else if (view === 'demandas') {
        container.innerHTML = renderDemandasView(primeiroNome, metricas.total, metricas.emAnalise, metricas.eficiencia);
        renderListaDemandas(demandasDoAluno);
        
        const filtroBusca = document.querySelector('#filtroBusca');
        if (filtroBusca) {
            filtroBusca.addEventListener('input', (e) => {
                filtros.busca = e.target.value;
                renderListaDemandas(demandasDoAluno);
            });
        }
        const filtroStatus = document.querySelector('#filtroStatus');
        if (filtroStatus) {
            filtroStatus.addEventListener('change', (e) => {
                filtros.status = e.target.value;
                renderListaDemandas(demandasDoAluno);
            });
        }
        const limparFiltros = document.querySelector('#limparFiltros');
        if (limparFiltros) {
            limparFiltros.addEventListener('click', () => {
                filtros.busca = '';
                filtros.status = 'todos';
                document.querySelector('#filtroBusca').value = '';
                document.querySelector('#filtroStatus').value = 'todos';
                renderListaDemandas(demandasDoAluno);
            });
        }
    }
    
    const navButtons = container.querySelectorAll('[data-view]');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            renderAlunoView(btn.dataset.view);
            setActiveSidebarTab(btn.dataset.view);
        });
    });

    processarIcones();
}

export function carregarCentralDemandas() {
    aux.adicionarCaminhoURL("centraldemandas");
    document.querySelector("title").innerHTML = `Central de Demandas - Clarify`;

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

    document.querySelector('#app').innerHTML = `
    <div class="min-h-screen w-full flex bg-brand-surface">

        <!-- Sidebar (desktop) -->
        ${renderSidebarAlunos()}
        
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
        <main class="flex-1 overflow-x-hidden flex flex-col h-screen">

            <!-- Topbar mobile (sticky) -->
            <header class="md:hidden shrink-0 sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between gap-3 px-4 h-14">
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

            <div class="px-4 py-5 md:px-10 md:py-8 flex-1 overflow-y-auto w-full">

                <!-- Topbar desktop -->
                <div class="hidden md:flex items-center justify-end gap-3 mb-8">
                    <button type="button" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
                        <i data-lucide="bell" class="w-4 h-4"></i>
                    </button>
                    <button type="button" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
                        <i data-lucide="help-circle" class="w-4 h-4"></i>
                    </button>
                    ${renderChipUsuario(JSON.parse(localStorage.getItem('usuarioLogado')))}
                </div>

                <div id="alunoContent"></div>
            </div>

            <!-- FAB Nova Demanda (mobile) -->
            <button type="button" class="sm:hidden fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-brand-primary text-white shadow-lg shadow-orange-900/20 flex items-center justify-center hover:bg-orange-700 transition-colors cursor-pointer" title="Nova Demanda">
                <i data-lucide="plus" class="w-6 h-6"></i>
            </button>

        </main>

    </div>
    `;
}
