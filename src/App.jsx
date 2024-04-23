
import './App.css'
import { Header } from './components/Header';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//criando validação
const schema = z.object({
  name: z.string().min(1,"O campo é obrigatório."),
  username: z.string().min(3,"O username deve ter pelo menos 3 caracteres.").max(10, "O username deve ter 10 caracteres."),
  email: z.string().email("Digite um email valido").min(1,"O campo é obrigatório."),
  telefone: z.string().refine((value)=> /^\d{2} ?\d{9}$/.test(value), {
    message: "Digite um telefone valido no formato DD + 9 numeros."
  } )
})

function App() {
 /* const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("user")*/

  // ============
  /*const nameRef = useRef(null);
  const emailRef = useRef(null)
  const usernameRef = useRef(null);*/

  const {register, handleSubmit, formState:{ errors }} = useForm({
    resolver: zodResolver(schema)
  })


  function handleSave(data){
    //e.preventDefault();

   /* console.log({
      name: nameRef.current?.value,
      email:  emailRef.current?.value,
      username: usernameRef.current?.value,
    })*/

    console.log(data);
  }


  return (
    <div className="container">
      <h1>React</h1>
      <Header/>

      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <input
          type="text"
          placeholder="Digite seu nome..."
          className="input"
          {...register("name")}
          id='name'
        />
        {errors.name && <p className='error' >{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Digite seu email..."
          className="input"
          {...register("email")}
          id='email'
        />
        {errors.email && <p className='error' >{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Digite seu username..."
          className="input"
          {...register("username")}
          id='username'
        />
        {errors.username && <p className='error' >{errors.username.message}</p>}

        <input
          type="text"
          placeholder="Digite seu Telefone..."
          className="input"
          {...register("telefone")}
          id='telefone'
        />
        {errors.telefone && <p className='error' >{errors.telefone.message}</p>}

        <button className="button" type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
