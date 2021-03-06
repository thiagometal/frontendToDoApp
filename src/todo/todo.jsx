import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props) // props é somente para leitura
        this.state = { description: '', list: []} //estamos inicializando o estado do componente, uma vez setado o estado inicial para efetuar as alteracoes setState
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this) // com isso o this vai ser o próprio componente todo, pois o this vai ser chamado do click vindo do DOM e de lá ele vai ser nulo
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(e) { // esse 'e' é o evento do onChange, dentro dele tem um target que é o input e dentro deste tem o valor que o usuário digitou
        //sempre que o user digitar vai alterar o estado atual  referente a description
        this.setState({...this.state, description: e.target.value })

        //O campo description é um componente controlado, quem manda no valor dentro do campo não é a DOM e sim 
        //o estado desse componente. Se o código a cima for comentado, não haverá mudança de estado e o valor
        //que vai aparecer lá é o definido na inicialização. 

        //Ao digitar no input: 
        //1. Um evento é disparado 
        //2. O evento chama a função que vai manipulá-lo[handleChange]
        //3. O estado do componente evolui, no setState
        //4. O react chama a função render() que vai mostrar os valores na tela
        //Em resumo: o que vc digita vai para o estado, o estado evoluindo o componente é renderizado novamente.
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => this.refresh(this.state.description))
    }

    handleClear() {
        this.refresh()
    }

    render () {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'> </PageHeader>
                <TodoForm description={this.state.description}
                    handleChange={this.handleChange} 
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}/>
                <TodoList list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending} 
                    handleRemove={this.handleRemove}/>
            </div>
        ) 
    }
}