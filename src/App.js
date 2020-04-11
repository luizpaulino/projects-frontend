import React, { useState, useEffect } from "react";

import api from 'services/api';

import "./styles.css";

function App() {
  const [ repositories, setRespositories ] = useState([]);

  useEffect(() => { 
    api.get('/repositories').then( response =>{
      setRespositories(response.data);
    });
   }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio GoStack ${Date.now()}`,
      url: 'https://github.com/luizpaulino/projects-frontend',
      techs:[
        `Node.js ${Date.now()}`,
        'React.js'
      ]
    });

    setRespositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    
    if (response.status !== 204){
      alert('Projeto não foi deletado tente novamente');
      return
    }

    setRespositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( repository => (
          <li key={repository.id}>
            
            { repository.title }

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li> 
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
