import gato from '../components/assets/GATOGORDO.png'

export function dashboardcoord(){
    document.querySelector("title").innerHTML = `Dashboard - Clarify`;
    return `
    <div class="min-h-screen w-full bg-pink-50 flex-col mr-auto flex items-center justify-start relative overflow-hidden">
        <div class="mr-auto h-screen flex-col bg-gray-50 shadow p-8 border border-gray-100">
            <div class=" h-20 mb-4 rounded-xl p-4 shadow flex items-center justify-center w-full">
                <img src="${gato}" alt="Clarify Logo" class="w-full h-full object-contain" />
                <h1 class="text-3xl font-bold text-orange-600">Clarify</h1>
            </div>
            <ul class="flex flex-col gap-4 mt-8">
            <li><button class="flex items-center gap-2 act"><spaAlunos</button></li>
            <li><button class="flex items-center gap-2"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg></span>Alunos</button></li>
            <li><button class="flex items-center gap-2"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
</svg></span>Adicionar aluno</button></li>
            </ul>
        </div>
    </div>`
}