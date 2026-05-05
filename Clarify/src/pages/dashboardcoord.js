import gato from '../components/assets/GATOGORDO.png'

export function dashboardcoord(state = 'demands'){
    document.querySelector("title").innerHTML = `Dashboard - Clarify`;
    
    return `
    <div class="min-h-screen w-full bg-pink-50 flex-col mr-auto flex items-center justify-start relative overflow-hidden">
        <div class="mr-auto h-screen flex-col bg-gray-50 shadow p-8 border border-gray-100">
            <div class=" h-20 mb-4 rounded-xl p-4 flex items-center justify-center w-full">
                <img src="${gato}" alt="Clarify Logo" class="w-full h-full object-contain" />
                <h1 class="text-3xl font-bold text-orange-600">Clarify</h1>
            </div>
            <ul class="flex flex-col gap-4 mt-8">
            <li><button class="flex items-center gap-2 act"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>Nome</button></li>
            <li><button class="flex items-center gap-2"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg></span>Alunos</button></li>
            <li><button class="flex items-center gap-2"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
</svg></span>Adicionar aluno</button></li>
    <li><button class="flex items-center gap-2"><span class="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg></span>Demandas</button></li>
            </ul>
        </div>
    </div>`
}