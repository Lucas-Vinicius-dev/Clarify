import gato from '../assets/GATOGORDO.png'

export function renderSidebarCoord() {
    return `
        <!-- Sidebar desktop -->
        <aside class="hidden md:flex md:flex-col w-64 bg-gray-50 shadow border-r border-gray-200 p-5 shrink-0">

            <!-- Logo -->
            <div class="mb-6 flex items-center gap-3 px-2">
                <img 
                    src="${gato}" 
                    alt="Clarify Logo" 
                    class="w-11 h-11 object-contain"
                />

                <h1 class="text-2xl font-bold text-orange-600">
                    Clarify
                </h1>
            </div>

            <!-- Navegação -->
            <nav class="flex flex-col gap-2 flex-1">

                <button 
                    type="button" 
                    data-view="nome"
                    class="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>

                    <span class="font-medium">
                        Início
                    </span>
                </button>

                <button 
                    type="button" 
                    data-view="alunos"
                    class="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>

                    <span class="font-medium">
                        Alunos
                    </span>
                </button>

                <button 
                    type="button" 
                    data-view="adicionar"
                    class="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v8"/>
                        <path d="M8 12h8"/>
                    </svg>

                    <span class="font-medium">
                        Adicionar aluno
                    </span>
                </button>

                <button 
                    type="button" 
                    data-view="demandas"
                    class="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round">
                        <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                        <path d="M15 3v5a1 1 0 0 0 1 1h5"/>
                    </svg>

                    <span class="font-medium">
                        Demandas
                    </span>
                </button>

            </nav>

        </aside>
    `;
}

export function renderSidebarAlunos() {
    return `
    <aside class="hidden md:flex md:flex-col w-64 bg-gray-50 shadow border-r border-gray-200 p-5 shrink-0">

            <!-- Logo -->
            <div class="mb-6 flex items-center gap-3 px-2">
                <img 
                    src="${gato}" 
                    alt="Clarify Logo" 
                    class="w-11 h-11 object-contain"
                />

                <h1 class="text-2xl font-bold text-orange-600">
                    Clarify
                </h1>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-1 text-sm">
                
            </nav>
        </aside>
        `;
}
