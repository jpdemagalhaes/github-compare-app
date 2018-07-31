import React from 'react'

import { Container, Repository } from './styles'

const CompareList = ({ repositories, handleRemoveRepo }) => (
  <Container>
    {
      repositories.map((repository) => (
        <Repository key={repository.id}>
          <i onClick={() => handleRemoveRepo(repository.id)} className="fa fa-times"></i>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <strong>{repository.name}</strong>
            <small>{repository.owner.login}</small>
          </header>

          <ul>
            <li>{repository.stargazers_count} <small>stars</small></li>
            <li>{repository.forks_count} <small>forks</small></li>
            <li>{repository.open_issues_count} <small>issues</small></li>
            <li>{repository.lastCommit} <small>last commit</small></li>
          </ul>
        </Repository>
      ))
    }
  </Container>
)

export default CompareList
