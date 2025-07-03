import { useState } from "react";
import './Form.css';

export default function Form() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [concluida, setConcluida] = useState('pendente');
    const [listatarefas, setListaTarefas] = useState([]);

    const addTarefa = () => {
        const novatarefa = {
            id: Date.now(),
            title: titulo,
            desc: descricao,
            status: concluida
        };
        setListaTarefas([...listatarefas, novatarefa]);
    };

    const handleTitulo = (e) => setTitulo(e.target.value);
    const handleDescricao = (e) => setDescricao(e.target.value);
    const handleStatus = (e) => setConcluida(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTarefa();
        setDescricao('');
        setTitulo('');
        setConcluida('pendente');
    };

    const handleClean = () => setListaTarefas([]);

    const atualizarStatus = (id, novoStatus) => {
        const novaLista = listatarefas.map(tarefa =>
            tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
        );
        setListaTarefas(novaLista);
    };

    const moverTarefa = (index, direcao) => {
        const novaLista = [...listatarefas];
        const novoIndex = direcao === "cima" ? index - 1 : index + 1;

        if (novoIndex < 0 || novoIndex >= novaLista.length) return;

        [novaLista[index], novaLista[novoIndex]] = [novaLista[novoIndex], novaLista[index]];
        setListaTarefas(novaLista);
    };

    return (
        <>
            <h1>Lista de tarefas</h1>
            <hr />
            <form id="form" onSubmit={handleSubmit}>
                <div className="div-input">
                    <label><b>Titulo: </b></label>
                    <input className='inputs' type="text" placeholder="Digite o título" onChange={handleTitulo} value={titulo} />
                </div>
                <div className="div-input">
                    <label><b>Descrição:</b></label>
                    <input className='inputs' type="text" placeholder="Digite a descrição" onChange={handleDescricao} value={descricao} />
                </div>
                <div className="div-input">
                    <label><b>Status:</b></label>
                    <select onChange={handleStatus} value={concluida}>
                        <option value="pendente">Pendente</option>
                        <option value="realizada">Realizada</option>
                        <option value="não realizada">Não realizada</option>
                    </select>
                </div>
                <input id="submit" type="submit" value="Enviar" />
            </form>


            <table className="tabela-tarefas">
                <thead>
                    <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listatarefas.map((item, index) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.desc}</td>
                        <td>{item.status}</td>
                        <td>
                        <button className="button-marcar" onClick={() => atualizarStatus(item.id, 'pendente')}>🕒</button>
                        <button className="button-marcar" onClick={() => atualizarStatus(item.id, 'realizada')}>✅</button>
                        <button className="button-marcar" onClick={() => atualizarStatus(item.id, 'não realizada')}>❌</button>
                        <button className="button-marcar" onClick={() => moverTarefa(index, 'cima')}>⬆️</button>
                        <button className="button-marcar" onClick={() => moverTarefa(index, 'baixo')}>⬇️</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>


            <button onClick={handleClean}>Limpar</button>
        </>
    );
}
