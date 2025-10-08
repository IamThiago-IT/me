import React from 'react';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Página Não Encontrada</h1>
      <p style={{ fontSize: '1.25rem', margin: '1rem 0' }}>
        Você está perdido? Se você é um dev ou trabalhador, saiba que momentos de incerteza fazem parte da jornada.
      </p>
      <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
        Para aqueles que buscam trabalho e só recebem "não", lembre-se: após 387 tentativas de candidaturas e ter recebido um "não", o importante é nunca desistir!
      </p>
    </div>
  );
}