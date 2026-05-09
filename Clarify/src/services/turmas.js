
function gerarIdTurma() {
    return 'turma_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function salvarTurma(turma) {
    const turmas = JSON.parse(localStorage.getItem('turmas') || '[]');
    turmas.push(turma);
    localStorage.setItem('turmas', JSON.stringify(turmas));
}

function renderizarTurmas() {
    const turmas = JSON.parse(localStorage.getItem('turmas') || '[]');
    const coordLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    const container = document.querySelector('#turmasContainer');
    if (!container) return;

    // filtra só as turmas do coordenador logado
    const turmasDoCoord = turmas.filter(t => t.coordenador === String(coordLogado.matricula));

    if (turmasDoCoord.length === 0) {
        container.innerHTML = `
            <p class="col-span-full text-center text-gray-400 py-8 text-sm">
                Nenhuma turma criada ainda.
            </p>`;
        return;
    }

    container.innerHTML = '';
    turmasDoCoord.forEach((turma) => {
        const card = document.createElement('div');
        card.classList.add(
            'bg-white', 'border', 'border-gray-200', 'rounded-2xl',
            'p-5', 'shadow-lg', 'hover:-translate-y-1',
            'transition-transform', 'duration-200', 'ease-out'
        );
        card.innerHTML = `
            <div class="flex items-start justify-between gap-4 mb-4">
                <div class="space-y-1">
                    <h3 class="text-lg font-semibold text-zinc-900">${turma.nome}</h3>
                    <p class="text-sm text-zinc-500">${turma.disciplina}</p>
                </div>
                <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-700">
                    ${turma.alunos.length} aluno${turma.alunos.length !== 1 ? 's' : ''}
                </span>
            </div>
            <div class="text-sm text-zinc-500">
                <span class="font-semibold text-zinc-700">ID:</span> ${turma.id}
            </div>
        `;
        container.appendChild(card);
    });
}

function abrirModalCriarTurma() {
    if (document.getElementById('modalCriarTurma')) return; // evita duplicata

    const alunosAdicionados = [];

    const overlay = document.createElement('div');
    overlay.id = 'modalCriarTurma';
    overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';

    overlay.innerHTML = `
        <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button id="fecharModalTurma"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
            </button>

            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="text-orange-600">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-zinc-900">Nova turma</h2>
                    <p class="text-xs text-zinc-500">Preencha os dados e adicione alunos</p>
                </div>
            </div>

            <form id="formCriarTurma" class="space-y-4">
                <div>
                    <label for="turmaNome" class="block text-sm font-medium text-gray-700 mb-1">Nome da turma</label>
                    <input type="text" id="turmaNome" required placeholder="Ex: Engenharia de Software — 2025.1"
                        class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"/>
                </div>

                <div>
                    <label for="turmaDisciplina" class="block text-sm font-medium text-gray-700 mb-1">Disciplina</label>
                    <input type="text" id="turmaDisciplina" required placeholder="Ex: Cálculo I"
                        class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"/>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Adicionar aluno por matrícula</label>
                    <div class="flex gap-2">
                        <input type="text" id="turmaAlunoMatricula" placeholder="Ex: 202100452"
                            class="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"/>
                        <button type="button" id="btnAdicionarAluno"
                            class="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                            </svg>
                            Adicionar
                        </button>
                    </div>
                </div>

                <div class="border border-gray-200 rounded-xl p-3 min-h-[64px]">
                    <p class="text-xs text-gray-400 mb-2">Alunos adicionados</p>
                    <div id="turmaAlunosChips" class="flex flex-wrap gap-2"></div>
                </div>

                <div class="flex justify-end gap-2 pt-2">
                    <button type="button" id="cancelarModalTurma"
                        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors cursor-pointer flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                            <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                        </svg>
                        Criar turma
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);

    // ── Fechar modal ──
    const fechar = () => overlay.remove();
    document.getElementById('fecharModalTurma').onclick = fechar;
    document.getElementById('cancelarModalTurma').onclick = fechar;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });

    // ── Adicionar chip de aluno ──
    function adicionarChip(matricula) {
        matricula = matricula.trim();
        if (!matricula || alunosAdicionados.includes(matricula)) return;
        alunosAdicionados.push(matricula);

        const chip = document.createElement('span');
        chip.className = 'flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full px-3 py-1';
        chip.innerHTML = `
            ${matricula}
            <button type="button" data-matricula="${matricula}"
                class="ml-0.5 text-orange-400 hover:text-orange-700 cursor-pointer leading-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
            </button>
        `;
        chip.querySelector('button').onclick = () => {
            const idx = alunosAdicionados.indexOf(matricula);
            if (idx > -1) alunosAdicionados.splice(idx, 1);
            chip.remove();
        };
        document.getElementById('turmaAlunosChips').appendChild(chip);
        document.getElementById('turmaAlunoMatricula').value = '';
    }

    document.getElementById('btnAdicionarAluno').onclick = () => {
        const val = document.getElementById('turmaAlunoMatricula').value;
        adicionarChip(val);
    };

    document.getElementById('turmaAlunoMatricula').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            adicionarChip(e.target.value);
        }
    });

    // ── Submeter formulário ──
    document.getElementById('formCriarTurma').onsubmit = (e) => {
        e.preventDefault();
        const coordLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
        const turma = {
            id: gerarIdTurma(),
            nome: document.getElementById('turmaNome').value.trim(),
            disciplina: document.getElementById('turmaDisciplina').value.trim(),
            alunos: [...alunosAdicionados],
            coordenador: String(coordLogado.matricula),
            criadaEm: new Date().toISOString(),
        };
        salvarTurma(turma);
        fechar();
        renderizarTurmas();   // atualiza os cards na tela imediatamente
        alert(`Turma "${turma.nome}" criada com sucesso!`);
    };
}

export function ativarListenerTurmas() {
    // delegação de evento: funciona mesmo se o botão for re-renderizado
    document.addEventListener('click', (e) => {
        if (e.target.closest('#btnCriarTurma')) {
            abrirModalCriarTurma();
        }
    });
}