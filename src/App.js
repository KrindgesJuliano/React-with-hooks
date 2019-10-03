import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  const handleAdd = useCallback(() => {
    /* evita que funções sejam recriadas toda vez que o state é alterado */
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);
  /* agora a função só sera recriada quando as variaveis newTech ou tech forem alteradas */

  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
    /* return () => {} , para componenteDidUnmount */
  }, []);
  /* para executar apenas uma unica vez, basta deixar sem uma dependencia  */

  useEffect(() => {
    /* recebe como primeiro parametro a função a ser executada */
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);
  /* recebendo como segundo parametro quando vai ser executada */

  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
