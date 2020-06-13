import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import imagem from '../../assets/image.svg';


import './styles.css';
export default function SigIn() {

    const history = useHistory();
    function login() {
        history.push('/dashboard');
    }
    return (
        <div className="sigin-container">
            <div className="info">
                <img src={imagem} alt="Faça sua rotina." />
            </div>

            <section className="atributes">
                <h1>BEM VINDO DE VOLTA!!</h1>

                <form onSubmit="">

                    <input type="text" placeholder="Login" />
                    <input type="text" placeholder="Senha" />


                    <button className="button" type="submit" onClick={login}>Entrar</button>
                    <Link
                        to="/cadastro"
                        className="back-link">
                        <FiLogIn size={22} color="#00B0FF" />
                        Não possui um a conta? Crie agora!
                        </Link>

                </form>

            </section>
        </div>
    );
}