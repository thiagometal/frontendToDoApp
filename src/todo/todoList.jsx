import React from 'react'
import IconButton from '../template/iconButton'

export default props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}> {/*para evitar o warning*/}
                <td className={todo.done ? 'markedAsDone' : ''}> { todo.description } </td>
                <td>
                    <IconButton style='success' icon='check' hide={todo.done}
                        onClick={() => props.handleMarkAsDone(todo)}> </IconButton>

                    <IconButton style='warning' icon='undo' hide={!todo.done}
                        onClick={() => props.handleMarkAsPending(todo)}> </IconButton>

                    <IconButton style='danger' icon='trash-o' hide={!todo.done} 
                        onClick={() => props.handleRemove(todo)}> {/*usando arrow function piis estou passando o todo como parametro e não o padrão(e)*/}
                    </IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ação</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}