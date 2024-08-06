import './style.css'
import {  FaUser  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdViewTimeline } from "react-icons/md";
import api from '../../Services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {

  const [users, setUsers] = useState([])      //criando um estado para armazenar os usuarios

  const InputName = useRef(null)
  const InputEmail = useRef(null)
  const InputAge = useRef(null)


  async function getUsers() {           //função para pegar os usuarios da api      
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {           //função para pegar os usuarios da api      
    await api.post('/usuarios', {
      name: InputName.current.value,
      email: InputEmail.current.value,
      age: InputAge.current.value
    })
    getUsers()
  }

  async function DeleteUsers(id) {           //função para pegar os usuarios da api      
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div class="split left ">
        <div class="wrapper centered">
          <div className="form-box">
            <form action="">
              <h1>Cadastrar usuario</h1>
              <div className="input-box">
                <input type="text" placeholder="Nome" required ref={InputName}/><FaUser className='icon'/>
              </div> 
              <div className="input-box">
                <input type="text" placeholder="Email" required ref={InputEmail} /><MdEmail className='icon'/>
              </div>
              <div className="input-box">
                <input type="text" placeholder="Idade" required ref={InputAge}/><MdViewTimeline className='icon'/>
              </div>

              <button type="submit" onClick={createUsers}>Cadastrar</button>
            </form>
          </div>
          </div>
      </div>    

<div class="split right">
  <div class="wrapper2 centered">
    <div className="user-box">
      <h1>Usuarios cadastrados</h1>
      <div className="table scrollable-content">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Idade</th>

            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <button onClick={() => DeleteUsers(user.id)} >Excluir</button>      
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
    </div>
  </div>
</div>


</>
)}
export default Home
