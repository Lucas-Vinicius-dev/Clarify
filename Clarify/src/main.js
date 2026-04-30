import './style.css'
import { Login } from './components/login.js'
import * as aux from "./auxiliarFunctions.js"

document.querySelector('#app').innerHTML = Login()

// Busca um usuário cadastrado no localStorage com base na matrícual e na senha
function buscarUsuarioCadastrado(matricula, senha) {
   const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || []

   return usuariosSalvos.find((usuario) => {
      const matriculaSalva = usuario.matricula ?? usuario.institutionalId
      const senhaSalva = usuario.senha ?? usuario.securityKey

      return String(matriculaSalva) === String(matricula) && String(senhaSalva) === String(senha)
   })
}

function main() {
   // Simulação de usuários cadastrados para teste, Podem adicionar mais coisas se quiserem
   const usuariosTeste = [
      { matricula: '6924101', senha: 'abc123', nome: 'Seu Fuduncio da Silva', perfil: 'coordenador' },
      { matricula: '6924102', senha: 'criatividade', nome: 'Pamonha da Silva', perfil: 'coordenador' },
      { matricula: '6924103', senha: 'paumole', nome: 'Kuduro da Silva', perfil: 'aluno' },
      { matricula: '6924104', senha: 'memata', nome: 'socorro', perfil: 'aluno' },
   ]

   // Armazena os usuários de teste no localStorage se ainda não estiverem presentes
   if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify(usuariosTeste))
   }

   // Adiciona um listener para o evento de submit do formulário de login
   document.querySelector('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const { institutionalId, securityKey } = Object.fromEntries(formData.entries())
      const usuarioEncontrado = buscarUsuarioCadastrado(institutionalId, securityKey)

      if (usuarioEncontrado) {
         const { senha, ...usuarioLogado } = usuarioEncontrado
         localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
         console.log('Usuário autenticado:', usuarioEncontrado)
         alert('Login realizado com sucesso!')
         return
      }

      console.log('Credenciais inválidas:', { institutionalId, securityKey })
      const label = document.querySelector("#submitIncorrectAlert label");
      label.textContent = "Credenciais inválidas.";
      aux.limparFormulario(["#institutionalId", "#securityKey"]);
   })
}

main()