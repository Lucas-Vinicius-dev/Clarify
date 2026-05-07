export function renderChipUsuario(usuario, mostrarNome = true) {
    const nome = usuario?.nome || "Usuário";
    const primeiroNome = nome.split(" ")[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();

    return `
        <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-2 pr-1 py-1 shadow-sm">
            
            <!-- Avatar -->
            <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center">
                ${inicial}
            </div>

            <!-- Nome -->
            ${mostrarNome ? `
                <span class="text-sm font-medium text-gray-700 hidden lg:inline">
                    ${nome}
                </span>
            ` : ''}

            <!-- Botão sair -->
            <button 
                type="button"
                title="Sair da conta"
                class="btnSairConta w-8 h-8 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
            >
                <i data-lucide="log-out" class="w-4 h-4"></i>
            </button>

        </div>
    `;
}