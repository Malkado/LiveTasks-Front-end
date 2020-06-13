import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Swal from 'sweetalert2';


import imagem from '../../assets/image.svg'

import './styles.css';
import api from '../../services/api';

export default function SigOut() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function create(e) {
        e.preventDefault();
        const data = {
            'name': name,
            'email': email,
            'login': user,
            'pass': password
        };
        try {
            await api.post('user/createUser.php', data)
                .then(res => {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cadastro realizado com sucesso!!',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(value => {
                        history.push('/login')

                    })

                });


        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro ao tentar fazer o cadastro.',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
    return (
        <div className="sigout-container">
            <div className="info">
                <img src={imagem} alt="Faça sua rotina." />
            </div>

            <section className="atributes">
                <h1>COMECE AGORA!</h1>

                <form onSubmit={create}>

                    <input
                        type="text"
                        placeholder="Nome"
                        autoComplete="off"
                        value={name}
                        onChange={e => setName(e.target.value)} required="true" />
                    <input
                        type="email"
                        placeholder="E-mail"
                        autoComplete="off"
                        value={email}
                        onChange={e => setEmail(e.target.value)} required="true" />
                    <input
                        type="text"
                        placeholder="Login"
                        autoComplete="off"
                        value={user}
                        onChange={e => setUser(e.target.value)} required="true" />
                    <input
                        type="password"
                        placeholder="Senha"
                        autoComplete="off"
                        value={password}
                        onChange={e => setPassword(e.target.value)} required="true" />


                    <button className="button" type="submit">Cadastrar</button>

                </form>
                <Link
                    to="/login"
                    className="back-link">
                    <FiLogIn size={22} color="#00B0FF" />
                        Já possui uma conta? Entre nela agora!
                        </Link>

            </section>
        </div>
    );
}