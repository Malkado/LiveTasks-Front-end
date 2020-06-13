import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import imagem from '../../assets/image.svg'

import './styles.css';

export default function SigOut() {
    return (
        <div className="sigout-container">
            <div className="info">
                <img src={imagem} alt="Faça sua rotina." />
            </div>

            <section className="atributes">
                <h1>COMECE AGORA!</h1>

                <form onSubmit="">

                    <input type="text" placeholder="Nome" autoComplete="off" />
                    <input type="email" placeholder="E-mail" autoComplete="off" />
                    <input type="text" placeholder="Login" autoComplete="off" />
                    <input type="password" placeholder="Senha" autoComplete="off" />


                    <button className="button" type="submit">Cadastrar</button>
                    <Link
                        to="/login"
                        className="back-link">
                        <FiLogIn size={22} color="#00B0FF" />
                        Já possui uma conta? Entre nela agora!
                        </Link>
                </form>

            </section>
        </div>
    );
}