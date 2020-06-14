import React, { useState } from 'react';
import Tooltip from 'react-power-tooltip';
import { useHistory } from 'react-router-dom';
import Cookie from 'universal-cookie';
import Swal from 'sweetalert2';


import './styles.css';
import userImg from '../../assets/user.png'

import api from '../../services/api';
import { useEffect } from 'react';

export default function Dashboard() {
    const [nome, setNome] = useState('');
    const cookie = new Cookie();
    const history = useHistory();
    const [tooltipOpen, setTooltipOpen] = useState({ show: false });

    const toggle = bool => setTooltipOpen({ show: bool });
    useEffect(() => {
        // eslint-disable-next-line
        const name = String(cookie.get('Name'));
        const result = name.split(" ");

        setNome(result[0]);
    });
    async function logout() {
        const token = cookie.get('Token');
        const id = cookie.get('Id');
        const data = {
            'Id': id
        };
        Swal.fire({
            title: 'Deseja mesmo sair? ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sair',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {

                api.post('user/logout.php', data, {
                    headers: {
                        Token: token
                    }
                }).then(res => {
                    if (res.status === 200) {
                        cookie.remove('Token');
                        cookie.remove('Id');
                        cookie.remove('Name');
                        history.push('/')

                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Erro ao tentar sair do sistema.',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                });
            }
        })

    }

    return (
        <div className="dashboard-container">
            <header>

                <span>Bem vindo(a), {nome}!! </span>
                <div className="image">

                    <div id="img"
                        style={{ position: 'relative' }}
                        onMouseOver={() => toggle(true)}
                        onMouseLeave={() => toggle(false)} >
                        <img src={userImg} alt="user"
                        />
                        <Tooltip
                            show={tooltipOpen.show}
                            arrowAlign="center"
                            position="bottom center"
                            moveUp="40px">
                            <span>Perfil</span>
                            <span onClick={logout}>Sair</span>
                        </Tooltip>

                    </div>



                </div>
            </header>

        </div>
    );
}