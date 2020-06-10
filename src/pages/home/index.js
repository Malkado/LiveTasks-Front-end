import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import imagem from '../../assets/image.svg'

export default function Home() {
    var history = useHistory();

    function sigoutPage() {
        history.push('/cadastro');
    }
    return (
        <div className="home-container">
            <div className="info">
                <img src={imagem} alt="Faça sua rotina." />

            </div>

            <section className="atributes">
                <h1>CRIE SUA ROTINA</h1>
                <p>ORGANIZE SUAS ATIVIDADES!</p>
                <button className="button" onClick={sigoutPage}>COMECE AGORA</button>
                <Link
                    to="/login"
                    className="back-link">
                    <FiLogIn size={22} color="#00B0FF" />
                    Entre com sua conta
                    </Link>

            </section>
        </div>
    );
}