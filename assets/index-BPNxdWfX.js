(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`/Clarify/assets/GATOGORDO-jbbncu78.png`;function t(){return`
        <!-- Sidebar desktop -->
        <aside class="hidden md:flex md:flex-col w-64 bg-gray-50 shadow border-r border-gray-200 p-5 shrink-0">

            <!-- Logo -->
            <div class="mb-6 flex items-center gap-3 px-2">
                <img 
                    src="${e}" 
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
                <button 
                    type="button" 
                    data-view="turmas"
                    class="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M12 22s8-4 8-10V5l-8 3-8-3v7c0 6 8 10 8 10z"/>
                    </svg>

                    <span class="font-medium">
                        Turmas
                    </span>
                </button>
            </nav>

        </aside>
    `}function n(){return`
    <aside class="hidden md:flex md:flex-col w-64 bg-gray-50 shadow border-r border-gray-200 p-5 shrink-0">

            <!-- Logo -->
            <div class="mb-6 flex items-center gap-3 px-2">
                <img 
                    src="${e}" 
                    alt="Clarify Logo" 
                    class="w-11 h-11 object-contain"
                />

                <h1 class="text-2xl font-bold text-orange-600">
                    Clarify
                </h1>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-1 text-sm">
                <button type="button" data-view="inicio" class="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <i data-lucide="home" class="w-5 h-5"></i>
                    <span class="font-medium">Início</span>
                </button>
                <button type="button" data-view="demandas" class="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <i data-lucide="clipboard-list" class="w-5 h-5"></i>
                    <span class="font-medium">Central de Demandas</span>
                </button>
                <a href="#" class="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M12 22s8-4 8-10V5l-8 3-8-3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span class="font-medium">Turmas</span>
                </a>
            </nav>
        </aside>
        `}var r={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`},i=([e,t,n])=>{let r=document.createElementNS(`http://www.w3.org/2000/svg`,e);return Object.keys(t).forEach(e=>{r.setAttribute(e,String(t[e]))}),n?.length&&n.forEach(e=>{let t=i(e);r.appendChild(t)}),r},a=(e,t={})=>i([`svg`,{...r,...t},e]),o=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},s=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),c=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),l=e=>{let t=c(e);return t.charAt(0).toUpperCase()+t.slice(1)},ee=e=>Array.from(e.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),te=e=>typeof e==`string`?e:!e||!e.class?``:e.class&&typeof e.class==`string`?e.class.split(` `):e.class&&Array.isArray(e.class)?e.class:``,u=(e,{nameAttr:t,icons:n,attrs:i})=>{let c=e.getAttribute(t);if(c==null)return;let u=n[l(c)];if(!u)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let d=ee(e),f=o(d)?{}:{"aria-hidden":`true`},p={...r,"data-lucide":c,...f,...i,...d},ne=te(d),m=te(i),h=s(`lucide`,`lucide-${c}`,...ne,...m);h&&Object.assign(p,{class:h});let g=a(u,p);return e.parentNode?.replaceChild(g,e)},d=[[`path`,{d:`M5 12h14`}],[`path`,{d:`m12 5 7 7-7 7`}]],f=[[`path`,{d:`M10.268 21a2 2 0 0 0 3.464 0`}],[`path`,{d:`M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`}]],p=[[`path`,{d:`M8 2v4`}],[`path`,{d:`M16 2v4`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`4`,rx:`2`}],[`path`,{d:`M3 10h18`}]],ne=[[`path`,{d:`M5 21v-6`}],[`path`,{d:`M12 21V9`}],[`path`,{d:`M19 21V3`}]],m=[[`path`,{d:`M20 6 9 17l-5-5`}]],h=[[`path`,{d:`m9 18 6-6-6-6`}]],g=[[`circle`,{cx:`12`,cy:`12`,r:`10`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`}]],re=[[`circle`,{cx:`12`,cy:`12`,r:`10`}],[`path`,{d:`m9 12 2 2 4-4`}]],ie=[[`circle`,{cx:`12`,cy:`12`,r:`10`}],[`path`,{d:`M8 12h8`}],[`path`,{d:`M12 8v8`}]],ae=[[`circle`,{cx:`12`,cy:`12`,r:`10`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`}],[`path`,{d:`M12 17h.01`}]],oe=[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`}],[`path`,{d:`M12 11h4`}],[`path`,{d:`M12 16h4`}],[`path`,{d:`M8 11h.01`}],[`path`,{d:`M8 16h.01`}]],se=[[`circle`,{cx:`12`,cy:`12`,r:`10`}],[`path`,{d:`M12 6v6l4 2`}]],ce=[[`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`}],[`circle`,{cx:`12`,cy:`12`,r:`3`}]],le=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 9H8`}],[`path`,{d:`M16 13H8`}],[`path`,{d:`M16 17H8`}]],ue=[[`path`,{d:`M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z`}]],de=[[`path`,{d:`M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z`}],[`path`,{d:`M22 10v6`}],[`path`,{d:`M6 12.5V16a6 3 0 0 0 12 0v-3.5`}]],fe=[[`line`,{x1:`4`,x2:`20`,y1:`9`,y2:`9`}],[`line`,{x1:`4`,x2:`20`,y1:`15`,y2:`15`}],[`line`,{x1:`10`,x2:`8`,y1:`3`,y2:`21`}],[`line`,{x1:`16`,x2:`14`,y1:`3`,y2:`21`}]],pe=[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`}],[`path`,{d:`M3 3v5h5`}],[`path`,{d:`M12 7v5l4 2`}]],me=[[`path`,{d:`M5 22h14`}],[`path`,{d:`M5 2h14`}],[`path`,{d:`M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22`}],[`path`,{d:`M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2`}]],he=[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`}]],ge=[[`path`,{d:`m16 17 5-5-5-5`}],[`path`,{d:`M21 12H9`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}]],_e=[[`path`,{d:`m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`}],[`rect`,{x:`2`,y:`4`,width:`20`,height:`16`,rx:`2`}]],ve=[[`path`,{d:`M4 5h16`}],[`path`,{d:`M4 12h16`}],[`path`,{d:`M4 19h16`}]],ye=[[`path`,{d:`M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`}]],be=[[`path`,{d:`M14 14a2 2 0 0 0 2-2V8h-2`}],[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`}],[`path`,{d:`M8 14a2 2 0 0 0 2-2V8H8`}]],xe=[[`path`,{d:`M5 12h14`}],[`path`,{d:`M12 5v14`}]],Se=[[`path`,{d:`m21 21-4.34-4.34`}],[`circle`,{cx:`11`,cy:`11`,r:`8`}]],Ce=[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`}],[`path`,{d:`m21.854 2.147-10.94 10.939`}]],we=[[`path`,{d:`M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`}],[`circle`,{cx:`12`,cy:`12`,r:`3`}]],Te=[[`path`,{d:`M10 15H6a4 4 0 0 0-4 4v2`}],[`path`,{d:`m14.305 16.53.923-.382`}],[`path`,{d:`m15.228 13.852-.923-.383`}],[`path`,{d:`m16.852 12.228-.383-.923`}],[`path`,{d:`m16.852 17.772-.383.924`}],[`path`,{d:`m19.148 12.228.383-.923`}],[`path`,{d:`m19.53 18.696-.382-.924`}],[`path`,{d:`m20.772 13.852.924-.383`}],[`path`,{d:`m20.772 16.148.924.383`}],[`circle`,{cx:`18`,cy:`15`,r:`3`}],[`circle`,{cx:`9`,cy:`7`,r:`4`}]],Ee=[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`}],[`path`,{d:`M16 3.128a4 4 0 0 1 0 7.744`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`}],[`circle`,{cx:`9`,cy:`7`,r:`4`}]],De=[[`path`,{d:`M18 6 6 18`}],[`path`,{d:`m6 6 12 12`}]],_=({icons:e={},nameAttr:t=`data-lucide`,attrs:n={},root:r=document,inTemplates:i}={})=>{if(!Object.values(e).length)throw Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(r===void 0)throw Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${t}]`)).forEach(r=>u(r,{nameAttr:t,icons:e,attrs:n})),i&&Array.from(r.querySelectorAll(`template`)).forEach(r=>_({icons:e,nameAttr:t,attrs:n,root:r.content,inTemplates:i})),t===`data-lucide`){let t=r.querySelectorAll(`[icon-name]`);t.length>0&&(console.warn(`[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide`),Array.from(t).forEach(t=>u(t,{nameAttr:`icon-name`,icons:e,attrs:n})))}},Oe={AlertCircle:g,ArrowRight:d,Bell:f,Calendar:p,Check:m,CheckCircle2:re,ChevronRight:h,ClipboardList:oe,Clock:se,FileText:le,Filter:ue,Hash:fe,HelpCircle:ae,History:pe,Hourglass:me,LogOut:ge,Mail:_e,MessageSquareQuote:be,Menu:ve,Plus:xe,PlusCircle:ie,Search:Se,Send:Ce,Settings:we,X:De,Check:m,BarChart:ne,MessageCircle:ye,Mail:_e,Home:he};function v(){_({icons:Oe,attrs:{"stroke-width":1.75}})}function y(e,t=!0){let n=e?.nome||`Usuário`;return`
        <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-2 pr-1 py-1 shadow-sm">
            
            <!-- Avatar -->
            <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center">
                ${n.split(` `)[0].charAt(0).toUpperCase()}
            </div>

            <!-- Nome -->
            ${t?`
                <span class="text-sm font-medium text-gray-700 hidden lg:inline">
                    ${n}
                </span>
            `:``}

            <!-- Botão sair -->
            <button 
                type="button"
                title="Sair da conta"
                id = "btnLogoutDesktop"
                class="btnSairConta w-8 h-8 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
            >
                <i data-lucide="log-out" class="w-4 h-4"></i>
            </button>

        </div>
    `}function ke(){return`turma_`+Date.now()+`_`+Math.random().toString(36).slice(2,7)}function Ae(e){let t=JSON.parse(localStorage.getItem(`turmas`)||`[]`);t.push(e),localStorage.setItem(`turmas`,JSON.stringify(t))}function b(){let e=JSON.parse(localStorage.getItem(`turmas`)||`[]`),t=JSON.parse(localStorage.getItem(`usuarioLogado`)||`{}`),n=document.querySelector(`#turmasContainer`);if(!n)return;let r=e.filter(e=>e.coordenador===String(t.matricula));if(r.length===0){n.innerHTML=`
            <p class="col-span-full text-center text-gray-400 py-8 text-sm">
                Nenhuma turma criada ainda.
            </p>`;return}n.innerHTML=``,r.forEach(e=>{let t=document.createElement(`div`);t.classList.add(`bg-white`,`border`,`border-gray-200`,`rounded-2xl`,`p-5`,`shadow-lg`,`hover:-translate-y-1`,`transition-transform`,`duration-200`,`ease-out`),t.innerHTML=`
            <div class="flex items-start justify-between gap-4 mb-4">
                <div class="space-y-1">
                    <h3 class="text-lg font-semibold text-zinc-900">${e.nome}</h3>
                    <p class="text-sm text-zinc-500">${e.disciplina}</p>
                </div>
                <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-700">
                    ${e.alunos.length} aluno${e.alunos.length===1?``:`s`}
                </span>
            </div>
            <div class="text-sm text-zinc-500">
                <span class="font-semibold text-zinc-700">ID:</span> ${e.id}
            </div>
        `,n.appendChild(t)})}function je(){if(document.getElementById(`modalCriarTurma`))return;let e=[],t=document.createElement(`div`);t.id=`modalCriarTurma`,t.className=`fixed inset-0 bg-black/50 flex items-center justify-center z-50`,t.innerHTML=`
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
    `,document.body.appendChild(t);let n=()=>t.remove();document.getElementById(`fecharModalTurma`).onclick=n,document.getElementById(`cancelarModalTurma`).onclick=n,t.addEventListener(`click`,e=>{e.target===t&&n()});function r(t){if(t=t.trim(),!t||e.includes(t))return;e.push(t);let n=document.createElement(`span`);n.className=`flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full px-3 py-1`,n.innerHTML=`
            ${t}
            <button type="button" data-matricula="${t}"
                class="ml-0.5 text-orange-400 hover:text-orange-700 cursor-pointer leading-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
            </button>
        `,n.querySelector(`button`).onclick=()=>{let r=e.indexOf(t);r>-1&&e.splice(r,1),n.remove()},document.getElementById(`turmaAlunosChips`).appendChild(n),document.getElementById(`turmaAlunoMatricula`).value=``}document.getElementById(`btnAdicionarAluno`).onclick=()=>{let e=document.getElementById(`turmaAlunoMatricula`).value;r(e)},document.getElementById(`turmaAlunoMatricula`).addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),r(e.target.value))}),document.getElementById(`formCriarTurma`).onsubmit=t=>{t.preventDefault();let r=JSON.parse(localStorage.getItem(`usuarioLogado`)||`{}`),i={id:ke(),nome:document.getElementById(`turmaNome`).value.trim(),disciplina:document.getElementById(`turmaDisciplina`).value.trim(),alunos:[...e],coordenador:String(r.matricula),criadaEm:new Date().toISOString()};Ae(i),n(),b(),alert(`Turma "${i.nome}" criada com sucesso!`)}}function Me(){let e=document.querySelector(`#btnCriarTurma`);e&&(e.onclick=e=>{e.preventDefault(),e.stopImmediatePropagation(),console.log(`Abrindo modal de criação...`),je()})}v();function Ne(e){let t=JSON.parse(localStorage.getItem(`demandas`)||`[]`).find(t=>t.protocolo===e);if(t){let e=document.createElement(`div`);e.id=`modal-container`,e.classList.add(`fixed`,`inset-0`,`bg-black/50`,`flex`,`items-center`,`justify-center`,`z-50`);let n=`
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button onclick="document.getElementById('modal-container').remove()" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors  cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i></button>
            <h1 class="text-2xl font-bold mb-4">${t.tipo}</h1>
            <p class="text-gray-600 mb-4">${t.descricao}</p>
            <p class="text-sm text-gray-500 mb-2"><span class="font-semibold">Protocolo:</span> ${t.protocolo}</p>
            <p class="text-sm text-gray-500 mb-2"><span class="font-semibold">Matrícula do Aluno:</span> ${t.matriculaAluno}</p>
            <p class="text-sm text-gray-500 mb-2"><span class="font-semibold">Status:</span> ${t.status.replace(`_`,` `).toUpperCase()}</p>
            <p class="text-sm text-gray-500 mb-2"><span class="font-semibold">Data de Criação:</span> ${Q(t.dataCriacao)}</p>
            <p class="text-sm text-gray-500 mb-2"><span class="font-semibold">Data de Atualização:</span> ${Q(t.dataAtualizacao)}</p>
            </div>`;e.addEventListener(`click`,t=>{t.target.id===`modal-container`&&e.remove()}),e.innerHTML=n,document.body.appendChild(e),v()}}function Pe(e){let t=JSON.parse(localStorage.getItem(`demandas`)||`[]`),n=t.find(t=>t.protocolo===e);n&&(n.status=`aprovada`),localStorage.setItem(`demandas`,JSON.stringify(t)),S()}function Fe(e){let t=document.createElement(`div`);t.id=`modalFeedback`,t.classList.add(`fixed`,`inset-0`,`bg-black/50`,`flex`,`items-center`,`justify-center`,`z-50`),t.innerHTML=`
    <form id='formfeedback' class='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
    <input type='text' id='feedback' placeholder='Digite seu feedback...' class='w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all' required>
    <button type='submit' class='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors'>Enviar</button>
    </form>`,document.body.appendChild(t);let n=t.querySelector(`#formfeedback`);n.onsubmit=n=>{n.preventDefault();let r=document.querySelector(`#feedback`).value,i=JSON.parse(localStorage.getItem(`demandas`)||`[]`),a=i.find(t=>t.protocolo===e);a&&(a.status=`negada`,a.feedback=r),localStorage.setItem(`demandas`,JSON.stringify(i)),t.remove(),S()}}window.aprovarDemanda=Pe,window.reprovarDemanda=Fe,window.demandaDetalhada=Ne;function x(){let e=JSON.parse(localStorage.getItem(`usuarioLogado`)||`{}`),t=localStorage.getItem(`usuarios`)||`[]`,n=JSON.parse(t).filter(t=>t.coordenador===e.matricula),r=localStorage.getItem(`demandas`)||`[]`,i=JSON.parse(r),a=document.querySelector(`#alunosContainer`);if(a){if(a.innerHTML=``,n.length===0){a.innerHTML=`
            <div class="col-span-full text-center py-12 text-zinc-400">
                <span class="material-symbols-outlined text-4xl mb-2 block">person_off</span>
                <p class="text-sm">Nenhum aluno cadastrado.</p>
            </div>
        `;return}return n.forEach(e=>{let t=e.nome.split(` `).slice(0,2).map(e=>e[0].toUpperCase()).join(``),n=document.createElement(`div`);n.classList.add(`bg-white`,`border`,`border-gray-200`,`rounded-2xl`,`p-5`,`shadow-lg`,`hover:-translate-y-1`,`transition-transform`,`duration-200`,`ease-out`),n.innerHTML=`
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container font-bold text-sm shrink-0">
                    ${t}
                </div>
                <div class="min-w-0">
                    <h3 class="text-base font-semibold text-zinc-900 truncate">${e.nome}</h3>
                    <p class="text-xs text-zinc-400 truncate">${e.email}</p>
                </div>
            </div>
            <div class="grid gap-2 text-sm text-zinc-600">
                <p><span class="font-semibold text-zinc-800">Nome:</span> ${e.nome}</p>
                <p><span class="font-semibold text-zinc-800">Matrícula:</span>
                    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 ml-1">
                        ${e.matricula}
                    </span>
                </p>
                <p><span class="font-semibold text-zinc-800">Demandas em aberto:</span>
                    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 ml-1">
                        ${i.filter(t=>t.matriculaAluno===e.matricula&&t.status!==`concluido`).length}
                    </span>
                </p>

            </div>
             <div class="mt-4 flex justify-end">
        <button 
            onclick="deletarAluno('${e.matricula}')"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            Remover aluno
        </button>
    </div>
        `,a.appendChild(n)}),a}}function Ie(e){if(!confirm(`Tem certeza que deseja remover o aluno ${e}?`))return;let t=JSON.parse(localStorage.getItem(`usuarios`)||`[]`).filter(t=>t.matricula!==e);localStorage.setItem(`usuarios`,JSON.stringify(t));let n=JSON.parse(localStorage.getItem(`demandas`)||`[]`).filter(t=>t.matriculaAluno!==e);localStorage.setItem(`demandas`,JSON.stringify(n)),x()}window.deletarAluno=Ie;function S(){let e=JSON.parse(localStorage.getItem(`usuarioLogado`)||`{}`),t=localStorage.getItem(`demandas`)||`[]`,n=JSON.parse(t),r=document.querySelector(`#demandasContainer`);if(console.log(`Container encontrado:`,r),r)return r.innerHTML=``,n.filter(e=>e.status!==`concluido`).filter(t=>e.alunosCadastrados.includes(t.matriculaAluno)).forEach(e=>{let t=document.createElement(`div`);t.classList.add(`bg-white`,`border`,`border-gray-200`,`rounded-2xl`,`p-5`,`shadow-lg`,`hover:-translate-y-1`,`transition-transform`,`duration-200`,`ease-out`,`flex`,`flex-col`,`justify-between`,`h-full`),t.classList.add(`demandas`);let n=e.status===`concluido`?`bg-emerald-100 text-emerald-700`:e.status===`em_analise`?`bg-amber-100 text-amber-700`:e.status===`requer_ajuste`?`bg-orange-100 text-orange-700`:`bg-slate-100 text-slate-700`,i=e.descricao?e.descricao:``;t.innerHTML=`
            <div class="flex items-start justify-between gap-4 mb-4" onclick="demandaDetalhada('${e.protocolo}')">
                <div class="space-y-2">
                    <h3 class="text-lg font-semibold text-zinc-900">${e.tipo}</h3>
                    <p class="text-sm text-zinc-500">${i}</p>
                </div>
                <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${n}">${e.status.replace(`_`,` `).toUpperCase()}</span>
            </div>
            <div class="grid gap-2 text-sm text-zinc-600">
                <p><span class="font-semibold text-zinc-800">Protocolo:</span> ${e.protocolo}</p>
                <p><span class="font-semibold text-zinc-800">Matrícula:</span> ${e.matriculaAluno}</p>
            </div>
            <div class="mt-4 text-sm text-zinc-500 flex items-center justify-end gap-2">
                <button class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors" onclick="aprovarDemanda('${e.protocolo}')"><i data-lucide="check"></i></button>
                <button class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors ml-2" onclick="reprovarDemanda('${e.protocolo}')"><i data-lucide="x"></i></button>
            </div>
        `,e.status===`pendente`&&r.appendChild(t)}),v(),r}var C=t=>({nome:`
        <div class="space-y-6">
            <section class="relative overflow-hidden bg-zinc-900 p-5 text-white">
                <div class="absolute inset-0 opacity-15">
                    <img class="w-full h-full object-cover" data-alt="An abstract architectural composition of sharp angles and geometric planes in shades of deep charcoal and burnt orange. The image has a sophisticated, minimalist feel, representing the intersection of data and institutional structure. High-contrast lighting creates strong shadows, reinforcing the geometric institutionalism brand identity of the Clarify platform." src="${e}"/>
                </div>
                <div class="relative z-10 space-y-4">
                    <span class="text-primary-fixed font-label-caps text-[10px] tracking-[0.2em] uppercase block">PORTAL DO COORDENADOR</span>
                    <h1 class="font-h1 text-3xl lg:text-4xl font-semibold">Bem-vindo, ${t.nome}</h1>
                    <p class="text-zinc-400 text-sm lg:text-base max-w-2xl">Acompanhe as demandas e gerencie o fluxo de solicitações acadêmicas com precisão e clareza.</p>
                </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white border border-zinc-200 p-4 flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <span class="material-symbols-outlined text-primary text-2xl">person_search</span>
                        <span class="text-[10px] font-bold text-zinc-400 uppercase">+12% ESTE MÊS</span>
                    </div>
                    <div>
                        <h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">REGISTERED USERS</h3>
                        <p class="text-3xl lg:text-4xl font-semibold text-zinc-900">428 <span class="text-base font-normal text-zinc-400">ativos</span></p>
                    </div>
                </div>
                <div class="bg-white border border-zinc-200 border-l-4 border-error p-4 flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <span class="material-symbols-outlined text-error text-2xl">emergency_home</span>
                        <span class="bg-error text-white text-[10px] px-2 py-0.5 font-bold rounded">ALERTA</span>
                    </div>
                    <div>
                        <h3 class="text-zinc-500 uppercase tracking-[0.2em] text-[10px]">CRITICAL DEADLINES</h3>
                        <p class="text-3xl lg:text-4xl font-semibold text-zinc-900">05 <span class="text-base font-normal text-error">&lt; 24h</span></p>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-zinc-200 overflow-hidden">
                <div class="bg-zinc-50 border-b border-zinc-200 px-4 py-3 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <h2 class="font-h3 text-base lg:text-lg flex items-center gap-2">
                        <span class="material-symbols-outlined text-error">priority_high</span>
                        Priority Deadlines
                    </h2>
                    <button id="ver-todas" class="text-xs font-bold text-primary hover:underline">VER TODAS</button>
                </div>
                <div class="divide-y divide-zinc-100">
                    <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">AC</div>
                            <div>
                                <h4 class="font-h3 text-base text-zinc-900">Aproveitamento de Créditos</h4>
                                <p class="text-sm text-zinc-500">Solicitante: Mariana Costa (202100452)</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 lg:gap-8">
                            <div class="text-right">
                                <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
                                <p class="text-sm font-bold text-error">04 horas</p>
                            </div>
                            <span class="bg-error-container text-on-error-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Urgente</span>
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors">chevron_right</button>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">TM</div>
                            <div>
                                <h4 class="font-h3 text-base text-zinc-900">Trancamento de Matrícula</h4>
                                <p class="text-sm text-zinc-500">Solicitante: João Pedro Santos (202001183)</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 lg:gap-8">
                            <div class="text-right">
                                <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
                                <p class="text-sm font-bold text-error">12 horas</p>
                            </div>
                            <span class="bg-error-container text-on-error-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Urgente</span>
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors">chevron_right</button>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-surface-container flex items-center justify-center text-primary-container font-bold rounded">QT</div>
                            <div>
                                <h4 class="font-h3 text-base text-zinc-900">Quebra de Pré-requisito</h4>
                                <p class="text-sm text-zinc-500">Solicitante: Ana Beatriz Lima (202200812)</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 lg:gap-8">
                            <div class="text-right">
                                <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-400">EXPIRA EM</p>
                                <p class="text-sm font-bold text-error">19 horas</p>
                            </div>
                            <span class="bg-error-container text-on-error-container px-3 py-1 text-xs font-bold uppercase tracking-wider">Urgente</span>
                            <button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors">chevron_right</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     `,alunos:`
    <div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-semibold mb-4">Alunos</h2>
        <p class="text-gray-600">Gerencie a lista de alunos, visualize registros e acesse informações de matrícula.</p>
    </div>
    <div id="alunosContainer" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
`,demandas:`
    <div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-semibold mb-4">Demandas</h2>
        <p class="text-gray-600">Veja as demandas abertas, tarefas pendentes e notificações importantes.</p>
    </div>
    <div id="demandasContainer" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
`,adicionar:`
        <div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-semibold mb-4">Adicionar aluno</h2>
            <p class="text-gray-600">Clique no botão para abrir o formulário de cadastro de aluno.</p>
        </div>
    `,turmas:`
    <div class="border border-dashed border-gray-300 bg-white p-8 shadow-sm flex items-center justify-between">
        <div>
            <h2 class="text-2xl font-semibold mb-1">Turmas</h2>
            <p class="text-gray-600">Gerencie as turmas, visualize horários e acesse informações de matrícula.</p>
        </div>
        <button
            id="btnCriarTurma"
            class="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            Criar turma
        </button>
    </div>
    <div id="turmasContainer" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
`});function Le(){let e=document.querySelector(`#nome`).value,t=document.querySelector(`#matricula`).value,n=document.querySelector(`#email`).value,r=document.querySelector(`#senha`).value,i=document.querySelector(`#cargo`).value;if(JSON.parse(localStorage.getItem(`usuarios`)),Z(t,n)){alert(`Usuário já existe`),J([`#nome`,`#matricula`,`#email`,`#senha`,`#cargo`]);return}let a=JSON.parse(localStorage.getItem(`usuarioLogado`));alert(`Usuário criado com sucesso!`),Tt(e,t,n,r,i),Et(t,a.matricula),Dt(t,a.matricula)}function Re(){document.querySelector(`#criarPerfilForm`).onsubmit=e=>{e.preventDefault(),Le(),J([`#nome`,`#matricula`,`#email`,`#senha`,`#cargo`])}}function w(e=`nome`){let t=JSON.parse(localStorage.getItem(`usuarioLogado`)||`{"nome":"Usuário"}`),n=document.querySelector(`#dashboardContent`);n&&(n.innerHTML=C(t)[e]||C(t).nome,e===`demandas`?S():e===`alunos`?x():e===`turmas`&&(b(),Me()),ze(e))}function ze(e){let t=document.querySelectorAll(`[data-view]`),n=document.getElementById(`ver-todas`);n&&n.addEventListener(`click`,()=>{w(`demandas`),ze(`demandas`)}),t.forEach(t=>{let n=t.dataset.view===e;t.classList.toggle(`bg-brand-primary/10`,n),t.classList.toggle(`text-brand-primary`,n),t.classList.toggle(`bg-transparent`,!n),t.classList.toggle(`text-gray-700`,!n)})}function T(){w(`nome`),document.querySelectorAll(`[data-view]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.view;if(!t)return;w(t);let n=document.getElementById(`criarPerfil`);t===`adicionar`?n?.classList.remove(`hidden`):n?.classList.add(`hidden`)})})}function Be(){let e=document.querySelectorAll(`[data-view='adicionar']`);e.length&&e.forEach(e=>{e.addEventListener(`click`,()=>{document.getElementById(`criarPerfil`).classList.remove(`hidden`)})})}function E(){$(`dashboardcoord`),document.querySelector(`title`).innerHTML=`Dashboard - Clarify`;let n=JSON.parse(localStorage.getItem(`usuarioLogado`)||`{"nome":"Usuário"}`);document.querySelector(`#app`).innerHTML=`
    <div class="min-h-screen w-full bg-pink-50 flex flex-col md:flex-row relative overflow-hidden">
        ${t()}
        <!-- Navbar mobile -->
        <div class="md:hidden bg-white border-b border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <img src="${e}" alt="Clarify Logo" class="h-10 w-10 object-contain" />
                    <h1 class="text-lg font-bold text-orange-600">Clarify</h1>
                </div>
                <button id="btnLogoutMobile" type="button" title="Sair da conta"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sair
                </button>
            </div>
            <div class="flex gap-2 overflow-x-auto justify-center">
                <button type="button" data-view="nome" aria-label="Nome" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </button>
                <button type="button" data-view="alunos" aria-label="Alunos" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
                </button>
                <button type="button" data-view="adicionar" aria-label="Adicionar aluno" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg>
                </button>
                <button type="button" data-view="demandas" aria-label="Demandas" class="min-w-[72px] flex h-10 items-center justify-center rounded-2xl border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors bg-transparent hover:bg-brand-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg>
                </button>
            
            </div>
        </div>


<!-- Área principal -->
<main class="flex-1 flex flex-col min-w-0 ">

    <!-- Topbar -->
    <div class="hidden md:flex items-center justify-end gap-3 px-6 py-4 bg-white border-b border-gray-200">

        <button type="button"
            class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
            <i data-lucide="bell" class="w-4 h-4"></i>
        </button>

        <button type="button"
            class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
            <i data-lucide="help-circle" class="w-4 h-4"></i>
        </button>

        ${y(n)}
    </div>

    <!-- Conteúdo dashboard -->
    <div class="flex-1 p-5 overflow-y-auto" id="dashboardContent"></div>

</main>
   
    </div>

    <!-- Modal: Criar Perfil -->
    <div class="hidden fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" id="criarPerfil">
        <div class="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6">Criar Perfil</h2>
            <form id="criarPerfilForm" class="space-y-4">
                <div>
                    <label for="nome" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="nome" name="nome" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="matricula" class="block text-sm font-medium text-gray-700">Matrícula</label>
                    <input type="text" id="matricula" name="matricula" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Institucional</label>
                    <input type="email" id="email" name="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="senha" class="block text-sm font-medium text-gray-700">Senha</label>
                    <input type="password" id="senha" name="senha" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                </div>
                <div>
                    <label for="cargo" class="block text-sm font-medium text-gray-700">Tipo de Conta</label>
                    <select id="cargo" name="cargo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500">
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="button" class="hover:cursor-pointer mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onclick="document.getElementById('criarPerfil').classList.add('hidden')">Cancelar</button>
                    <button id="dashboardCoordForm" type="submit" class="hover:cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Criar</button>
                </div>
            </form>
        </div>
    </div>`,v(),T(),Re(),document.querySelector(`#btnLogoutDesktop`).addEventListener(`click`,()=>{localStorage.removeItem(`usuarioLogado`),localStorage.removeItem(`auth`),B(),z()}),document.querySelector(`#btnLogoutMobile`).addEventListener(`click`,()=>{localStorage.removeItem(`usuarioLogado`),localStorage.removeItem(`auth`),B(),z()})}var Ve={pendente:`Pendente`,em_analise:`Em Análise`,requer_ajuste:`Requer Ajuste`,concluido:`Concluído`},D=500,O=null;function k(){let e=document.querySelector(`#modalContainer`);if(!e||!e.firstElementChild)return;let t=e.firstElementChild,n=t.querySelector(`.modal-panel`);t.classList.add(`is-closing`),n&&n.classList.add(`is-closing`),O&&=(document.removeEventListener(`keydown`,O),null),setTimeout(()=>{e.innerHTML=``,document.body.classList.remove(`modal-open`)},170)}function He(e){let t=document.querySelector(`#modalContainer`);t||(t=document.createElement(`div`),t.id=`modalContainer`,document.body.appendChild(t)),t.innerHTML=`
        <div class="modal-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div class="modal-panel relative w-full ${e} bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"></div>
        </div>
    `,document.body.classList.add(`modal-open`);let n=t.firstElementChild,r=n.querySelector(`.modal-panel`);return n.addEventListener(`click`,e=>{e.target===n&&k()}),O=e=>{e.key===`Escape`&&k()},document.addEventListener(`keydown`,O),r}function Ue(e){return`
        <form id="formNovaDemanda" class="flex flex-col modal-scroll">
            <div class="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6">
                <div class="inline-flex items-center gap-2">
                    <span class="modal-eyebrow-dot"></span>
                    <span class="modal-label">Nova solicitação</span>
                </div>
                <button type="button" class="modal-close" data-acao="fechar" title="Fechar">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="px-5 sm:px-7 pt-4 sm:pt-5 pb-2 modal-stagger">

                <header>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight">
                        Conte para a coordenação<br/>
                        <span class="text-gradient-warm">o que precisa ser resolvido.</span>
                    </h2>
                    <p class="text-sm text-gray-500 mt-2 max-w-md">
                        Quanto mais claro o pedido, mais rápido a análise. Inclua disciplina, datas e qualquer contexto relevante.
                    </p>
                </header>

                <section class="mt-5">
                    <label for="campoTituloDemanda" class="modal-label">Título</label>
                    <input
                        id="campoTituloDemanda"
                        name="titulo"
                        type="text"
                        autocomplete="off"
                        maxlength="80"
                        placeholder="Ex.: Justificativa de falta — Cálculo III"
                        class="modal-input font-semibold mt-1"
                    />
                </section>

                <section class="mt-5">
                    <div class="flex items-end justify-between gap-3">
                        <label for="campoDescricaoDemanda" class="modal-label">Descrição</label>
                        <span id="contadorDescricao" class="modal-counter">0 / ${D}</span>
                    </div>
                    <textarea
                        id="campoDescricaoDemanda"
                        name="descricao"
                        rows="5"
                        maxlength="${D}"
                        placeholder="Descreva a situação, os documentos anexos (se houver) e o que você espera como resolução."
                        class="modal-textarea mt-2"
                    ></textarea>
                </section>

                <section class="mt-5 flex items-center gap-3 bg-brand-surface rounded-2xl px-3.5 py-2.5 border border-gray-100">
                    <div class="w-8 h-8 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                        ${(e.nome||`Você`).split(` `)[0].charAt(0).toUpperCase()}
                    </div>
                    <div class="min-w-0">
                        <p class="modal-label leading-none">Enviando como</p>
                        <p class="text-sm font-semibold text-gray-900 mt-1 truncate">
                            ${e.nome||`Aluno`} · Matrícula ${e.matricula||`—`}
                        </p>
                    </div>
                </section>

                <div id="erroNovaDemanda" hidden class="mt-4 items-start gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    <i data-lucide="alert-circle" class="w-4 h-4 mt-px"></i>
                    <span></span>
                </div>
            </div>

            <footer class="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40">
                <button type="button" class="modal-btn-ghost" data-acao="fechar">
                    Cancelar
                </button>
                <button type="submit" id="btnEnviarDemanda" class="modal-btn-primary" disabled>
                    Enviar solicitação
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
            </footer>
        </form>
    `}function We({onCriado:e}={}){let t=JSON.parse(localStorage.getItem(`usuarioLogado`))||{},n=He(`max-w-lg`);n.innerHTML=Ue(t),v();let r=n.querySelector(`#formNovaDemanda`),i=n.querySelector(`#campoTituloDemanda`),a=n.querySelector(`#campoDescricaoDemanda`),o=n.querySelector(`#contadorDescricao`),s=n.querySelector(`#btnEnviarDemanda`),c=n.querySelector(`#erroNovaDemanda`);setTimeout(()=>i.focus(),100);function l(){s.disabled=!(i.value.trim().length>=4&&a.value.trim().length>=10)}function ee(){let e=a.value.length;o.textContent=`${e} / ${D}`,o.classList.toggle(`is-near`,e>=D*.85&&e<D),o.classList.toggle(`is-over`,e>=D)}i.addEventListener(`input`,l),a.addEventListener(`input`,()=>{ee(),l()}),n.querySelectorAll(`[data-acao="fechar"]`).forEach(e=>{e.addEventListener(`click`,k)}),r.addEventListener(`submit`,n=>{n.preventDefault();let r=i.value.trim(),o=a.value.trim();if(r.length<4||o.length<10){c.removeAttribute(`hidden`),c.classList.add(`inline-flex`),c.querySelector(`span`).textContent=`Preencha um título com pelo menos 4 caracteres e uma descrição com pelo menos 10.`;return}if(!t.matricula){c.removeAttribute(`hidden`),c.classList.add(`inline-flex`),c.querySelector(`span`).textContent=`Sessão expirada. Faça login novamente para enviar a solicitação.`;return}let s=St({matriculaAluno:t.matricula,tipo:r,descricao:o});k(),e&&e(s)})}function Ge(e){switch(e){case`pendente`:return`bg-amber-100 text-amber-800 border-amber-200`;case`em_analise`:return`bg-blue-100 text-blue-800 border-blue-200`;case`requer_ajuste`:return`bg-rose-100 text-rose-800 border-rose-200`;case`concluido`:return`bg-emerald-100 text-emerald-800 border-emerald-200`;default:return`bg-gray-100 text-gray-800 border-gray-200`}}function Ke(e){if(!e)return null;let[t,n,r]=e.split(`-`).map(Number),i=new Date(t,n-1,r),a=new Date().setHours(0,0,0,0)-i.setHours(0,0,0,0);return Math.max(0,Math.round(a/(1e3*60*60*24)))}function qe(e){let t=[{chave:`pendente`,rotulo:`Recebida`},{chave:`em_analise`,rotulo:`Em análise`},{chave:`requer_ajuste`,rotulo:`Resolução`},{chave:`concluido`,rotulo:`Concluída`}],n=0;e===`em_analise`?n=1:e===`requer_ajuste`?n=2:e===`concluido`&&(n=3);let r=``;for(let e=0;e<t.length;++e){let i=``,a=``;e<n?(i=`is-done`,a=`<i data-lucide="check" class="w-3.5 h-3.5 text-white"></i>`):e===n&&(i=`is-current`),r+=`
            <div class="modal-timeline-step ${i}">
                <div class="modal-timeline-dot">${a}</div>
                <p class="modal-timeline-label">${t[e].rotulo}</p>
            </div>
        `}return r}function Je(e,t){let n=Ve[e.status]||e.status,r=Ke(e.dataCriacao),i=t&&t.nome||`Matrícula ${e.matriculaAluno}`,a=i.charAt(0).toUpperCase(),o=t&&t.email||`—`;return`
        <article class="flex flex-col modal-scroll">
            <div class="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6">
                <div class="inline-flex items-center gap-2">
                    <span class="modal-eyebrow-dot"></span>
                    <span class="modal-label">Solicitação · #${e.protocolo}</span>
                </div>
                <button type="button" class="modal-close" data-acao="fechar" title="Fechar">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <div class="px-5 sm:px-7 pt-4 sm:pt-5 pb-2 modal-stagger">

                <header class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div class="min-w-0 flex-1">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight break-words [overflow-wrap:anywhere]">
                            ${e.tipo}
                        </h2>
                        <p class="text-sm text-gray-500 mt-1.5">
                            Aberta em <span class="font-semibold text-gray-700">${Q(e.dataCriacao)}</span>
                            ${r===null?``:` · há ${r} dias`}
                        </p>
                    </div>
                    <span class="self-start inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border whitespace-nowrap ${Ge(e.status)}">
                        <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
                        ${n}
                    </span>
                </header>

                <section class="mt-6 bg-gradient-to-br from-white to-brand-surface/50 rounded-2xl border border-gray-100 px-3 sm:px-6 py-4">
                    <div class="flex items-start gap-0">
                        ${qe(e.status)}
                    </div>
                </section>

                <section class="mt-6">
                    <div class="flex items-center gap-2 mb-3">
                        <i data-lucide="file-text" class="w-3.5 h-3.5 text-brand-primary"></i>
                        <p class="modal-label">Detalhes da solicitação</p>
                    </div>
                    <div class="bg-brand-surface/50 border border-brand-surface-dim/40 rounded-2xl px-5 py-4">
                        <p class="text-[0.95rem] sm:text-base text-gray-800 leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap">${e.descricao}</p>
                    </div>
                </section>

                <section class="mt-6">
                    <p class="modal-label">Enviado por</p>
                    <div class="mt-3 flex items-center gap-3 bg-brand-surface/60 rounded-2xl px-4 py-3 border border-gray-100">
                        <div class="w-11 h-11 rounded-full bg-brand-primary text-white text-base font-bold flex items-center justify-center shrink-0 shadow-soft-md">
                            ${a}
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-semibold text-gray-900 truncate">${i}</p>
                            <p class="text-xs text-gray-500 truncate inline-flex items-center gap-1.5">
                                <i data-lucide="hash" class="w-3 h-3"></i>
                                ${e.matriculaAluno}
                                <span class="opacity-30">·</span>
                                <i data-lucide="mail" class="w-3 h-3"></i>
                                <span class="truncate">${o}</span>
                            </p>
                        </div>
                    </div>
                </section>

                <section class="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="bg-white rounded-2xl border border-gray-100 px-4 py-3">
                        <p class="modal-label">Criada em</p>
                        <p class="text-sm font-semibold text-gray-900 mt-1 inline-flex items-center gap-1.5">
                            <i data-lucide="calendar" class="w-3.5 h-3.5 text-gray-400"></i>
                            ${Q(e.dataCriacao)}
                        </p>
                    </div>
                    <div class="bg-white rounded-2xl border border-gray-100 px-4 py-3">
                        <p class="modal-label">Status</p>
                        <p class="text-sm font-semibold text-gray-900 mt-1 inline-flex items-center gap-1.5">
                            <i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i>
                            ${n}
                        </p>
                    </div>
                </section>

                ${e.feedback?`
                <section class="mt-6">
                    <p class="modal-label inline-flex items-center gap-1.5">
                        <i data-lucide="message-square-quote" class="w-3.5 h-3.5"></i>
                        Observação da coordenação
                    </p>
                    <div class="mt-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-sm text-amber-900 leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap">${e.feedback}</div>
                </section>
                `:``}

            </div>

            <footer class="flex items-center justify-end gap-3 px-5 sm:px-7 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40">
                <button type="button" class="modal-btn-ghost" data-acao="fechar">
                    Fechar
                </button>
            </footer>
        </article>
    `}function Ye(e){let t=bt(e);if(!t)return;let n=Ot(t.matriculaAluno),r=He(`max-w-xl`);r.innerHTML=Je(t,n),v(),r.querySelectorAll(`[data-acao="fechar"]`).forEach(e=>{e.addEventListener(`click`,k)})}var A={busca:``,status:`todos`},j={pendente:`Pendente`,em_analise:`Em Análise`,requer_ajuste:`Requer Ajuste`,concluido:`Concluído`};function M(e){switch(e){case`pendente`:return`bg-amber-100 text-amber-800 border border-amber-200`;case`em_analise`:return`bg-blue-100 text-blue-800 border border-blue-200`;case`requer_ajuste`:return`bg-rose-100 text-rose-800 border border-rose-200`;case`concluido`:return`bg-emerald-100 text-emerald-800 border border-emerald-200`;default:return`bg-gray-100 text-gray-800 border border-gray-200`}}function Xe(e){return e.filter(e=>{let t=A.status===`todos`||e.status===A.status,n=A.busca.trim().toLowerCase(),r=n===``||e.protocolo.toLowerCase().includes(n)||e.tipo.toLowerCase().includes(n);return t&&r})}function Ze(e){let t=j[e.status]||e.status;return`
        <article class="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold text-gray-500 tracking-wider">#${e.protocolo}</span>
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${M(e.status)}">
                    ${t}
                </span>
            </div>

            <div class="min-w-0">
                <h3 class="text-base font-bold text-gray-900 break-words [overflow-wrap:anywhere]">${e.tipo}</h3>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2 break-words [overflow-wrap:anywhere]">${e.descricao}</p>
            </div>

            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span class="inline-flex items-center gap-1.5">
                    <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                    ${Q(e.dataCriacao)}
                </span>
                <span class="inline-flex items-center gap-1.5">
                    <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                    ${Q(e.dataAtualizacao)}
                </span>
            </div>

            ${e.feedback?`
                <div class="text-xs bg-gray-50 border border-gray-100 rounded-md p-2 text-gray-700">
                    <strong class="text-gray-900">Observação:</strong> ${e.feedback}
                </div>
            `:``}

            <button type="button" data-acao="ver-detalhes" data-protocolo="${e.protocolo}" class="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-primary uppercase tracking-widest hover:underline self-start cursor-pointer">
                Ver Detalhes
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
        </article>
    `}function Qe(e){let t=j[e.status]||e.status;return`
        <tr class="border-t border-gray-100">
            <td class="py-3 text-xs font-semibold text-gray-500">#${e.protocolo}</td>
            <td class="py-3 text-sm text-gray-900 break-words [overflow-wrap:anywhere]">${e.tipo}</td>
            <td class="py-3">
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${M(e.status)}">
                    ${t}
                </span>
            </td>
            <td class="py-3 text-xs text-gray-500">${Q(e.dataAtualizacao)}</td>
        </tr>
    `}function $e(e){let t=j[e.status]||e.status;return`
        <article class="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold text-gray-500 tracking-wider">#${e.protocolo}</span>
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${M(e.status)}">
                    ${t}
                </span>
            </div>
            <h4 class="text-sm font-bold text-gray-900 break-words [overflow-wrap:anywhere]">${e.tipo}</h4>
            <span class="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                Concluído em ${Q(e.dataAtualizacao)}
            </span>
        </article>
    `}function N(e){let t=Xe(e),n=t.filter(e=>e.status!==`concluido`),r=t.filter(e=>e.status===`concluido`),i=document.querySelector(`#listaDemandasAbertas`),a=document.querySelector(`#corpoHistorico`),o=document.querySelector(`#listaHistoricoMobile`),s=document.querySelector(`#contadorAbertas`);if(s&&(s.textContent=n.length),i){let e=n.map(Ze).join(``);i.innerHTML=n.length>0?e+tt():et()}a&&(a.innerHTML=r.length>0?r.map(Qe).join(``):`<tr><td colspan="4" class="py-4 text-center text-xs text-gray-400">Nenhuma demanda concluída ainda.</td></tr>`),o&&(o.innerHTML=r.length>0?r.map($e).join(``):`<div class="bg-white border border-dashed border-gray-200 rounded-xl p-6 text-center text-xs text-gray-400">Nenhuma demanda concluída ainda.</div>`),v()}function et(){return`
        <div class="col-span-full bg-white border border-dashed border-gray-300 rounded-xl p-8 sm:p-10 text-center">
            <h3 class="text-base font-bold text-gray-900">Você ainda não possui solicitações</h3>
            <p class="text-sm text-gray-500 mt-1">
                Quando você abrir uma demanda, ela aparecerá aqui para acompanhamento.
            </p>
        </div>
    `}function tt(){return`
        <button type="button" data-acao="nova-demanda" class="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-primary hover:text-brand-primary hover:bg-white transition-colors min-h-[180px] cursor-pointer">
            <span class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <i data-lucide="plus" class="w-5 h-5"></i>
            </span>
            <span class="text-sm font-bold">Nova Solicitação</span>
            <span class="text-xs">Abra uma nova demanda acadêmica</span>
        </button>
    `}function P(e){let t=document.querySelector(`#drawerMobile`),n=document.querySelector(`#drawerPainel`);!t||!n||(e?(t.classList.remove(`hidden`),setTimeout(()=>n.classList.remove(`-translate-x-full`),10),document.body.classList.add(`overflow-hidden`)):(n.classList.add(`-translate-x-full`),document.body.classList.remove(`overflow-hidden`),setTimeout(()=>t.classList.add(`hidden`),200)))}function F(){if(!JSON.parse(localStorage.getItem(`usuarioLogado`))){B(),z();return}L(`inicio`),I(`inicio`),document.querySelectorAll(`[data-view]`).forEach(e=>{e.addEventListener(`click`,()=>{L(e.dataset.view),I(e.dataset.view)})});function e(){let e=document.querySelector(`[data-view].text-orange-600`);L(e?e.dataset.view:`demandas`)}function t(){We({onCriado:e})}let n=document.querySelector(`#btnNovaDemandaDesktop`),r=document.querySelector(`#btnNovaDemandaMobile`);n&&n.addEventListener(`click`,t),r&&r.addEventListener(`click`,t);let i=document.querySelector(`#alunoContent`);i&&i.addEventListener(`click`,e=>{let n=e.target.closest(`[data-acao="ver-detalhes"]`);if(n){let e=n.getAttribute(`data-protocolo`);e&&Ye(e);return}e.target.closest(`[data-acao="nova-demanda"]`)&&t()});let a=document.querySelectorAll(`.btnSairConta`);for(let e=0;e<a.length;++e)a[e].addEventListener(`click`,()=>{localStorage.removeItem(`usuarioLogado`),localStorage.removeItem(`auth`),document.body.classList.remove(`overflow-hidden`),B(),z()});let o=document.querySelector(`#abrirDrawer`),s=document.querySelector(`#fecharDrawer`),c=document.querySelector(`#drawerOverlay`);o&&o.addEventListener(`click`,()=>P(!0)),s&&s.addEventListener(`click`,()=>P(!1)),c&&c.addEventListener(`click`,()=>P(!1))}function nt(e){let t=e.length,n=e.filter(e=>e.status===`em_analise`).length,r=e.filter(e=>e.status===`concluido`).length;return{total:t,emAnalise:n,eficiencia:t>0?Math.round(r/t*100):0}}function rt(){return`
        <button type="button" data-view="inicio" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
            <i data-lucide="home" class="w-4 h-4"></i> Início
        </button>
        <button type="button" data-view="demandas" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
            <i data-lucide="clipboard-list" class="w-4 h-4"></i> Central de Demandas
        </button>
        <button type="button" data-view="turmas" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M12 22s8-4 8-10V5l-8 3-8-3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span class="font-medium">Turmas</span>
                </button>   
    `}function it(t,n,r){let i=r.eficiencia,a=t.slice().sort((e,t)=>new Date(t.dataAtualizacao)-new Date(e.dataAtualizacao)).slice(0,3),o=``;return o=a.length===0?`<div class="p-4 text-center text-sm text-zinc-500">Nenhuma demanda recente.</div>`:a.map(e=>{let t=j[e.status]||e.status;return`
            <div class="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between hover:bg-zinc-50 transition-colors">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gray-100 flex items-center justify-center text-brand-primary font-bold rounded">#${e.protocolo.substring(0,4)}</div>
                    <div>
                        <h4 class="font-bold text-base text-zinc-900">${e.tipo}</h4>
                        <p class="text-sm text-zinc-500">Atualizado em: ${Q(e.dataAtualizacao)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 lg:gap-8">
                    <span class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${M(e.status)}">${t}</span>
                    <button type="button" data-view="demandas" class="text-zinc-400 hover:text-brand-primary transition-colors cursor-pointer"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
                </div>
            </div>`}).join(``),`
        <div class="space-y-6 max-w-6xl mx-auto">
            <section class="relative overflow-hidden bg-zinc-900 p-6 md:p-8 text-white rounded-2xl shadow-md">
                <div class="absolute inset-0 opacity-15">
                    <img class="w-full h-full object-cover" src="${e}"/>
                </div>
                <div class="relative z-10 space-y-4">
                    <span class="text-orange-500 font-bold text-[10px] tracking-[0.2em] uppercase block">PORTAL DO ALUNO</span>
                    <h1 class="text-3xl lg:text-4xl font-semibold">Bem-vindo, ${n}</h1>
                    <p class="text-zinc-400 text-sm lg:text-base max-w-2xl">Acompanhe suas solicitações acadêmicas e comunique-se com a coordenação de forma clara e ágil.</p>
                </div>
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <i data-lucide="bar-chart" class="w-6 h-6 text-brand-primary"></i>
                        <span class="text-[10px] font-bold text-gray-400 uppercase">Demandas Atendidas</span>
                    </div>
                    <div class="mt-4">
                        <div class="flex justify-between items-end mb-2">
                            <h3 class="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold">PROGRESSO</h3>
                            <span class="text-xl font-bold text-gray-900">${i}%</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5">
                            <div class="bg-brand-primary h-2.5 rounded-full transition-all duration-500" style="width: ${i}%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2 font-medium">${r.total>0?r.concluidas+` de `+r.total+` concluídas`:`Sem demandas`}</p>
                    </div>
                </div>

                <div class="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div class="flex justify-between items-start gap-4">
                        <i data-lucide="message-circle" class="w-6 h-6 text-orange-500"></i>
                        <span class="bg-orange-100 text-orange-800 text-[10px] px-2 py-0.5 font-bold rounded uppercase">CONTATO</span>
                    </div>
                    <div class="mt-4">
                        <h3 class="text-gray-500 uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">SUPORTE</h3>
                        <p class="text-sm text-gray-700 mb-4 font-medium">Fale diretamente com o coordenador do seu curso.</p>
                        <a href="mailto:coordenacao@clarify.edu.br" class="inline-flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto">
                            <i data-lucide="mail" class="w-4 h-4"></i>
                            Enviar Mensagem
                        </a>
                    </div>
                </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div class="bg-gray-50 border-b border-gray-200 px-5 py-4 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <h2 class="font-bold text-base lg:text-lg flex items-center gap-2 text-gray-900">
                        <i data-lucide="clock" class="w-5 h-5 text-gray-500"></i>
                        Demandas Recentes
                    </h2>
                    <button type="button" data-view="demandas" class="text-xs font-bold text-brand-primary hover:underline cursor-pointer">VER TODAS</button>
                </div>
                <div class="divide-y divide-gray-100">
                    ${o}
                </div>
            </div>
        </div>
    `}function at(e,t,n,r){return`
        <div class="max-w-6xl mx-auto">
            <!-- Cabeçalho da página -->
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <p class="hidden md:inline-flex text-xs font-semibold text-gray-400 uppercase tracking-widest items-center gap-1">
                        Portal <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i> Central de Demandas
                    </p>
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 md:mt-1">Central de Demandas</h2>
                    <p class="text-sm text-gray-500 mt-1">
                        Olá, ${e}. Acompanhe aqui suas solicitações.
                    </p>
                </div>

                <button type="button" data-acao="nova-demanda" class="hidden sm:inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-bold px-5 py-3 rounded-xl shadow hover:bg-orange-700 transition-colors cursor-pointer self-start sm:self-auto">
                    <i data-lucide="plus" class="w-4 h-4"></i> Nova Demanda
                </button>
            </div>

            <!-- Métricas -->
            <div class="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 md:mb-8 flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-2 sm:pb-0">
                <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total de Solicitações</p>
                    <div class="flex items-end gap-3 mt-2">
                        <span class="text-3xl font-bold text-gray-900">${t}</span>
                        <span class="text-xs text-gray-500 pb-1">no semestre</span>
                    </div>
                </div>

                <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Em Análise</p>
                    <div class="flex items-end gap-3 mt-2">
                        <span class="text-3xl font-bold text-gray-900">${n<10?`0`+n:n}</span>
                        <i data-lucide="hourglass" class="w-4 h-4 text-blue-500 mb-2"></i>
                    </div>
                </div>

                <div class="min-w-[80%] shrink-0 snap-start sm:min-w-0 sm:shrink bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eficiência</p>
                    <div class="flex items-center gap-3 mt-2">
                        <span class="text-3xl font-bold text-gray-900">${r}%</span>
                        <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-brand-primary rounded-full" style="width: ${r}%"></div>
                        </div>
                    </div>
                    <p class="text-[10px] text-gray-400 mt-1">Demandas concluídas sobre o total</p>
                </div>
            </div>

            <!-- Barra de filtros -->
            <div class="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 flex flex-wrap gap-2 sm:gap-3 items-center mb-6 md:mb-8 shadow-sm">
                <div class="flex-1 min-w-[12rem] relative">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                        type="text"
                        id="filtroBusca"
                        placeholder="Pesquisar protocolo ou tipo..."
                        class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div class="relative">
                    <i data-lucide="filter" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    <select id="filtroStatus" class="pl-9 pr-8 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer max-w-[10rem] sm:max-w-none">
                        <option value="todos">Status: Todos</option>
                        <option value="pendente">Pendente</option>
                        <option value="em_analise">Em Análise</option>
                        <option value="requer_ajuste">Requer Ajuste</option>
                        <option value="concluido">Concluído</option>
                    </select>
                </div>

                <button id="limparFiltros" type="button" class="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline px-2 cursor-pointer" title="Limpar filtros">
                    <i data-lucide="x" class="w-4 h-4"></i>
                    <span class="hidden sm:inline">Limpar Filtros</span>
                </button>
            </div>

            <!-- Demandas em aberto -->
            <section class="mb-10">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900">
                        Em Aberto
                        <span id="contadorAbertas" class="ml-2 text-xs font-bold text-gray-400 align-middle">0</span>
                    </h3>
                    <a href="#" class="text-xs font-semibold text-brand-primary hover:underline inline-flex items-center gap-1">
                        <span class="hidden sm:inline">Ver histórico completo</span>
                        <span class="sm:hidden">Histórico</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>

                <div id="listaDemandasAbertas" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                </div>
            </section>

            <!-- Histórico recente -->
            <section class="pb-24 sm:pb-0">
                <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
                    <i data-lucide="history" class="w-5 h-5 text-gray-500"></i>
                    Histórico Recente
                </h3>

                <!-- Mobile: cards -->
                <div id="listaHistoricoMobile" class="md:hidden space-y-3"></div>

                <!-- Desktop: tabela -->
                <div class="hidden md:block bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto shadow-sm">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <th class="pb-2">Protocolo</th>
                                <th class="pb-2">Assunto</th>
                                <th class="pb-2">Status</th>
                                <th class="pb-2">Última Modificação</th>
                            </tr>
                        </thead>
                        <tbody id="corpoHistorico"></tbody>
                    </table>
                </div>
            </section>
        </div>
    `}function I(e){document.querySelectorAll(`[data-view]`).forEach(t=>{t.dataset.view===e?(t.classList.add(`bg-orange-50`,`text-orange-600`),t.classList.remove(`text-gray-700`)):(t.classList.remove(`bg-orange-50`,`text-orange-600`),t.classList.add(`text-gray-700`))})}function L(e=`inicio`){let t=document.querySelector(`#alunoContent`);if(!t)return;let n=JSON.parse(localStorage.getItem(`usuarioLogado`))||{},r=(n.nome||`Aluno`).split(` `)[0],i=yt(n.matricula),a=nt(i);if(e===`inicio`)t.innerHTML=it(i,r,a);else if(e===`demandas`){t.innerHTML=at(r,a.total,a.emAnalise,a.eficiencia),N(i);let e=document.querySelector(`#filtroBusca`);e&&e.addEventListener(`input`,e=>{A.busca=e.target.value,N(i)});let n=document.querySelector(`#filtroStatus`);n&&n.addEventListener(`change`,e=>{A.status=e.target.value,N(i)});let o=document.querySelector(`#limparFiltros`);o&&o.addEventListener(`click`,()=>{A.busca=``,A.status=`todos`,document.querySelector(`#filtroBusca`).value=``,document.querySelector(`#filtroStatus`).value=`todos`,N(i)})}t.querySelectorAll(`[data-view]`).forEach(e=>{e.addEventListener(`click`,()=>{L(e.dataset.view),I(e.dataset.view)})}),v()}function R(){$(`centraldemandas`),document.querySelector(`title`).innerHTML=`Central de Demandas - Clarify`,JSON.parse(localStorage.getItem(`usuarioLogado`)),document.querySelector(`#app`).innerHTML=`
    <div class="min-h-screen w-full flex bg-brand-surface">

        <!-- Sidebar (desktop) -->
        ${n()}
        
        <!-- Drawer de navegação (mobile) -->
        <div id="drawerMobile" class="fixed inset-0 z-40 hidden md:hidden">
            <div id="drawerOverlay" class="absolute inset-0 bg-black/40"></div>
            <aside id="drawerPainel" class="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-white shadow-xl flex flex-col -translate-x-full transition-transform duration-200 ease-out">
                <div class="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                    <div>
                        <h1 class="text-lg font-bold text-brand-primary">Clarify</h1>
                        <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mt-0.5">
                            Federal Institution
                        </p>
                    </div>
                    <button id="fecharDrawer" type="button" class="w-9 h-9 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer" title="Fechar menu">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <nav class="flex-1 px-4 py-4 space-y-1 text-sm overflow-y-auto">
                    ${rt()}
                </nav>
            </aside>
        </div>

        <!-- Conteúdo principal -->
        <main class="flex-1 overflow-x-hidden flex flex-col h-screen">

            <!-- Topbar mobile (sticky) -->
            <header class="md:hidden shrink-0 sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between gap-3 px-4 h-14">
                <div class="flex items-center gap-2">
                    <button id="abrirDrawer" type="button" class="-ml-2 w-10 h-10 flex items-center justify-center text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" title="Abrir menu">
                        <i data-lucide="menu" class="w-5 h-5"></i>
                    </button>
                    <h1 class="text-lg font-bold text-brand-primary">Clarify</h1>
                </div>

                <div class="flex items-center gap-1.5">
                    <button type="button" class="w-9 h-9 rounded-full text-gray-500 hover:text-brand-primary hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer" title="Notificações">
                        <i data-lucide="bell" class="w-4 h-4"></i>
                    </button>
                    ${y(JSON.parse(localStorage.getItem(`usuarioLogado`)))}
                </div>
            </header>

            <div class="px-4 py-5 md:px-10 md:py-8 flex-1 overflow-y-auto w-full">

                <!-- Topbar desktop -->
                <div class="hidden md:flex items-center justify-between gap-3 mb-8">
                    <a href="/" class="flex items-center gap-2.5 group">
                        <img src="${e}" alt="Clarify" class="w-10 h-10 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)] transition-transform group-hover:scale-105" />
                        <div class="leading-none">
                            <p class="text-lg font-bold text-slate-900 tracking-tight">Clarify</p>
                            <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                        </div>
                    </a>

                    <div class="flex items-center gap-3">
                        <button type="button" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
                            <i data-lucide="bell" class="w-4 h-4"></i>
                        </button>
                        <button type="button" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer">
                            <i data-lucide="help-circle" class="w-4 h-4"></i>
                        </button>
                        ${y(JSON.parse(localStorage.getItem(`usuarioLogado`)))}
                    </div>
                </div>

                <div id="alunoContent"></div>
            </div>

            <!-- FAB Nova Demanda (mobile) -->
            <button id="btnNovaDemandaMobile" type="button" class="sm:hidden fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-brand-primary text-white shadow-lg shadow-orange-900/20 flex items-center justify-center hover:bg-orange-700 transition-colors cursor-pointer" title="Nova Demanda">
                <i data-lucide="plus" class="w-6 h-6"></i>
            </button>

        </main>

    </div>
    `}function ot(e){if(e===`aluno`){R(),F();return}E(),T(),Be()}function st(e){let t=new FormData(e.target),{institutionalId:n,securityKey:r}=Object.fromEntries(t.entries()),i=gt(n,r);i.ok&&ot(i.usuarioLogado.cargo)}function z(){document.querySelector(`#loginForm`).addEventListener(`submit`,e=>{e.preventDefault(),st(e)});let e=document.querySelector(`#irRegistro`);e&&e.addEventListener(`click`,e=>{e.preventDefault(),$(`registro`)})}function B(){$(`login`),document.querySelector(`title`).innerHTML=`Login - Clarify`,document.querySelector(`#app`).innerHTML=`
    <div class="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden animate-cubes">
        <!-- Fundo Geométrico com Losangos -->
        <div class="absolute inset-0 opacity-15 pointer-events-none animate-cubes" 
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
            <img 
                src="${e}" 
                alt="Clarify Logo" 
                class="w-full h-full object-contain"
            />
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
                Chave de Segurança
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
            class="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 hover:cursor-pointer hover:-translate-y-1 transition-transform duration-150 ease-out transform"
            >
            Autenticar
            </button>

            <div class="text-center">
            <a href="#" class="text-sm font-semibold text-brand-primary hover:underline transition-all">
                Recuperar Credenciais de Acesso
            </a>
            </div>
            <div class="text-center">
            <a href="#" id="irRegistro" class="text-sm font-semibold text-brand-primary hover:underline transition-all">
                Ir para o Registro
            </a>
            </div>
        </form>

        <div class="mt-12 text-center">
            <p class="text-xs text-gray-400 font-medium">Somente indivíduos autorizados.</p>
            <p class="text-xs text-gray-300 mt-1">Versão v0.0.0</p>
        </div>
        </div>
    </div>
`}function ct(){let e=document.querySelector(`#fullName`).value,t=document.querySelector(`#institutionalId`).value,n=document.querySelector(`#institutionalEmail`).value,r=document.querySelector(`#securityKey`).value,i=document.querySelector(`#activationKey`).value,a=Z(t,n),o=a?!0:Ct(i);if(a||!o){if(a){Y(`Usuário já cadastrado.`),J([`#fullName`,`#institutionalEmail`,`#securityKey`,`#activationKey`]);return}Y(`Chave de ativação inválida ou já utilizada.`),J([`#activationKey`]);return}Tt(e,t,n,r,`coordenador`),alert(`Registro feito com sucesso!`);let s={nome:e,matricula:t,email:n,cargo:`coordenador`};localStorage.setItem(`usuarioLogado`,JSON.stringify(s)),localStorage.setItem(`auth`,!0),E()}function lt(){document.querySelector(`#registrationForm`).addEventListener(`submit`,e=>{e.preventDefault(),ct()});let e=document.querySelector(`#voltarLogin`);e&&(e.onclick=()=>{B(),z()})}function ut(){$(`registro`),document.querySelector(`title`).innerHTML=`Registro - Clarify`,document.querySelector(`#app`).innerHTML=`
        <div class="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
            <!-- Fundo Geométrico com Losangos -->
            <div class="absolute inset-0 opacity-15 pointer-events-none animate-cubes" 
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
                    src="${e}" 
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

                <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                    Chave de ativação
                </label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    </span>
                    <input
                    type="password"
                    name="activationKey"
                    id="activationKey"
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
    `}var dt={ArrowRight:d,Bell:f,Calendar:p,Check:m,CheckCircle2:re,Clock:se,Eye:ce,GraduationCap:de,Plus:xe,Send:Ce,UserCog:Te,Users:Ee};function V(){$(``),document.querySelector(`title`).innerHTML=`Clarify`,document.querySelector(`#app`).innerHTML=`
    <div class="relative min-h-screen text-slate-900 overflow-x-hidden">

        <!-- Fundo ambiente, bem sutil -->
        <div class="pointer-events-none fixed inset-0 -z-10">
            <div class="absolute inset-0 bg-dot-grid opacity-25"></div>
            <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-radial-warm opacity-70"></div>
        </div>

        <!-- Nav -->
        <nav id="landingNav" class="sticky top-0 z-30 border-b border-transparent">
            <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#topo" class="flex items-center gap-2.5">
                    <img src="${e}" alt="Clarify" class="w-9 h-9 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)]" />
                    <div class="leading-none">
                        <p class="text-base font-bold text-slate-900 tracking-tight">Clarify</p>
                        <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                    </div>
                </a>

                <div class="hidden md:flex items-center gap-1">
                    <a href="#como-funciona" class="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Como funciona</a>
                    <a href="#quem-usa" class="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Perfis</a>
                </div>

                <div class="flex items-center gap-2">
                    <a href="/registro" class="btnCriarConta hidden sm:inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 transition-colors">
                        Criar conta
                    </a>
                    <a href="/login" class="btnEntrar btn-primary-cta inline-flex items-center gap-1.5 text-sm font-bold rounded-full px-4 py-2">
                        Entrar
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section id="topo" class="relative pt-14 md:pt-24 pb-16 md:pb-24">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center max-w-3xl mx-auto" data-reveal>
                    <h1 class="text-4xl md:text-6xl font-bold tracking-headline leading-[1.05] text-slate-900">
                        Aberto, em análise,<br/>
                        <span class="text-gradient-warm">resolvido.</span>
                    </h1>

                    <p class="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
                        O caminho de cada solicitação acadêmica, do clique do aluno à resposta da coordenação. Em um lugar só, com protocolo único e histórico do semestre.
                    </p>

                    <div class="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href="/login" class="btnEntrar btn-primary-cta inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-6 py-3 w-full sm:w-auto">
                            Entrar
                            <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                        <a href="/registro" class="btnCriarConta btn-ghost-cta inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-6 py-3 w-full sm:w-auto">
                            Criar conta
                        </a>
                    </div>

                    <p class="mt-5 text-xs text-slate-400">
                        Acesso por matrícula institucional · Cadastro de coordenadores por chave de ativação
                    </p>
                </div>

                <!-- Preview da Central de Demandas -->
                <div class="mt-16 md:mt-24 relative max-w-5xl mx-auto" data-reveal>
                    <div class="pointer-events-none absolute -inset-x-12 -inset-y-10">
                        <div class="absolute inset-x-10 top-6 h-72 rounded-[3rem] bg-gradient-to-br from-brand-primary/25 via-orange-300/25 to-amber-200/20 blur-3xl"></div>
                    </div>

                    <div class="relative preview-tilt">
                        <div class="relative bg-white border border-slate-200/80 rounded-3xl shadow-soft-xl overflow-hidden">
                            <!-- Browser chrome -->
                            <div class="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
                                <span class="w-2.5 h-2.5 rounded-full bg-rose-300"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
                                <span class="ml-3 text-[11px] text-slate-400 font-mono tracking-tight">clarify.app/centraldemandas</span>
                                <span class="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    ao vivo
                                </span>
                            </div>

                            <div class="p-5 md:p-8">
                                <div class="flex items-end justify-between mb-5">
                                    <div>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Portal · Central de Demandas</p>
                                        <h3 class="text-xl md:text-2xl font-bold text-slate-900 mt-1">Em Aberto <span class="text-slate-300 ml-1 text-base">3</span></h3>
                                    </div>
                                    <span class="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 rounded-full px-3 py-1.5">
                                        <i data-lucide="plus" class="w-3.5 h-3.5"></i> Nova demanda
                                    </span>
                                </div>

                                <div class="grid md:grid-cols-3 gap-3.5">
                                    <!-- Card 1: Em Análise -->
                                    <article class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-402</span>
                                            <span class="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-blue-50 text-blue-800 border-blue-200">Em Análise</span>
                                        </div>
                                        <h4 class="text-sm font-bold text-slate-900 leading-snug">Quebra de Pré-requisito</h4>
                                        <p class="text-[12px] text-slate-500 leading-relaxed line-clamp-2">Solicitação de matrícula em Compiladores antes de Linguagens Formais.</p>
                                        <div class="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 02 Out</span>
                                            <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> hoje</span>
                                        </div>
                                    </article>

                                    <!-- Card 2: Pendente -->
                                    <article class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-419</span>
                                            <span class="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200">Pendente</span>
                                        </div>
                                        <h4 class="text-sm font-bold text-slate-900 leading-snug">Revisão de Prova</h4>
                                        <p class="text-[12px] text-slate-500 leading-relaxed line-clamp-2">Pedido de revisão da prova final de Estrutura de Dados.</p>
                                        <div class="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 02 Out</span>
                                            <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> hoje</span>
                                        </div>
                                    </article>

                                    <!-- Card 3: Requer Ajuste -->
                                    <article class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-388</span>
                                            <span class="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-rose-50 text-rose-800 border-rose-200">Requer Ajuste</span>
                                        </div>
                                        <h4 class="text-sm font-bold text-slate-900 leading-snug">Aproveitamento AC</h4>
                                        <p class="text-[12px] text-slate-500 leading-relaxed line-clamp-2">40h validadas — pendência: anexar declaração legível.</p>
                                        <div class="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 02 Out</span>
                                            <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> hoje</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>

                        <!-- Cartão flutuante: concluído -->
                        <div class="hidden md:flex absolute -left-10 bottom-10 items-center gap-3 bg-white border border-slate-200/80 rounded-2xl shadow-soft-md px-4 py-3 animate-float-slow">
                            <span class="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
                            </span>
                            <div class="leading-tight">
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">REQ-320</p>
                                <p class="text-sm font-semibold text-slate-900">Concluído em 15 Out</p>
                            </div>
                        </div>

                        <!-- Cartão flutuante: notificação -->
                        <div class="hidden md:flex absolute -right-8 top-16 items-center gap-3 bg-white border border-slate-200/80 rounded-2xl shadow-soft-md px-4 py-3 animate-float-slow" style="animation-delay: -3s">
                            <span class="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                                <i data-lucide="bell" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                            <div class="leading-tight">
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">novidade</p>
                                <p class="text-sm font-semibold text-slate-900">Sua demanda foi deferida</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tipos de demanda -->
        <section class="relative border-y border-slate-200/60 bg-white/70 backdrop-blur py-10 md:py-12">
            <div class="max-w-6xl mx-auto px-6">
                <p class="text-center text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400 mb-6">Tipos de demanda suportados</p>
                <div class="flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Quebra de Pré-requisito</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Revisão de Prova</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Aproveitamento de Horas AC</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Trancamento de Disciplina</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Troca de Turma</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Justificativa de Falta</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Histórico Escolar</span>
                </div>
            </div>
        </section>

        <!-- Como funciona -->
        <section id="como-funciona" class="relative py-24 md:py-28">
            <div class="max-w-6xl mx-auto px-6">
                <div class="max-w-2xl mb-12 md:mb-14" data-reveal>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.32em]">Fluxo</span>
                    <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-headline leading-[1.1] text-slate-900">
                        Como uma demanda caminha.
                    </h2>
                    <p class="mt-4 text-slate-500 leading-relaxed">
                        O mesmo trajeto, do começo ao fim, para qualquer tipo de solicitação.
                    </p>
                </div>

                <div class="relative grid md:grid-cols-3 gap-4 md:gap-5" data-reveal>
                    <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                    <!-- Passo 01 -->
                    <div class="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl font-bold text-slate-300 tracking-tight font-mono">01</span>
                            <span class="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <i data-lucide="send" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 tracking-tight">O aluno abre a demanda.</h3>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">Escolhe o tipo, descreve o pedido e recebe um protocolo. A demanda entra na fila como Pendente.</p>
                    </div>

                    <!-- Passo 02 -->
                    <div class="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl font-bold text-slate-300 tracking-tight font-mono">02</span>
                            <span class="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <i data-lucide="eye" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 tracking-tight">A coordenação analisa.</h3>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">Defere, devolve para ajuste ou envia para análise pedagógica — sempre com a observação registrada.</p>
                    </div>

                    <!-- Passo 03 -->
                    <div class="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl font-bold text-slate-300 tracking-tight font-mono">03</span>
                            <span class="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 tracking-tight">O aluno acompanha.</h3>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">O status muda na própria tela. Quando conclui, a demanda vai para o histórico do semestre.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Perfis -->
        <section id="quem-usa" class="relative py-24 md:py-28">
            <div class="max-w-6xl mx-auto px-6">
                <div class="max-w-2xl mb-12 md:mb-14" data-reveal>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.32em]">Perfis</span>
                    <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-headline leading-[1.1] text-slate-900">
                        Três perfis. Cada um com seu acesso.
                    </h2>
                    <p class="mt-4 text-slate-500 leading-relaxed">
                        Cada perfil enxerga só o que precisa.
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-4" data-reveal>
                    <!-- Aluno -->
                    <article class="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <i data-lucide="graduation-cap" class="w-4.5 h-4.5 text-brand-primary"></i>
                        </span>
                        <p class="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Aluno</p>
                        <h3 class="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Solicita e acompanha.</h3>
                        <p class="mt-2.5 text-sm text-slate-500 leading-relaxed">Abre demandas como Quebra de Pré-requisito ou Aproveitamento de Horas AC. Vê o status mudar e lê a observação da coordenação no próprio card.</p>
                    </article>

                    <!-- Coordenador -->
                    <article class="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <i data-lucide="user-cog" class="w-4.5 h-4.5 text-brand-primary"></i>
                        </span>
                        <p class="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Coordenador</p>
                        <h3 class="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Recebe, prioriza, decide.</h3>
                        <p class="mt-2.5 text-sm text-slate-500 leading-relaxed">Painel com a fila de demandas e prazos críticos. Cada solicitação chega com o histórico do aluno e o contexto necessário para responder.</p>
                    </article>

                    <!-- Professor -->
                    <article class="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <i data-lucide="users" class="w-4.5 h-4.5 text-brand-primary"></i>
                        </span>
                        <p class="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Professor</p>
                        <h3 class="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Análise pedagógica.</h3>
                        <p class="mt-2.5 text-sm text-slate-500 leading-relaxed">Acesso por chave de ativação institucional, com perfil dedicado para revisões de prova, justificativas de falta e validação de aproveitamento.</p>
                    </article>
                </div>
            </div>
        </section>

        <!-- Painel de acesso -->
        <section class="relative py-20 md:py-24">
            <div class="max-w-3xl mx-auto px-6">
                <div class="bg-white border border-slate-200/70 rounded-2xl p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10" data-reveal>
                    <div class="flex-1">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Acesso</p>
                        <h2 class="mt-1.5 text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Acessar a Central de Demandas</h2>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">
                            Use sua matrícula institucional. O cadastro inicial requer chave de ativação fornecida pela coordenação.
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                        <a href="/login" class="btnEntrar btn-primary-cta px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2">
                            Entrar
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                        <a href="/registro" class="btnCriarConta btn-ghost-cta px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center">
                            Criar conta
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="relative border-t border-slate-200/60 bg-white/60 backdrop-blur">
            <div class="max-w-6xl mx-auto px-6 py-12 md:py-14 grid md:grid-cols-4 gap-8 md:gap-10">
                <div class="md:col-span-2">
                    <a href="#topo" class="flex items-center gap-2.5">
                        <img src="${e}" alt="Clarify" class="w-9 h-9 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)]" />
                        <div class="leading-none">
                            <p class="text-base font-bold text-slate-900 tracking-tight">Clarify</p>
                            <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                        </div>
                    </a>
                    <p class="mt-4 text-sm text-slate-500 max-w-sm leading-relaxed">
                        Sistema interno da instituição para abertura, análise e acompanhamento de demandas acadêmicas.
                    </p>
                </div>

                <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-3.5">Seções</p>
                    <ul class="space-y-2 text-sm text-slate-600">
                        <li><a href="#como-funciona" class="hover:text-brand-primary transition-colors">Como funciona</a></li>
                        <li><a href="#quem-usa" class="hover:text-brand-primary transition-colors">Perfis</a></li>
                    </ul>
                </div>

                <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-3.5">Acesso</p>
                    <ul class="space-y-2 text-sm text-slate-600">
                        <li><a href="/login" class="btnEntrar hover:text-brand-primary transition-colors">Entrar</a></li>
                        <li><a href="/registro" class="btnCriarConta hover:text-brand-primary transition-colors">Criar conta</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-slate-200/60">
                <div class="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <p>© ${new Date().getFullYear()} Clarify · Federal Institution</p>
                    <p>Uso institucional</p>
                </div>
            </div>
        </footer>

    </div>
    `,_({icons:dt,attrs:{"stroke-width":1.6}})}function H(){let e=document.querySelectorAll(`.btnEntrar`);for(let t=0;t<e.length;++t)e[t].addEventListener(`click`,e=>{e.preventDefault(),$(`login`)});let t=document.querySelectorAll(`.btnCriarConta`);for(let e=0;e<t.length;++e)t[e].addEventListener(`click`,e=>{e.preventDefault(),$(`registro`)});let n=document.querySelectorAll(`a[href^="#"]`);for(let e=0;e<n.length;++e)n[e].addEventListener(`click`,t=>{let r=n[e].getAttribute(`href`).slice(1);if(r===``)return;let i=document.getElementById(r);i&&(t.preventDefault(),i.scrollIntoView({behavior:`smooth`,block:`start`}))});let r=document.getElementById(`landingNav`);r&&window.addEventListener(`scroll`,()=>{window.scrollY>12?r.classList.add(`is-scrolled`):r.classList.remove(`is-scrolled`)});let i=document.querySelectorAll(`[data-reveal]`),a=new IntersectionObserver(e=>{for(let t=0;t<e.length;++t)e[t].isIntersecting&&(e[t].target.classList.add(`is-revealed`),a.unobserve(e[t].target))},{threshold:.12});for(let e=0;e<i.length;++e)a.observe(i[e])}var U=()=>localStorage.getItem(`auth`)===`true`,W=()=>{try{return JSON.parse(localStorage.getItem(`usuarioLogado`)||`{}`).cargo||``}catch{return``}},G=(e,t,n)=>{e&&window.history.replaceState({},``,e),t&&t(),n&&n()},ft=()=>G(`/login`,B,z),pt=()=>G(`/registro`,ut,lt),K=()=>{E(),T(),Be()},mt=()=>{R(),F()};function q(e){switch(e){case`/`:V(),H();break;case`/registro`:pt();break;case`/login`:ft();break;case`/dashboardcoord`:if(!U()){V(),H();break}if(W()===`aluno`){G(`/centraldemandas`,R,F);break}K();break;case`/dashboardaluno`:if(!U()){V(),H();break}if(W()!==`aluno`){G(`/dashboardcoord`,K);break}case`/centraldemandas`:if(!U()){V(),H();break}W()===`aluno`?G(`/centraldemandas`,mt):G(`/dashboardcoord`,K);break;default:V(),H();break}}function J(e){for(let t=0;t<e.length;++t){let n=document.querySelector(`${e[t]}`);n.value=``}}function Y(e,t=`#submitIncorrectAlert label`){let n=document.querySelector(t);n&&(n.textContent=e)}var X={USUARIO_NAO_ENCONTRADO:`Usuário não encontrado.`,CHAVE_INCORRETA:`Chave de segurança incorreta.`};function Z(e,t){return(JSON.parse(localStorage.getItem(`usuarios`))||[]).some(n=>{let r=n.matricula,i=n.email;return String(r)===String(e)||String(i)===String(t)})}function ht(e,t){return(JSON.parse(localStorage.getItem(`usuarios`))||[]).find(n=>{let r=n.matricula,i=n.senha;return String(r)===String(e)&&String(i)===String(t)})}function gt(e,t){let n=ht(e,t);if(n){let{senha:e,...t}=n;return localStorage.setItem(`usuarioLogado`,JSON.stringify(t)),localStorage.setItem(`auth`,!0),{ok:!0,usuarioLogado:t}}return Z(e)?(Y(X.CHAVE_INCORRETA),J([`#securityKey`]),{ok:!1}):(Y(X.USUARIO_NAO_ENCONTRADO),J([`#institutionalId`,`#securityKey`]),{ok:!1})}function _t(){localStorage.setItem(`usuarios`,JSON.stringify([{nome:`João da Silva`,matricula:`123`,email:`joao@academico.edu.br`,senha:`123456`,cargo:`coordenador`,alunosCadastrados:[`003`,`456`]},{nome:`Maria Aparecida`,matricula:`003`,email:`maria@academico.edu.br`,senha:`123456`,cargo:`aluno`,coordenador:`123`},{nome:`Carlos Eduardo`,matricula:`456`,email:`carlos@academico.edu.br`,senha:`123456`,cargo:`aluno`,coordenador:`123`}])),vt()}function vt(){localStorage.setItem(`demandas`,JSON.stringify([{protocolo:`REQ-402`,matriculaAluno:`003`,tipo:`Quebra de Pré-requisito`,descricao:`Solicitação para cursar Cálculo III sem a aprovação em Cálculo II.`,status:`pendente`,dataCriacao:`2025-11-12`,dataAtualizacao:`2025-11-12`,feedback:``},{protocolo:`REQ-398`,matriculaAluno:`003`,tipo:`Revisão de Prova`,descricao:`Discordância em relação à correção da questão 4 da prova de Banco de Dados.`,status:`em_analise`,dataCriacao:`2025-11-08`,dataAtualizacao:`2026-05-04`,feedback:``},{protocolo:`REQ-385`,matriculaAluno:`003`,tipo:`Aproveitamento de Horas AC`,descricao:`Envio de certificados de cursos extracurriculares para integralização.`,status:`pendente`,dataCriacao:`2025-11-02`,dataAtualizacao:`2025-11-02`,feedback:``},{protocolo:`REQ-350`,matriculaAluno:`003`,tipo:`Trancamento de Disciplina`,descricao:`Pedido de trancamento da disciplina de Sistemas Operacionais.`,status:`concluido`,dataCriacao:`2025-10-15`,dataAtualizacao:`2025-10-25`,feedback:`Trancamento aprovado. Disciplina removida do histórico do semestre.`},{protocolo:`REQ-342`,matriculaAluno:`003`,tipo:`Troca de Turma`,descricao:`Mudança da turma da manhã para a turma da noite por motivo de trabalho.`,status:`em_analise`,dataCriacao:`2025-10-12`,dataAtualizacao:`2025-10-22`,feedback:``},{protocolo:`REQ-320`,matriculaAluno:`003`,tipo:`Solicitação de Histórico`,descricao:`Emissão do histórico escolar atualizado para fins de estágio.`,status:`concluido`,dataCriacao:`2025-10-05`,dataAtualizacao:`2025-10-15`,feedback:`Documento disponível para retirada na secretaria.`},{protocolo:`REQ-310`,matriculaAluno:`003`,tipo:`Justificativa de Falta`,descricao:`Atestado médico referente às faltas dos dias 22 e 23 de setembro.`,status:`requer_ajuste`,dataCriacao:`2025-09-25`,dataAtualizacao:`2025-09-30`,feedback:`Atestado precisa estar legível e conter o CID. Reenviar.`}]))}function yt(e){return(JSON.parse(localStorage.getItem(`demandas`))||[]).filter(t=>String(t.matriculaAluno)===String(e))}function bt(e){return(JSON.parse(localStorage.getItem(`demandas`))||[]).find(t=>t.protocolo===e)}function xt(){let e=JSON.parse(localStorage.getItem(`demandas`))||[],t=0;for(let n=0;n<e.length;++n){let r=Number(e[n].protocolo.split(`-`)[1]);r>t&&(t=r)}return`REQ-${t+1}`}function St({matriculaAluno:e,tipo:t,descricao:n}){let r=JSON.parse(localStorage.getItem(`demandas`))||[],i=new Date,a=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,`0`)}-${String(i.getDate()).padStart(2,`0`)}`,o={protocolo:xt(),matriculaAluno:e,tipo:t.trim(),descricao:n.trim(),status:`pendente`,dataCriacao:a,dataAtualizacao:a,feedback:``};return r.unshift(o),localStorage.setItem(`demandas`,JSON.stringify(r)),o}function Q(e){if(!e)return``;let t=[`Jan`,`Fev`,`Mar`,`Abr`,`Mai`,`Jun`,`Jul`,`Ago`,`Set`,`Out`,`Nov`,`Dez`],n=e.split(`-`),r=n[0],i=n[1];return`${n[2]} ${t[Number(i)-1]} ${r}`}function Ct(e){let t=String(e??``).trim();if(!t)return!1;let n=JSON.parse(localStorage.getItem(`chavesAtivacao`));Array.isArray(n)||(wt(),n=JSON.parse(localStorage.getItem(`chavesAtivacao`))||[]);let r=n.find(e=>String(e.code)===t&&!e.used);return r===void 0?!1:(r.used=!0,localStorage.setItem(`chavesAtivacao`,JSON.stringify(n)),!0)}function wt(){localStorage.setItem(`chavesAtivacao`,JSON.stringify([{code:`123`,used:!1},{code:`456`,used:!1},{code:`789`,used:!1}]))}function Tt(e,t,n,r,i){let a=JSON.parse(localStorage.getItem(`usuarios`))||[];a.push({nome:e,matricula:t,email:n,senha:r,cargo:i}),localStorage.setItem(`usuarios`,JSON.stringify(a))}function $(e){window.location.pathname!==`/${e}`&&(window.history.pushState({},``,`/${e}`),q(`/${e}`))}function Et(e,t){let n=JSON.parse(localStorage.getItem(`usuarios`))||[],r=n.find(t=>String(t.matricula)===String(e));r&&(r.coordenador||=t,r.coordenador=t,localStorage.setItem(`usuarios`,JSON.stringify(n)))}function Dt(e,t){let n=JSON.parse(localStorage.getItem(`usuarios`))||[],r=n.find(e=>String(e.matricula)===String(t));r&&(r.alunosCadastrados||=[],r.alunosCadastrados.push(e),localStorage.setItem(`usuarios`,JSON.stringify(n)))}function Ot(e){return(JSON.parse(localStorage.getItem(`usuarios`))||[]).find(t=>{let n=t.matricula;return String(n)===String(e)})}function kt(){wt(),_t(),window.addEventListener(`popstate`,()=>{q(window.location.pathname)}),localStorage.getItem(`auth`)===`true`&&window.location.pathname===`/`&&((JSON.parse(localStorage.getItem(`usuarioLogado`))||{}).cargo===`aluno`?$(`centraldemandas`):$(`dashboardcoord`)),q(window.location.pathname)}kt();