import gato from '../components/assets/GATOGORDO.png'
import * as aux from '../lib/funcoesAuxiliares'

// Trata se o login enviado no formulário é válido
function checarLogin(e) {

    const formData = new FormData(e.target);
    const { institutionalId, securityKey } = Object.fromEntries(formData.entries());
    const usuarioEncontrado = aux.buscarUsuarioCadastrado(institutionalId, securityKey);

    if (usuarioEncontrado) {
        const { senha, ...usuarioLogado } = usuarioEncontrado;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        console.log('Usuário autenticado:', usuarioEncontrado);

        alert('Login realizado com sucesso!');
        return;
    }

    const label = document.querySelector("#submitIncorrectAlert label");
    label.textContent = "Credenciais inválidas.";
    aux.limparFormulario(["#institutionalId", "#securityKey"]);

}

function irParaRegistro() {
    import('./registro.js').then(({ carregarRegistro, ativarListenerRegistro }) => {
        document.querySelector('#app').innerHTML = carregarRegistro();
        ativarListenerRegistro();
    });
}

// Adiciona um listener para o evento de submit do formulário de login
export function ativarListenerLogin() {
    document.querySelector('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checarLogin(e);
    });

    const cadastroCoordenador = document.querySelector('#cadastroCoordenador');
    if (cadastroCoordenador) {
        cadastroCoordenador.addEventListener('click', irParaRegistro);
    }
}

export function carregarLogin() {
    document.querySelector("title").innerHTML = `Login - Clarify`;
    return `
    <div class="min-h-screen w-full flex items-center justify-center p-4 relative bg-gray-50 overflow-hidden">
        
        <div class="absolute inset-0 opacity-15 pointer-events-none z-0 animate-cubes" 
             style="background-image: linear-gradient(30deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(150deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(30deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(150deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(60deg, #8a3f09 25%, transparent 25.5%, transparent 75%, #8a3f09 75%, #8a3f09),
                    linear-gradient(60deg, #8a3f09 25%, transparent 25.5%, transparent 75%, #8a3f09 75%, #8a3f09);
             background-size: 80px 140px;
             background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;">
        </div> <div class="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div class="flex flex-col items-center mb-8">
                <div class="w-20 h-20 mb-4 bg-orange-50 rounded-xl p-2 flex items-center justify-center">
                    <img src="${gato}" alt="Clarify Logo" class="w-full h-full object-contain" />
                </div>
                <h1 class="text-3xl font-bold text-gray-900">Clarify</h1>
                <p class="text-sm font-medium text-gray-500 tracking-wider uppercase mt-1">
                    Acesso - Instituto Federal
                </p>
            </div>

            <form id="loginForm" class="space-y-6">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                        ID Institucional
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <input type="text" name="institutionalId" id="institutionalId" placeholder="e.g. 123456789"
                               class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" required />
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                        Chave de Segurança
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input type="password" name="securityKey" id="securityKey" placeholder="••••••••"
                               class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" required />
                    </div>
                </div>

                <div id="submitIncorrectAlert">
                    <label class="label block text-[10px] font-bold text-red-700 uppercase tracking-widest mb-2 ml-1"></label>
                </div>

                <button type="submit" class="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 transition-all transform active:scale-95">
                    Autenticar
                </button>

                <div class="text-center">
                    <a href="#" class="text-sm font-semibold text-orange-600 hover:underline">
                        Recuperar Credenciais de Acesso
                    </a>
                </div>
            </form>

            <div class="text-center mt-4">
                <button id="cadastroCoordenador" class="text-sm font-semibold text-orange-600 hover:underline bg-transparent border-none cursor-pointer">
                    Cadastro de Coordenador
                </button>
            </div>

            <div class="mt-12 text-center">
                <p class="text-xs text-gray-400 font-medium">Somente indivíduos autorizados.</p>
                <p class="text-xs text-gray-300 mt-1">Versão v0.0.0</p>
            </div>
        </div>
    </div>
    `
}