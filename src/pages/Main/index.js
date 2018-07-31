import React, { Component } from 'react'
import moment from 'moment'
import api from '../../services/api'

import Logo from '../../assets/logo.png'
import { Container, Form } from './styles'

import CompareList from '../../components/CompareList'

class Main extends Component {
  state = {
    isLoading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repos') ? JSON.parse(localStorage.getItem('repos')) : []

    this.setState({
      repositories
    })
  }

  handleAddRepository = async (e) => {
    e.preventDefault()

    this.setState({ isLoading: true })

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`)

      repository.lastCommit = moment(repository.pushed_at).fromNow()

      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, repository],
        repositoryError: false,
      },() => localStorage.setItem('repos', JSON.stringify(this.state.repositories) ))
    } catch (err) {
      this.setState({ repositoryError: true })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleRemoveRepo = (id) => {
    this.setState({
      repositories: this.state.repositories.filter(repositories => repositories.id !== id)
    },() => localStorage.setItem('repos', JSON.stringify(this.state.repositories) ))
  }

  render() {
    return (
      <Container>
        <img src={Logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repo"
            value={this.state.repositoryInput}
            onChange={ e => this.setState({ repositoryInput: e.target.value }) }
          />
          <button type="submit">{ this.state.isLoading ? <i className="fa fa-spinner fa-pulse"></i> : 'OK' }</button>
        </Form>

        <CompareList repositories={this.state.repositories} handleRemoveRepo={this.handleRemoveRepo} />
      </Container>
    )
  }
}

export default Main
