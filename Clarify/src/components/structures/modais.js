import * as aux from '../../lib/funcoesAuxiliares.js';
import { processarIcones } from '../assets/icons.js';

// Modais usados na Central de Demandas (criação e visualização detalhada).
// A função montarModal cuida da parte chata (backdrop, ESC, scroll lock)
// pra cada modal só precisar montar o HTML interno dele.

const ROTULOS_STATUS = {
    pendente: 'Pendente',
    em_analise: 'Em Análise',
    requer_ajuste: 'Requer Ajuste',
    concluido: 'Concluído'
};

const LIMITE_DESCRICAO = 500;

let listenerEsc = null;

// Fecha a modal aberta com uma animação de saída curtinha.
export function fecharModal() {
    const container = document.querySelector('#modalContainer');
    if (!container || !container.firstElementChild) return;

    const backdrop = container.firstElementChild;
    const panel = backdrop.querySelector('.modal-panel');
    backdrop.classList.add('is-closing');
    if (panel) panel.classList.add('is-closing');

    if (listenerEsc) {
        document.removeEventListener('keydown', listenerEsc);
        listenerEsc = null;
    }

    setTimeout(() => {
        container.innerHTML = '';
        document.body.classList.remove('modal-open');
    }, 170);
}

// Cria o backdrop + o painel vazio dentro do body e devolve o painel pra quem chamou preencher.
function montarModal(larguraMax) {
    let container = document.querySelector('#modalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'modalContainer';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div class="modal-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div class="modal-panel relative w-full ${larguraMax} bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"></div>
        </div>
    `;

    document.body.classList.add('modal-open');

    const backdrop = container.firstElementChild;
    const panel = backdrop.querySelector('.modal-panel');

    backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) fecharModal();
    });

    listenerEsc = (event) => {
        if (event.key === 'Escape') fecharModal();
    };
    document.addEventListener('keydown', listenerEsc);

    return panel;
}

// ---- Nova Demanda ---------------------------------------------------------

function templateNovaDemanda(usuario) {
    const primeiroNome = (usuario.nome || 'Você').split(' ')[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();

    return `
        <form id="formNovaDemanda" class="flex flex-col modal-scroll">
            <div class="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6">
                <div class="inline-flex items-center gap-2">
                    <span class="modal-eyebrow-dot"></span>
                    <span class="modal-label">Nova solicitação</span>
                </div>
                <button type="button" class="modal-close" data-acao="fechar" title="Fechar">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="px-5 sm:px-7 pt-4 sm:pt-5 pb-2 modal-stagger">

                <header>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight">
                        Conte para a coordenação<br/>
                        <span class="text-gradient-warm">o que precisa ser resolvido.</span>
                    </h2>
                    <p class="text-sm text-gray-500 mt-2 max-w-md">
                        Quanto mais claro o pedido, mais rápido a análise. Inclua disciplina, datas e qualquer contexto relevante.
                    </p>
                </header>

                <section class="mt-5">
                    <label for="campoTituloDemanda" class="modal-label">Título</label>
                    <input
                        id="campoTituloDemanda"
                        name="titulo"
                        type="text"
                        autocomplete="off"
                        maxlength="80"
                        placeholder="Ex.: Justificativa de falta — Cálculo III"
                        class="modal-input font-semibold mt-1"
                    />
                </section>

                <section class="mt-5">
                    <div class="flex items-end justify-between gap-3">
                        <label for="campoDescricaoDemanda" class="modal-label">Descrição</label>
                        <span id="contadorDescricao" class="modal-counter">0 / ${LIMITE_DESCRICAO}</span>
                    </div>
                    <textarea
                        id="campoDescricaoDemanda"
                        name="descricao"
                        rows="5"
                        maxlength="${LIMITE_DESCRICAO}"
                        placeholder="Descreva a situação, os documentos anexos (se houver) e o que você espera como resolução."
                        class="modal-textarea mt-2"
                    ></textarea>
                </section>

                <section class="mt-5 flex items-center gap-3 bg-brand-surface rounded-2xl px-3.5 py-2.5 border border-gray-100">
                    <div class="w-8 h-8 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                        ${inicial}
                    </div>
                    <div class="min-w-0">
                        <p class="modal-label leading-none">Enviando como</p>
                        <p class="text-sm font-semibold text-gray-900 mt-1 truncate">
                            ${usuario.nome || 'Aluno'} · Matrícula ${usuario.matricula || '—'}
                        </p>
                    </div>
                </section>

                <div id="erroNovaDemanda" hidden class="mt-4 items-start gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    <i data-lucide="alert-circle" class="w-4 h-4 mt-px"></i>
                    <span></span>
                </div>
            </div>

            <footer class="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40">
                <button type="button" class="modal-btn-ghost" data-acao="fechar">
                    Cancelar
                </button>
                <button type="submit" id="btnEnviarDemanda" class="modal-btn-primary" disabled>
                    Enviar solicitação
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
            </footer>
        </form>
    `;
}

// Abre o formulário de nova demanda. Quando o aluno envia com sucesso, chama onCriado(demanda)
// pra quem chamou poder rerenderizar a lista de demandas.
export function abrirModalNovaDemanda({ onCriado } = {}) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado')) || {};
    const panel = montarModal('max-w-lg');
    panel.innerHTML = templateNovaDemanda(usuario);
    processarIcones();

    const form = panel.querySelector('#formNovaDemanda');
    const inputTitulo = panel.querySelector('#campoTituloDemanda');
    const inputDescricao = panel.querySelector('#campoDescricaoDemanda');
    const contador = panel.querySelector('#contadorDescricao');
    const botaoEnviar = panel.querySelector('#btnEnviarDemanda');
    const erroBox = panel.querySelector('#erroNovaDemanda');

    setTimeout(() => inputTitulo.focus(), 100);

    function atualizarEstadoBotao() {
        const valido = inputTitulo.value.trim().length >= 4 && inputDescricao.value.trim().length >= 10;
        botaoEnviar.disabled = !valido;
    }

    function atualizarContador() {
        const atual = inputDescricao.value.length;
        contador.textContent = `${atual} / ${LIMITE_DESCRICAO}`;
        contador.classList.toggle('is-near', atual >= LIMITE_DESCRICAO * 0.85 && atual < LIMITE_DESCRICAO);
        contador.classList.toggle('is-over', atual >= LIMITE_DESCRICAO);
    }

    inputTitulo.addEventListener('input', atualizarEstadoBotao);
    inputDescricao.addEventListener('input', () => {
        atualizarContador();
        atualizarEstadoBotao();
    });

    panel.querySelectorAll('[data-acao="fechar"]').forEach((botao) => {
        botao.addEventListener('click', fecharModal);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const titulo = inputTitulo.value.trim();
        const descricao = inputDescricao.value.trim();

        if (titulo.length < 4 || descricao.length < 10) {
            erroBox.removeAttribute('hidden');
            erroBox.classList.add('inline-flex');
            erroBox.querySelector('span').textContent = 'Preencha um título com pelo menos 4 caracteres e uma descrição com pelo menos 10.';
            return;
        }

        if (!usuario.matricula) {
            erroBox.removeAttribute('hidden');
            erroBox.classList.add('inline-flex');
            erroBox.querySelector('span').textContent = 'Sessão expirada. Faça login novamente para enviar a solicitação.';
            return;
        }

        const demandaCriada = aux.criarDemanda({
            matriculaAluno: usuario.matricula,
            tipo: titulo,
            descricao
        });

        fecharModal();
        if (onCriado) onCriado(demandaCriada);
    });
}

// ---- Detalhes da Demanda --------------------------------------------------

function classesDoStatus(status) {
    switch (status) {
        case 'pendente': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'em_analise': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'requer_ajuste': return 'bg-rose-100 text-rose-800 border-rose-200';
        case 'concluido': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
}

function diasDesde(dataISO) {
    if (!dataISO) return null;
    const [ano, mes, dia] = dataISO.split('-').map(Number);
    const inicio = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    const diffMs = hoje.setHours(0,0,0,0) - inicio.setHours(0,0,0,0);
    return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
}

// Renderiza os 4 pontinhos do progresso da demanda, marcando o atual e os já passados.
function montarTimeline(status) {
    const passos = [
        { chave: 'pendente', rotulo: 'Recebida' },
        { chave: 'em_analise', rotulo: 'Em análise' },
        { chave: 'requer_ajuste', rotulo: 'Resolução' },
        { chave: 'concluido', rotulo: 'Concluída' }
    ];

    let indiceAtual = 0;
    if (status === 'em_analise') indiceAtual = 1;
    else if (status === 'requer_ajuste') indiceAtual = 2;
    else if (status === 'concluido') indiceAtual = 3;

    let html = '';
    for (let i = 0; i < passos.length; ++i) {
        let classe = '';
        let conteudoDot = '';
        if (i < indiceAtual) {
            classe = 'is-done';
            conteudoDot = `<i data-lucide="check" class="w-3.5 h-3.5 text-white"></i>`;
        } else if (i === indiceAtual) {
            classe = 'is-current';
        }

        html += `
            <div class="modal-timeline-step ${classe}">
                <div class="modal-timeline-dot">${conteudoDot}</div>
                <p class="modal-timeline-label">${passos[i].rotulo}</p>
            </div>
        `;
    }
    return html;
}

function templateDetalhes(demanda, remetente) {
    const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
    const dias = diasDesde(demanda.dataCriacao);
    const nomeRemetente = (remetente && remetente.nome) || `Matrícula ${demanda.matriculaAluno}`;
    const inicialRemetente = nomeRemetente.charAt(0).toUpperCase();
    const emailRemetente = (remetente && remetente.email) || '—';

    return `
        <article class="flex flex-col modal-scroll">
            <div class="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6">
                <div class="inline-flex items-center gap-2">
                    <span class="modal-eyebrow-dot"></span>
                    <span class="modal-label">Solicitação · #${demanda.protocolo}</span>
                </div>
                <button type="button" class="modal-close" data-acao="fechar" title="Fechar">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="px-5 sm:px-7 pt-4 sm:pt-5 pb-2 modal-stagger">

                <header class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div class="min-w-0 flex-1">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight break-words [overflow-wrap:anywhere]">
                            ${demanda.tipo}
                        </h2>
                        <p class="text-sm text-gray-500 mt-1.5">
                            Aberta em <span class="font-semibold text-gray-700">${aux.formatarData(demanda.dataCriacao)}</span>
                            ${dias !== null ? ` · há ${dias} dias` : ''}
                        </p>
                    </div>
                    <span class="self-start inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border whitespace-nowrap ${classesDoStatus(demanda.status)}">
                        <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
                        ${rotulo}
                    </span>
                </header>

                <section class="mt-6 bg-gradient-to-br from-white to-brand-surface/50 rounded-2xl border border-gray-100 px-3 sm:px-6 py-4">
                    <div class="flex items-start gap-0">
                        ${montarTimeline(demanda.status)}
                    </div>
                </section>

                <section class="mt-6">
                    <div class="flex items-center gap-2 mb-3">
                        <i data-lucide="file-text" class="w-3.5 h-3.5 text-brand-primary"></i>
                        <p class="modal-label">Detalhes da solicitação</p>
                    </div>
                    <div class="bg-brand-surface/50 border border-brand-surface-dim/40 rounded-2xl px-5 py-4">
                        <p class="text-[0.95rem] sm:text-base text-gray-800 leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap">${demanda.descricao}</p>
                    </div>
                </section>

                <section class="mt-6">
                    <p class="modal-label">Enviado por</p>
                    <div class="mt-3 flex items-center gap-3 bg-brand-surface/60 rounded-2xl px-4 py-3 border border-gray-100">
                        <div class="w-11 h-11 rounded-full bg-brand-primary text-white text-base font-bold flex items-center justify-center shrink-0 shadow-soft-md">
                            ${inicialRemetente}
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-semibold text-gray-900 truncate">${nomeRemetente}</p>
                            <p class="text-xs text-gray-500 truncate inline-flex items-center gap-1.5">
                                <i data-lucide="hash" class="w-3 h-3"></i>
                                ${demanda.matriculaAluno}
                                <span class="opacity-30">·</span>
                                <i data-lucide="mail" class="w-3 h-3"></i>
                                <span class="truncate">${emailRemetente}</span>
                            </p>
                        </div>
                    </div>
                </section>

                <section class="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="bg-white rounded-2xl border border-gray-100 px-4 py-3">
                        <p class="modal-label">Criada em</p>
                        <p class="text-sm font-semibold text-gray-900 mt-1 inline-flex items-center gap-1.5">
                            <i data-lucide="calendar" class="w-3.5 h-3.5 text-gray-400"></i>
                            ${aux.formatarData(demanda.dataCriacao)}
                        </p>
                    </div>
                    <div class="bg-white rounded-2xl border border-gray-100 px-4 py-3">
                        <p class="modal-label">Status</p>
                        <p class="text-sm font-semibold text-gray-900 mt-1 inline-flex items-center gap-1.5">
                            <i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i>
                            ${rotulo}
                        </p>
                    </div>
                </section>

                ${demanda.feedback ? `
                <section class="mt-6">
                    <p class="modal-label inline-flex items-center gap-1.5">
                        <i data-lucide="message-square-quote" class="w-3.5 h-3.5"></i>
                        Observação da coordenação
                    </p>
                    <div class="mt-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-sm text-amber-900 leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap">${demanda.feedback}</div>
                </section>
                ` : ''}

            </div>

            <footer class="flex items-center justify-end gap-3 px-5 sm:px-7 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40">
                <button type="button" class="modal-btn-ghost" data-acao="fechar">
                    Fechar
                </button>
            </footer>
        </article>
    `;
}

// Abre o modal de detalhes da demanda. Recebe só o protocolo e busca o resto no localStorage.
export function abrirModalDetalhesDemanda(protocolo) {
    const demanda = aux.buscarDemandaPorProtocolo(protocolo);
    if (!demanda) return;

    const remetente = aux.acharUsuario(demanda.matriculaAluno);

    const panel = montarModal('max-w-xl');
    panel.innerHTML = templateDetalhes(demanda, remetente);
    processarIcones();

    panel.querySelectorAll('[data-acao="fechar"]').forEach((botao) => {
        botao.addEventListener('click', fecharModal);
    });
}
