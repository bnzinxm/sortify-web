import React, { useEffect, useState } from 'react';
import {
  Users,
  BookOpen,
  Settings,
  Shuffle,
  BarChart2,
  LayoutDashboard,
  Dices,
  Calendar,
  Bell,
  ClipboardList,
  MessageCircle,
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from 'recharts';

// Dados fixos (pode vir de API/Storage)
const attendanceData = [
  { name: 'Seg', faltas: 2 },
  { name: 'Ter', faltas: 1 },
  { name: 'Qua', faltas: 0 },
  { name: 'Qui', faltas: 3 },
  { name: 'Sex', faltas: 1 },
];

const gradesData = [
  { name: 'Matemática', nota: 7.5 },
  { name: 'Português', nota: 8.2 },
  { name: 'História', nota: 6.8 },
  { name: 'Geografia', nota: 7.9 },
  { name: 'Ciências', nota: 8.1 },
];

const notifications = [
  'Nova chamada registrada para turma 7A',
  'Aluno João teve falta justificada',
  'Sorteio de grupos atualizado',
  'Relatório mensal disponível',
  'Reunião com professores na sexta-feira',
  'Atualização de calendário escolar publicada',
  'Mensagem do diretor enviada',
  'Novo material didático disponível',
];

const shortcuts = [
  { icon: <ClipboardList size={20} />, label: 'Registrar Chamada' },
  { icon: <Shuffle size={20} />, label: 'Criar Sorteio' },
  { icon: <Users size={20} />, label: 'Gerenciar Alunos' },
  { icon: <Settings size={20} />, label: 'Configurações' },
];

const menuItems = [
  { title: 'Dashboard', icon: <LayoutDashboard size={18} />, active: true },
  { title: 'Alunos', icon: <Users size={18} /> },
  { title: 'Chamadas', icon: <BookOpen size={18} /> },
  { title: 'Sorteios', icon: <Shuffle size={18} /> },
  { title: 'Relatórios', icon: <BarChart2 size={18} /> },
  { title: 'Configurações', icon: <Settings size={18} /> },
];

export default function Dashboard() {
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    const storedName = localStorage.getItem('user_fullname');
    if (storedName) setUserName(storedName.split(' ')[0]);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-gray-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header userName={userName} />
        <main className="p-6 pt-24 overflow-y-auto min-h-screen">
          <SummaryCards />
          <ChartsSection />
          <NotificationsSection />
          <ShortcutsSection />
          <RemindersSection />
        </main>
      </div>
    </div>
  );
}

// ---------- COMPONENTES ----------

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-5 fixed top-0 left-0 bottom-0 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-10 text-[#111827] tracking-tight flex items-center gap-2 sticky top-0 bg-white pt-4 pb-5 z-10">
        <Dices /> <span>Sortify</span>
      </h1>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg font-medium transition-all w-full text-left
              ${item.active
                ? 'bg-gray-900 text-white shadow'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Header({ userName }) {
  return (
    <header className="bg-white px-6 py-5 border-b border-gray-200 flex items-center justify-between fixed top-0 left-64 right-0 z-20 shadow-sm">
      <div className="text-xl font-medium text-gray-800">Dashboard</div>
      <div className="flex items-center gap-4">
        <Bell size={20} className="text-gray-600 cursor-pointer" />
        <span className="text-sm text-gray-600">Olá, {userName}</span>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            userName
          )}&background=1F2937&color=fff`}
          alt="avatar"
          className="w-9 h-9 rounded-full border border-gray-300 shadow-sm"
        />
      </div>
    </header>
  );
}

function SummaryCards() {
  const cards = [
    { title: 'Chamadas realizadas', value: '12', icon: <BookOpen size={28} /> },
    { title: 'Alunos cadastrados', value: '58', icon: <Users size={28} /> },
    { title: 'Sorteios feitos', value: '5', icon: <Shuffle size={28} /> },
    { title: 'Faltas registradas', value: '7', icon: <BarChart2 size={28} /> },
    { title: 'Próximas aulas', value: '3', icon: <Calendar size={28} /> },
    { title: 'Mensagens novas', value: '2', icon: <MessageCircle size={28} /> },
    { title: 'Tarefas pendentes', value: '4', icon: <ClipboardList size={28} /> },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map(({ title, value, icon }, idx) => (
        <Card key={idx} title={title} value={value} icon={icon} />
      ))}
    </section>
  );
}

function ChartsSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
        <h3 className="text-gray-700 text-lg font-semibold mb-4">
          Faltas por dia da semana
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={attendanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="faltas" fill="#374151" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
        <h3 className="text-gray-700 text-lg font-semibold mb-4">Média de Notas</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={gradesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="nota" stroke="#2563EB" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function NotificationsSection() {
  return (
    <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm max-w-3xl mb-8">
      <h3 className="text-gray-700 text-lg font-semibold mb-4">Atividades recentes</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-600 max-h-60 overflow-y-auto">
        {notifications.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </section>
  );
}

function ShortcutsSection() {
  return (
    <section className="mb-8 max-w-3xl">
      <h3 className="text-gray-700 text-lg font-semibold mb-4">Atalhos rápidos</h3>
      <div className="flex flex-wrap gap-4">
        {shortcuts.map(({ icon, label }, idx) => (
          <button
            key={idx}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2 shadow-sm transition"
          >
            {icon}
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function RemindersSection() {
  return (
    <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm max-w-3xl">
      <h3 className="text-gray-700 text-lg font-semibold mb-4">Lembretes</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>Não esquecer da reunião de professores na sexta-feira às 14h.</li>
        <li>Atualizar os dados dos alunos da turma 8B.</li>
        <li>Enviar relatório mensal até dia 30.</li>
      </ul>
    </section>
  );
}

function Card({title, value, icon,}) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition cursor-default flex items-center gap-4">
      <div className="text-gray-700">{icon}</div>
      <div>
        <h3 className="text-gray-700 text-base font-medium">{title}</h3>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
