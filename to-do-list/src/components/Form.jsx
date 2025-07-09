import { useState } from "react";
import './Form.css';

export default function Form() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [concluida, setConcluida] = useState('pendente');
    const [listatarefas, setListaTarefas] = useState([]);
    const [filtro, setFiltro] = useState("todas");


    const tarefasFiltradas = listatarefas.filter((tarefa) => {
        if (filtro === "pendente") return tarefa.status === "pendente";
        if (filtro === "realizada") return tarefa.status === "realizada";
        if (filtro === "nao-realizada") return tarefa.status === "não realizada";
        return true;
    });


    const addTarefa = () => {
        const tituloNormalizado = titulo.trim().toLowerCase();
        const tituloDuplicado = listatarefas.some(
            (tarefa) => tarefa.title.trim().toLowerCase() === tituloNormalizado
        );

        if (tituloDuplicado) {
            alert("Já existe uma tarefa com esse título!");
            return;
        }else{

            const novatarefa = {
                id: Date.now(),
                title: titulo,
                desc: descricao,
                status: concluida
            };
            setListaTarefas([...listatarefas, novatarefa]);
            setDescricao('');
            setTitulo('');
        }
    };

    const handleTitulo = (e) => setTitulo(e.target.value);
    const handleDescricao = (e) => setDescricao(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTarefa();
        setConcluida('pendente');
        
    };

    const handleFiltro = (e) => {
        e.preventDefault();
    }


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

    const removerTarefa = (tarefa,index) => {
        const confirmar = confirm(`Deseja deletar a tarefa "${tarefa}"?`);
        if (confirmar === true){
            const novaLista = listatarefas.filter((_,i) => i !== index);
            setListaTarefas(novaLista);
        }
    };

    const handleClean = () => {
        const confirmar = confirm('Deseja deletar todas as tarefas?');
        if (confirmar === true){
        setListaTarefas([])
        }
    }

    return (
        <>
            <h1>Cadastrar tarefas</h1>
            <hr />
            <form id="form" onSubmit={handleSubmit}>
                <div className="div-input">
                    <label className="text"><b>Titulo: </b></label>
                    <input className='inputs' type="text" placeholder="Digite o título" maxLength={20} onChange={handleTitulo} value={titulo} required />
                </div>
                <div className="div-input">
                    <label className="text"><b>Descrição:</b></label>
                    <input className='inputs' type="text" placeholder="Digite uma breve descrição" maxLength={25} onChange={handleDescricao} value={descricao} required />
                </div>
                
                <input id="submit" type="submit" value="Enviar" />
            </form>
    
            {listatarefas.length > 0 && (
                <>
                    <h1>Lista de tarefas</h1>
                    <hr />
                    <form id="filtrar" onSubmit={handleFiltro}>
                        <label id="label-filtrar" htmlFor="filtrar">Filtrar por:</label>
                        <select id="select-filtrar" name="filtrar" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                            <option value="todas">Todas as atividades</option>
                            <option value="pendente">Pendente</option>
                            <option value="realizada">Realizada</option>
                            <option value="nao-realizada">Não realizada</option>
                        </select>
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
                            {tarefasFiltradas.map((item, index) => (
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
                                    <button className="button-marcar" onClick={() => removerTarefa(item.title,index)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button id="clean" onClick={() => handleClean()}>Limpar Tudo</button>
                </>
            )}

            

        </>
    );
}