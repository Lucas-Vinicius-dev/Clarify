import * as aux from '../lib/funcoesAuxiliares.js';
import { processarIcones } from '../components/assets/icons';
import { renderCardNovaDemanda  } from '../pages/centralDemandas.js';

export const filtros = {
    busca: '',
    status: 'todos'
}
export const ROTULOS_STATUS = {
    pendente: 'Pendente',
    em_analise: 'Em Análise',
    requer_ajuste: 'Requer Ajuste',
    concluido: 'Concluído'
}


export function classesDoStatus(status) {
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

export function aplicarFiltros(demandas) {
    return demandas.filter((demanda) => {
        const casaStatus = filtros.status === 'todos' || demanda.status === filtros.status;

        const termo = filtros.busca.trim().toLowerCase();
        const casaBusca = termo === ''
            || demanda.protocolo.toLowerCase().includes(termo)
            || demanda.tipo.toLowerCase().includes(termo);

        return casaStatus && casaBusca;
    });
}

export function renderCardDemanda(demanda) {
    const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
    return `
        <article class="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold text-gray-500 tracking-wider">#${demanda.protocolo}</span>
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${classesDoStatus(demanda.status)}">
                    ${rotulo}
                </span>
            </div>

            <div class="min-w-0">
                <h3 class="text-base font-bold text-gray-900 break-words [overflow-wrap:anywhere]">${demanda.tipo}</h3>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2 break-words [overflow-wrap:anywhere]">${demanda.descricao}</p>
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

            <button type="button" data-acao="ver-detalhes" data-protocolo="${demanda.protocolo}" class="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-primary uppercase tracking-widest hover:underline self-start cursor-pointer">
                Ver Detalhes
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
        </article>
    `;
}

export function renderLinhaHistorico(demanda) {
    const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
    return `
        <tr class="border-t border-gray-100">
            <td class="py-3 text-xs font-semibold text-gray-500">#${demanda.protocolo}</td>
            <td class="py-3 text-sm text-gray-900 break-words [overflow-wrap:anywhere]">${demanda.tipo}</td>
            <td class="py-3">
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${classesDoStatus(demanda.status)}">
                    ${rotulo}
                </span>
            </td>
            <td class="py-3 text-xs text-gray-500">${aux.formatarData(demanda.dataAtualizacao)}</td>
        </tr>
    `;
}

export function renderCardHistorico(demanda) {
    const rotulo = ROTULOS_STATUS[demanda.status] || demanda.status;
    return `
        <article class="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold text-gray-500 tracking-wider">#${demanda.protocolo}</span>
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${classesDoStatus(demanda.status)}">
                    ${rotulo}
                </span>
            </div>
            <h4 class="text-sm font-bold text-gray-900 break-words [overflow-wrap:anywhere]">${demanda.tipo}</h4>
            <span class="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                Concluído em ${aux.formatarData(demanda.dataAtualizacao)}
            </span>
        </article>
    `;
}

export function renderListaDemandas(demandas) {
    const filtradas = aplicarFiltros(demandas);

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

export function obterDemandas() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    return aux.buscarDemandasPorAluno(usuarioLogado.matricula);
}
