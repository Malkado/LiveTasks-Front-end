import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import imagem from '../../assets/image.svg';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';


import './styles.css';

import api from '../../services/api';

export default function SigIn() {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const cookies = new Cookies();
    const history = useHistory();


    async function login(e) {
        e.preventDefault();
        const data = {
            'login': user,
            'pass': password
        };
        try {
            await api.post('user/authUser.php', data)
                .then(res => {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Login realizado com sucesso!!',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(value => {
                        cookies.set('Token', res.data.Token, { path: '/' });
                        cookies.set('Id', res.data.Id, { path: '/' });
                        cookies.set('Name', res.data.Name, { path: '/' });
                        history.push('/dashboard')

                    })

                });


        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro ao tentar fazer o login.',
                showConfirmButton: false,
                timer: 2000
            })
        }

    }
    return (
        <div className="sigin-container">
            <div className="info">
                <img src={imagem} alt="Faça sua rotina." />
            </div>

            <section className="atributes">
                <h1>BEM VINDO DE VOLTA!!</h1>

                <form onSubmit={login}>

                    <input
                        type="text"
                        placeholder="Login"
                        value={user}
                        onChange={e => setUser(e.target.value)} required="true" />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)} required="true" />


                    <button className="button" type="submit" onClick={login}>Entrar</button>


                </form>
                <Link
                    to="/cadastro"
                    className="back-link">
                    <FiLogIn size={22} color="#00B0FF" />
                        Não possui um a conta? Crie agora!
                        </Link>

            </section>
        </div>
    );
}