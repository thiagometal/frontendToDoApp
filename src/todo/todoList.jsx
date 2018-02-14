import React from 'react'
import IconButton from '../template/iconButton'

export default props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}> {/*para evitar o warning*/}
                <td> { todo.description } </td>
                <td>
                    <IconButton style='danger' icon='trash-o' onClick={() => props.handleRemove(todo)}> {/*usando arrow function piis estou passando o todo como parametro e não o padrão(e)*/}
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
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}