import React, { useRef } from 'react';

function HolidayFetcher() {
  const anoRef = useRef(null);
  const paisRef = useRef(null);
  const listRef = useRef(null);
  const errorRef = useRef(null);

  const buscarFeriados = async () => {
    const ano = anoRef.current.value.trim();
    const pais = paisRef.current.value.trim();

    if (!ano || !pais) {
      errorRef.current.textContent = 'Preencha o ano e o código do país.';
      listRef.current.innerHTML = '';
      return;
    }

    const url = `https://date.nager.at/api/v3/publicholidays/${ano}/${pais}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      const data = await response.json();

      errorRef.current.textContent = '';
      listRef.current.innerHTML = '';

      data.forEach((feriado) => {
        //remover dependencia direta do document Object, n encontrei solucao
        const li = document.createElement('li');
        li.textContent = `${feriado.date} > ${feriado.localName}`;
        listRef.current.appendChild(li);
      });

    } catch (err) {
      errorRef.current.textContent = 'Erro ao buscar dados. Verifique os valores inseridos.';
      listRef.current.innerHTML = '';
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Consulta a API</h1>

      <div>
        <label>
          Informe o ano:
          <input ref={anoRef} type="text" style={{ margin: '0 10px' }} />
        </label>
        <label>
          Informe o código do país:
          <input ref={paisRef} type="text" maxLength="2" style={{ margin: '0 10px' }} />
        </label>
        <button onClick={buscarFeriados}>Enviar requisição</button>
      </div>

      <p ref={errorRef} style={{ color: 'red' }}></p>
      <ul ref={listRef}></ul>
    </div>
  );
}

export default HolidayFetcher;
