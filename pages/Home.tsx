import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PATIENTS } from '../services/mockData';
import { AppointmentStatus } from '../types';
import { Clock, User, ArrowRight, Calendar, Search } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.WAITING: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case AppointmentStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-700 border-blue-200';
      case AppointmentStatus.COMPLETED: return 'bg-green-100 text-green-700 border-green-200';
      case AppointmentStatus.CANCELED: return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const currentPatients = MOCK_PATIENTS.filter(p => p.status !== AppointmentStatus.COMPLETED && p.status !== AppointmentStatus.CANCELED);
  const completedPatients = MOCK_PATIENTS.filter(p => p.status === AppointmentStatus.COMPLETED);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Painel de Atendimento</h1>
          <p className="text-slate-500 mt-2">Gerencie a fila de pacientes e atendimentos do dia.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500">Hoje</p>
          <p className="text-xl font-bold text-slate-800">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Pacientes na Fila</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{MOCK_PATIENTS.filter(p => p.status === AppointmentStatus.WAITING).length}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
                <Clock className="w-6 h-6" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Em Atendimento</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{MOCK_PATIENTS.filter(p => p.status === AppointmentStatus.IN_PROGRESS).length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <User className="w-6 h-6" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Atendidos Hoje</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{completedPatients.length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-green-600">
                <Calendar className="w-6 h-6" />
            </div>
        </div>
      </div>

      {/* Main Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Waiting/In Progress Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Fila de Atendimento
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar paciente..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                      <th className="px-6 py-4">Paciente</th>
                      <th className="px-6 py-4">Horário</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img src={patient.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white shadow-sm" />
                            <div>
                              <p className="font-medium text-slate-900">{patient.name}</p>
                              <p className="text-xs text-slate-500">{patient.age} anos • {patient.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          10:30
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => navigate(`/patient/${patient.id}`)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center hover:underline"
                          >
                            Abrir Prontuário <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {currentPatients.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                          Nenhum paciente aguardando no momento.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Recent/Stats Sidebar */}
        <div className="space-y-6">
           <h2 className="text-lg font-semibold text-slate-800">Atendimentos Recentes</h2>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              {completedPatients.map(patient => (
                <div key={patient.id} className="flex items-start p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                   <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                   <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{patient.name}</p>
                      <p className="text-xs text-slate-500 mt-1">Procedimento de rotina finalizado</p>
                   </div>
                   <span className="text-xs text-slate-400">09:15</span>
                </div>
              ))}
               {completedPatients.length === 0 && (
                  <p className="text-center text-slate-400 text-sm py-4">Nenhum atendimento finalizado hoje.</p>
                )}
           </div>

           <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Dica do Dia</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Lembre-se de revisar o estoque de anestésicos antes do início dos atendimentos de cirurgia da próxima semana.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
