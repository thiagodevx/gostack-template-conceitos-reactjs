import React, { useState, useEffect } from 'react'

import './styles.css'
import api from './services/api'

export default () => {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Eu estudo para isso',
      techs: ['Desespero', 'Motivação']
    })
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}
