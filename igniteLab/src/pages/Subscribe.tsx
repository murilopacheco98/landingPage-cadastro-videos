import { useState, FormEvent } from "react"
import { gql, useMutation } from "@apollo/client"
import { Logo } from "../components/Logo"
import { useNavigate } from "react-router-dom"

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber ($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }`

export function Subscribe() {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)
  
  function handleSubscribe(event: FormEvent){
    event.preventDefault();

    createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event')
  }
  
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1150px] flex items-center justify-between mt-14 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-4 text-[2.3rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>,
            do zero, com <strong className="text-blue-500">React.</strong>
          </h1>
          <p className="mt-2 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática 
            uma das tecnologias mais utilizadas e com alta 
            demanda para acessar as emlhores oportunidades do mercado.
          </p>
        </div>
        <div className="py-6 px-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-3xl mb-4 block">Inscreva-se gratuitamente</strong>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input 
              type="text"
              className="bg-gray-900 rounded px-5 h-12" 
              placeholder="Seu nome completo"
              onChange={event => setEmail(event.target.value)}
            />
            <input
             type="email"
             className="bg-gray-900 rounded px-5 h-12"
             placeholder="Digite seu e-mail" 
            />
            <button type="submit"
              disabled={loading}
              className="mt-3 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50">
              Garantir minha vaga
            </button>
          </form>
        </div>  
      </div>
      <img src="./src/assets/code-mockup3.png" alt=""  width="63%" />
    </div>
  )
}