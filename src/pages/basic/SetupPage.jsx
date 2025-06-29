import React, { useState } from 'react';

export default function SetupPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [institution, setInstitution] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [shift, setShift] = useState('');
  const [email, setEmail] = useState('');

  const isFormValid = name.trim() !== '' && role !== '';

  return (
    <div className="bg-gray-800 min-h-screen flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 p-6 shadow-md space-y-4">
        <h1 className="text-center text-gray-900 font-semibold text-2xl">Bem-vindo ao Sortify</h1>
        <div className="h-px bg-gray-200 w-full" />

        {/* Nome completo */}
        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">Nome completo</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Tipo de usuário */}
        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">Você é:</label>
          <div className="flex gap-4">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="radio"
                value="professor"
                checked={role === 'professor'}
                onChange={() => setRole('professor')}
                className="mr-2"
              />
              Professor
            </label>
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="radio"
                value="aluno"
                checked={role === 'aluno'}
                onChange={() => setRole('aluno')}
                className="mr-2"
              />
              Aluno
            </label>
          </div>
        </div>

        {/* Instituição */}
        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">Instituição (opcional)</label>
          <input
            type="text"
            placeholder="Ex: Escola ABC"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-800"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </div>

        {/* Botão Continuar */}
        <button
          disabled={!isFormValid}
          className={`w-full mt-2 py-2 rounded-md text-sm font-medium text-white transition ${
            isFormValid
              ? 'bg-gray-700 hover:bg-gray-900 cursor-pointer'
              : 'bg-gray-400'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}