import gato from "../components/assets/GATOGORDO.png";
import * as aux from "../lib/funcoesAuxiliares";

const aluno = JSON.parse(localStorage.getItem("usuarioLogado") || '{"nome":"Usuario"}');

const dashboardViews = {
	nome: `
		<div class="space-y-6">
			<section class="relative overflow-hidden bg-zinc-900 p-6 text-white">
				<div class="absolute inset-0 opacity-15">
					<img class="w-full h-full object-cover" data-alt="An abstract architectural composition of sharp angles and geometric planes in shades of deep charcoal and burnt orange. The image has a sophisticated, minimalist feel, representing the intersection of student progress and academic structure. High-contrast lighting creates strong shadows, reinforcing the geometric institutionalism brand identity of the Clarify platform." src="https://lh3.googleusercontent.com/aida/ADBb0ujSia4aBQLXG-iDCxNtnt-voKc0tRw5t7i4W1HWCnTaojCWcpeB9NtLb32npBd2nD3bGRRrA_rXE-koIkxkVicCaAQV-0dJmJGCNNXUgg58Hab_xfgty2yUY2F8jxKrOKTnub9NABjLE97Cn754GRPyzD5CB3AXGadtJdXOnWumA41elODuvAfKMNMbGoaHhZeyO46Zgtz_ojolL124-2l7Wk_iioeNE2b41S5j0mNWvnuP0lLWLNAwP5KHRdcTCjOmL6BVtAsc-OQ"/>
				</div>
				<div class="relative z-10 space-y-4">
					<span class="text-primary-fixed font-label-caps text-[10px] tracking-[0.2em] uppercase block">PORTAL DO ALUNO</span>
					<h1 class="font-h1 text-3xl lg:text-4xl font-semibold">Bem-vindo, ${aluno.nome}</h1>
					<p class="text-zinc-400 text-sm lg:text-base max-w-2xl">Acompanhe suas demandas, organize pendencias e visualize o progresso academico com clareza.</p>
				</div>
			</section>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-white border border-zinc-200 p-4 flex flex-col justify-between min-h-[140px]">
					<div class="flex justify-between items-start gap-4">
						<span class="material-symbols-outlined text-primary text-2xl" data-icon="school">school</span>
						<span class="text-[10px] font-bold text-zinc-400 uppercase">SEMESTRE ATUAL</span>
					</div>
					<div>
						<h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">CREDITOS CURSADOS</h3>
						<p class="text-3xl lg:text-4xl font-semibold text-zinc-900">24 <span class="text-base font-normal text-zinc-400">de 32</span></p>
					</div>
				</div>
				<div class="bg-white border border-zinc-200 p-4 flex flex-col justify-between min-h-[140px] border-l-4 border-warning">
					<div class="flex justify-between items-start gap-4">
						<span class="material-symbols-outlined text-warning text-2xl" data-icon="event_busy">event_busy</span>
						<span class="bg-warning text-white text-[10px] px-2 py-0.5 font-bold rounded">ATENCAO</span>
					</div>
					<div>
						<h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">PRAZOS PROXIMOS</h3>
						<p class="text-3xl lg:text-4xl font-semibold text-zinc-900">02 <span class="text-base font-normal text-warning">esta semana</span></p>
					</div>
				</div>
			</div>
			<div class="bg-white border border-zinc-200 overflow-hidden">
				<div class="bg-zinc-50 border-b border-zinc-200 px-4 py-3 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
					<h2 class="font-h3 text-base lg:text-lg flex items-center gap-2">
						<span class="material-symbols-outlined text-warning" data-icon="assignment_late">assignment_late</span>
						Prazos Prioritarios
					</h2>
					<button id="ver-todas" class="text-xs font-bold text-primary hover:underline">VER TODAS</button>
				</div>
				<div class="divide-y divide-zinc-100">
					<div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">DM</div>
							<div>
								<h4 class="font-h3 text-base text-zinc-900">Declaracao de Matricula</h4>
								<p class="text-sm text-zinc-500">Solicitacao em analise</p>
							</div>
						</div>
						<div class="flex items-center gap-4 lg:gap-8">
							<div class="text-right">
								<p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">STATUS</p>
								<p class="text-sm font-bold text-warning">Pendencia</p>
							</div>
							<span class="bg-warning-container text-on-warning-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Revisao</span>
							<button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</button>
						</div>
					</div>
					<div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">TM</div>
							<div>
								<h4 class="font-h3 text-base text-zinc-900">Trancamento de Matricula</h4>
								<p class="text-sm text-zinc-500">Enviar documento complementar</p>
							</div>
						</div>
						<div class="flex items-center gap-4 lg:gap-8">
							<div class="text-right">
								<p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
								<p class="text-sm font-bold text-warning">2 dias</p>
							</div>
							<span class="bg-warning-container text-on-warning-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Urgente</span>
							<button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</button>
						</div>
					</div>
					<div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">AS</div>
							<div>
								<h4 class="font-h3 text-base text-zinc-900">Atividades Complementares</h4>
								<p class="text-sm text-zinc-500">Atualizar comprovantes</p>
							</div>
						</div>
						<div class="flex items-center gap-4 lg:gap-8">
							<div class="text-right">
								<p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
								<p class="text-sm font-bold text-warning">5 dias</p>
							</div>
							<span class="bg-warning-container text-on-warning-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Revisao</span>
							<button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	solicitacoes: `
		<div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
			<h2 class="text-2xl font-semibold mb-4">Solicitacoes</h2>
			<p class="text-gray-600">Acompanhe o andamento das solicitacoes abertas e documentos enviados.</p>
		</div>
	`,
	historico: `
		<div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
			<h2 class="text-2xl font-semibold mb-4">Historico</h2>
			<p class="text-gray-600">Revise suas solicitacoes concluidas e registros anteriores.</p>
		</div>
	`,
	nova: `
		<div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
			<h2 class="text-2xl font-semibold mb-4">Nova solicitacao</h2>
			<p class="text-gray-600">Clique no botao para abrir o formulario de nova solicitacao.</p>
		</div>
	`,
};

export function renderDashboardView(view = "nome") {
	const container = document.querySelector("#dashboardContent");
	if (!container) return;
	container.innerHTML = dashboardViews[view] || dashboardViews.nome;
	setActiveDashboardTab(view);
}

export function setActiveDashboardTab(view) {
	const buttons = document.querySelectorAll("[data-view]");
	const vertodos = document.getElementById("ver-todas");
	if (vertodos) {
		vertodos.addEventListener("click", () => {
			renderDashboardView("solicitacoes");
			setActiveDashboardTab("solicitacoes");
		});
	}

	buttons.forEach((button) => {
		const isActive = button.dataset.view === view;
		button.classList.toggle("bg-brand-primary/10", isActive);
		button.classList.toggle("text-brand-primary", isActive);
		button.classList.toggle("bg-transparent", !isActive);
		button.classList.toggle("text-gray-700", !isActive);
	});
}

export function setupDashboardState() {
	renderDashboardView("nome");
	const buttons = document.querySelectorAll("[data-view]");
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const view = button.dataset.view;
			if (!view) return;

			renderDashboardView(view);
			const modal = document.getElementById("novaSolicitacao");
			if (view === "nova") {
				modal?.classList.remove("hidden");
			} else {
				modal?.classList.add("hidden");
			}
		});
	});
}

export function createRequestBtn() {
	const criarSolicitacaoBtns = document.querySelectorAll('[data-view="nova"]');
	if (!criarSolicitacaoBtns.length) return;

	criarSolicitacaoBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			document.getElementById("novaSolicitacao").classList.remove("hidden");
		});
	});
}

export function Carregardashboardaluno() {
	aux.adicionarCaminhoURL("dashboardaluno");
	document.querySelector("title").innerHTML = "Dashboard - Clarify";
	document.querySelector("#app").innerHTML = `
	<div class="min-h-screen w-full bg-pink-50 flex flex-col md:flex-row relative overflow-hidden">
		<div class="md:hidden bg-white border-b border-gray-200 p-4">
			<div class="flex flex items-center justify-center gap-2 mb-4">
				<img src="${gato}" alt="Clarify Logo" class="h-10 w-10 object-contain" />
				<h1 class="text-lg font-bold text-orange-600">Clarify</h1>
			</div>
			<div class="flex gap-2 overflow-x-auto justify-center">
				<button type="button" data-view="nome" aria-label="Inicio" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="M9 22V12h6v10"/><path d="M2 10l10-8 10 8"/><path d="M4 10v10h4"/><path d="M16 20h4V10"/></svg>
				</button>
				<button type="button" data-view="solicitacoes" aria-label="Solicitacoes" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list"><path d="M8 3h8v4H8z"/><path d="M6 7h12"/><path d="M6 11h12"/><path d="M6 15h8"/><path d="M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M5 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2"/></svg>
				</button>
				<button type="button" data-view="nova" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10" aria-label="Nova solicitacao">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
					</svg>
				</button>
				<button type="button" data-view="historico" aria-label="Historico" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history"><path d="M3 3v5h5"/><path d="M3.05 13a9 9 0 1 0 .5-4"/><path d="M12 7v5l4 2"/></svg>
				</button>
			</div>
		</div>
		<aside class="hidden md:block w-full md:w-72 bg-gray-50 shadow p-6 border border-gray-100">
			<div class="h-18 mb-3 rounded-xl p-3 flex items-center justify-center w-full gap-3">
				<img src="${gato}" alt="Clarify Logo" class="w-12 h-12 object-contain" />
				<h1 class="text-2xl font-bold text-orange-600">Clarify</h1>
			</div>
			<ul class="flex flex-col gap-3 mt-6">
				<li><button type="button" data-view="nome" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="M9 22V12h6v10"/><path d="M2 10l10-8 10 8"/><path d="M4 10v10h4"/><path d="M16 20h4V10"/></svg></span>Inicio</button></li>
				<li><button type="button" data-view="solicitacoes" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list"><path d="M8 3h8v4H8z"/><path d="M6 7h12"/><path d="M6 11h12"/><path d="M6 15h8"/><path d="M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M5 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2"/></svg></span>Solicitacoes</button></li>
				<li><button type="button" data-view="nova" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg></span>Nova solicitacao</button></li>
				<li><button type="button" data-view="historico" class="flex hover:cursor-pointer items-center gap-2 rounded-xl px-3 py-3 text-left w-full transition-colors bg-transparent text-gray-700"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history"><path d="M3 3v5h5"/><path d="M3.05 13a9 9 0 1 0 .5-4"/><path d="M12 7v5l4 2"/></svg></span>Historico</button></li>
			</ul>
		</aside>
		<main class="flex-1 p-6" id="dashboardContent">
			<div class="rounded-2xl border border-dashed border-gray-300 bg-white p-6 shadow-sm">
				<h2 class="text-2xl font-semibold mb-3">Visao Geral</h2>
				<p class="text-gray-600 text-sm">Escolha um item na barra lateral para carregar o conteudo aqui sem alterar a sidebar.</p>
			</div>
		</main>
	</div>

	<div class="hidden fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" id="novaSolicitacao">
		<div class="bg-white rounded-lg p-8 w-full max-w-md">
			<h2 class="text-2xl font-bold mb-6">Nova Solicitacao</h2>
			<form id="novaSolicitacaoForm" class="space-y-4">
				<div>
					<label for="tipo" class="block text-sm font-medium text-gray-700">Tipo de Solicitacao</label>
					<select id="tipo" name="tipo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
						<option value="declaracao">Declaracao</option>
						<option value="trancamento">Trancamento</option>
						<option value="aproveitamento">Aproveitamento</option>
					</select>
				</div>
				<div>
					<label for="descricao" class="block text-sm font-medium text-gray-700">Descricao</label>
					<textarea id="descricao" name="descricao" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"></textarea>
				</div>
				<div>
					<label for="arquivo" class="block text-sm font-medium text-gray-700">Anexo (opcional)</label>
					<input type="file" id="arquivo" name="arquivo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500" />
				</div>
				<div class="flex justify-end">
					<button type="button" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onclick="document.getElementById('novaSolicitacao').classList.add('hidden')">Cancelar</button>
					<button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Enviar</button>
				</div>
			</form>
		</div>
	</div>`;
}
