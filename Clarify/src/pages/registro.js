import gato from '../components/assets/GATOGORDO.png'
import * as aux from "../funcoesAuxiliares"
import { carregarLogin, ativarListenerLogin } from './login.js'

// Trata se o registro enviado no formulário é válido
function checarRegistro(e) {
    e.preventDefault();
    aux.popularLocalStorage();

    const fullName = document.querySelector("#fullName").value;
    const institutionalId = document.querySelector("#institutionalId").value;
    const institutionalEmail = document.querySelector("#institutionalEmail").value;
    const securityKey = document.querySelector("#securityKey").value;

    if (aux.UsuarioExiste(institutionalId)) {
        const label = document.querySelector("#submitIncorrectAlert label");
        label.textContent = "Credenciais inválidas.";
        aux.limparFormulario(["#fullName", "#institutionalId", "#institutionalEmail", "#securityKey"]);
        return;
    }
    aux.adicionarUsuario(fullName, institutionalId, institutionalEmail, securityKey);
    alert("Registro feito com sucesso!");

    // OBS: Leva até a página de login, remover depois
    document.querySelector('#app').innerHTML = carregarLogin();
    ativarListenerLogin();

}

// Adiciona um listener para o evento de submit do formulário de registro
export function ativarListenerRegistro() {
    document.querySelector('#registrationForm').addEventListener('submit', (e) => {
      e.preventDefault();
      checarRegistro(e);
   });

   document.querySelector('#voltarLogin').addEventListener('click', () => {
       document.querySelector('#app').innerHTML = carregarLogin();
       ativarListenerLogin();
   });
}

export function carregarRegistro() {
    document.querySelector("title").innerHTML = `Registro - Clarify`;
    return `
        <div class="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
            <!-- Fundo Geométrico com Losangos -->
            <div class="absolute inset-0 opacity-15 pointer-events-none" 
                style="background-image: 
                    linear-gradient(30deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(150deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(30deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(150deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
                    linear-gradient(60deg, #8a3f09 25%, transparent 25.5%, transparent 75%, #8a3f09 75%, #8a3f09),
                    linear-gradient(60deg, #8a3f09 25%, transparent 25.5%, transparent 75%, #8a3f09 75%, #8a3f09);
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;">
            </div>
    
            <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 z-10 border border-brand-surface-dim">
            <div class="flex flex-col items-center mb-8">
                <div class="w-20 h-20 mb-4 bg-orange-50 rounded-xl p-2 flex items-center justify-center">
                <img #ca5f15
                    src="${gato}" 
                    alt="Clarify Logo" 
                    class="w-full h-full object-contain"
                />
                </div>
                <h1 class="text-3xl font-bold text-gray-900">Clarify</h1>
                <p class="text-sm font-medium text-gray-500 tracking-wider uppercase mt-1">
                Acesso - Instituto Federal
                </p>
            </div>
    
            <form id="registrationForm" class="space-y-6">
                <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                    Nome Completo
                </label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    </span>
                    <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="e.g. John Doe"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                    required
                    />
                </div>
                </div>
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
                    <input
                    type="text"
                    name="institutionalId"
                    id="institutionalId"
                    placeholder="e.g. 123456789"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                    required
                    />
                </div>
                </div>
    
                <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                    Email institucional
                </label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    </span>
                    <input
                    type="email"
                    name="institutionalEmail"
                    id="institutionalEmail"
                    placeholder="e.g. john.doe@academico.edu.br"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                    required
                    />
                </div>
                </div>

                <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                    chave de segurança
                </label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    </span>
                    <input
                    type="password"
                    name="securityKey"
                    id="securityKey"
                    placeholder="••••••••"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                    required
                    />
                </div>
                </div>

                <div id=submitIncorrectAlert>
                    <label class="label block text-[10px] font-bold text-red-700 uppercase tracking-widest mb-2 ml-1"></label>
                </div>

                <button
                type="submit"
                class=" w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 hover:cursor-pointer hover:-translate-y-1 transition-transform duration-150 ease-out transform">
                Registrar-se
                </button>
    
                <div class="text-center">
                <a href="#" class="text-sm font-semibold text-brand-primary hover:underline transition-all">
                    Recuperar Credenciais de Acesso
                </a>
                </div>
            </form>

            <div class="text-center mt-4">
                <button id="voltarLogin" class="text-sm font-semibold text-brand-primary hover:underline bg-transparent border-none cursor-pointer">
                    Voltar ao Login
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
