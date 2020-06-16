import React, { useState, ChangeEvent, FormEvent } from 'react';
import Tooltip from 'react-power-tooltip';
import { useHistory } from 'react-router-dom';
import Cookie from 'universal-cookie';
import Swal from 'sweetalert2';
import { FiX } from 'react-icons/fi';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';



import './styles.css';
import userImg from '../../assets/user.png'

import api from '../../services/api';
import { useEffect } from 'react';

export default function Dashboard() {
    const cookie = new Cookie();
    const history = useHistory();
    const [show, setShow] = useState(true);
    const [modalCadastro, setModalCadastro] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalProfile, setModalProfile] = useState(false);

    const [nome, setNome] = useState('');
    const [tooltipOpen, setTooltipOpen] = useState({ show: false });
    const [listTask, setListTask] = useState([]);
    const [listTaskType, setListTaskType] = useState([]);
    const [profile, setProfile] = useState([]);


    const [taskId, setTaskId] = useState('');
    const [titleTask, setTitleTask] = useState('');
    const [decTask, setDescTask] = useState('');
    const [valueType, setValueType] = useState('');

    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePass, setProfilePass] = useState('');

    const id = cookie.get('Id');

    useEffect(() => {
        const data = {
            'user_id': id
        };
        const config = {
            headers: {
                Token: cookie.get('Token')
            }
        }
        api.post('task/listTask.php', data, config)
            .then(res => {
                setListTask(res.data.results.data);
            });
    }, [id]);

    useEffect(() => {
        // eslint-disable-next-line
        const name = String(cookie.get('Name'));
        const result = name.split(" ");

        setNome(result[0]);
    });
    useEffect(() => {
        const config = {
            headers: {
                Token: cookie.get('Token')
            }
        }
        api.get('task_type/listType.php', config)
            .then(res => {
                setListTaskType(res.data.results.data);
            });
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
    function deleteTask(idTask) {
        const data = {
            "user_id": id,
            "task_id": idTask
        };
        const config = {
            headers: {
                Token: cookie.get('Token')
            }
        }
        Swal.fire({
            title: 'Deseja mesmo apagar a task? ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                try {
                    api.post('task/deleteTask.php', data, config)
                        .then(res => {
                            if (res.status === 200) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Atividade removida com sucesso!!',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                setListTask(listTask.filter(task => task.Id_Task !== idTask));

                            } else {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'Erro ao tentar remover a atividade.',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        })
                } catch (error) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Erro interno. Contate o suporte.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

            }
        });

    }
    async function createTask() {
        setModalCadastro(true);

        const data = {
            "user_id": id,
            "name": titleTask,
            "description": decTask
        };
        const config = {
            headers: {
                Token: cookie.get('Token')
            }
        }
        try {
            api.post('task/createTask.php', data, config)
                .then(res => {
                    if (res.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Atividade criada com sucesso!!',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(value => {
                            setModalCadastro(false);

                        });


                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Erro ao tentar criar a atividade.',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                })
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro interno. Contate o suporte.',
                showConfirmButton: false,
                timer: 2000
            });
        }

    }
    function modalupdate(open, Id, Title, Desc, value) {
        setTaskId(Id);
        setTitleTask(Title);
        setDescTask(Desc);
        setValueType(value);
        setModalUpdate(open);

    }

    function updateTask() {
        const data = {
            'user_id': id,
            'task_id': taskId,
            'name': titleTask,
            'description': decTask,
            'type_id': valueType,
        };
        const config = {
            headers: {
                Token: cookie.get('Token')
            }
        }
        Swal.fire({
            title: 'Deseja mesmo atualizar os dados da atividade? ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                try {
                    api.put('task/updateTask.php', data, config)
                        .then(res => {
                            if (res.status === 200) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Atividade atualizada com sucesso com sucesso!!',
                                    showConfirmButton: false,
                                    timer: 2000
                                });

                            } else {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'Erro ao tentar atualizar a atividade.',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        })
                } catch (error) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Erro interno. Contate o suporte.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

            }
        });
    }
    function Profile(bool) {
        const data = {
            'Id': id
        };
        const config = {
            headers: {
                Token: cookie.get('Token')
            }
        }
        api.post('user/profile.php', data, config)
            .then(res => {
                setProfile(res.data.data.profile);
                setModalProfile(bool);

                setProfileName(res.data.data.profile.Name_User);
                setProfilePass(res.data.data.profile.Pass_User);
                setProfileEmail(res.data.data.profile.Email_User);


            });
    }
    function updateUser() {




        console.log('nome: ', profileName);
        console.log('email: ', profileEmail);
        console.log('senha: ', profilePass);


    }

    const toggle = bool => setTooltipOpen({ show: bool });

    const modal = bool => setModalCadastro(bool);
    // const modalupdate = bool => setModalCadastro(bool);
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
                            <span onClick={() => Profile(true)}>Perfil</span>
                            <span onClick={() => logout}>Sair</span>
                        </Tooltip>

                    </div>



                </div>
            </header>
            <div className="addButton">
                <button
                    className="button"
                    type="button"
                    onClick={() => modal(true)}> + ADICIONAR </button>

            </div>

            <ul>
                {listTask.map(task => (
                    <li key={task.Id_Task} >
                        <h3 onClick={() => modalupdate(true, task.Id_Task,
                            task.Name_Task, task.Description_Task, task.Id_Task_Type)}>#{task.Id_Task}</h3>
                        <strong onClick={() => modalupdate(true, task.Id_Task,
                            task.Name_Task, task.Description_Task, task.Id_Task_Type)}>{task.Name_Task}</strong>


                        <strong onClick={() => modalupdate(true, task.Id_Task,
                            task.Name_Task, task.Description_Task, task.Id_Task_Type)}>Descrição:</strong>
                        <p onClick={() => modalupdate(true, task.Id_Task,
                            task.Name_Task, task.Description_Task, task.Id_Task_Type)}>{task.Description_Task}</p>

                        <select
                            name="uf"
                            id="uf"
                            disabled={true} onClick={() => modalupdate(true, task.Id_Task,
                                task.Name_Task, task.Description_Task, task.Id_Task_Type)}>

                            {listTaskType.map((type) => (
                                <option key={type.Id_Task_Type} value={task.Id_Task_Type}>
                                    {type.Name_Task_Type}
                                </option>
                            ))}
                        </select>

                        <button type="button" onClick={() => deleteTask(task.Id_Task)}><FiX size={20} /></button>
                    </li>
                ))}

            </ul>
            <Modal open={modalCadastro} onClose={() => modal(false)} center>
                <div className="createTask-component">
                    <h1>Nova atividade</h1>

                    <input
                        type="text"
                        placeholder="Título"
                        value={titleTask}
                        onChange={e => setTitleTask(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        cols="30"
                        rows="5"
                        value={decTask}
                        onChange={e => setDescTask(e.target.value)}
                    ></textarea>


                    <button className="button" onClick={() => createTask()} >Cadastrar</button>

                </div>
            </Modal>
            <Modal open={modalUpdate} onClose={() => setModalUpdate(false)} center>
                <div className="updateTask-component">
                    <h1>#{taskId}</h1>

                    <input
                        type="text"
                        placeholder="Título"
                        value={titleTask}
                        onChange={e => setTitleTask(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        cols="30"
                        rows="5"
                        value={decTask}
                        onChange={e => setDescTask(e.target.value)}
                    ></textarea>
                    <select
                        onChange={e => setValueType(e.target.value)}>
                        {listTaskType.map((type) => (
                            <option key={type.Id_Task_Type} value={valueType}>
                                {type.Name_Task_Type}
                            </option>
                        ))}
                    </select>

                    <button className="button" onClick={() => updateTask()} >Atualizar</button>

                </div>
            </Modal>
            <Modal open={modalProfile} onClose={() => setModalProfile(false)} center>
                <div className="userModal-component">
                    <img src={userImg} alt="user" />

                    <h3>{profile.Login_User}</h3>
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="Nome"
                            value={profileName}
                            onChange={e => setProfileName(e.target.value)}
                            disabled={show}
                        /> <input
                            type="text"
                            placeholder="E-mail"
                            value={profileEmail}
                            onChange={e => setProfileEmail(e.target.value)}

                            disabled={show}
                        /> <input
                            type="password"
                            placeholder="Senha"
                            value={profilePass}
                            onChange={e => setProfilePass(e.target.value)}

                            disabled={show}
                        />
                    </div>
                    <div className="button-crud">
                        {show && <button className="button" onClick={() => setShow(false)} >Editar Dados</button>}
                        {show && <button className="button"  >Apagar Usuário</button>}
                        {!show && <button className="button" onClick={() => updateUser()} >Atualizar</button>}
                        {!show && <button className="button" onClick={() => setShow(true)}>Cancelar</button>}
                    </div>
                </div>
            </Modal>
        </div>
    );
}