import gato from './assets/GATOGORDO.png'

export function Login() {
    return `
    <div class="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Fundo Geométrico com Losangos -->
        <div class="absolute inset-0 opacity-15 pointer-events-none" 
            style="background-image: repeating-linear-gradient(45deg, #ca5f15 0px, #ca5f15 2px, transparent 2px, transparent 20px), repeating-linear-gradient(-45deg, #ca5f15 0px, #ca5f15 2px, transparent 2px, transparent 20px);">
        </div>

        <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 z-10 border border-brand-surface-dim">
        <div class="flex flex-col items-center mb-8">
            <div class="w-20 h-20 mb-4 bg-orange-50 rounded-xl p-2 flex items-center justify-center">
            <img 
                src="${gato}" 
                alt="Clarify Logo" 
                class="w-full h-full object-contain"
            />
            </div>
            <h1 class="text-3xl font-bold text-gray-900">Clarify</h1>
            <p class="text-sm font-medium text-gray-500 tracking-wider uppercase mt-1">
            Federal Institution Access
            </p>
        </div>

        <form id="loginForm" class="space-y-6">
            <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Institutional ID
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
                placeholder="e.g. 123456789"
                class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                required
                />
            </div>
            </div>

            <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Security Key
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
                placeholder="••••••••"
                class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                required
                />
            </div>
            </div>

            <button
            type="submit"
            class="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 hover:cursor-pointer hover:-translate-y-1 transition-transform duration-150 ease-out transform"
            >
            Authenticate
            </button>

            <div class="text-center">
            <a href="#" class="text-sm font-semibold text-brand-primary hover:underline transition-all">
                Recover Access Credentials
            </a>
            </div>
        </form>

        <div class="mt-12 text-center">
            <p class="text-xs text-gray-400 font-medium">Authorized personnel only.</p>
            <p class="text-xs text-gray-300 mt-1">System v2.4.1</p>
        </div>
        </div>
    </div>
`
}