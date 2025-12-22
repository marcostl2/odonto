import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PATIENTS } from '../services/mockData';
import { Odontogram } from '../components/Odontogram';
import { ArrowLeft, Phone, Mail, Calendar, FileText, Camera } from 'lucide-react';

export const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patient = MOCK_PATIENTS.find(p => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <h2 className="text-2xl font-bold mb-2">Paciente não encontrado</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Voltar para Home</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Voltar para a Fila
      </button>

      {/* Header Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <img 
            src={patient.photoUrl} 
            alt={patient.name} 
            className="w-32 h-32 rounded-lg object-cover shadow-md border-4 border-white"
          />
          <div className="flex-1">
             <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
                  <p className="text-slate-500">{patient.age} anos • ID: #{patient.id}</p>
               </div>
               <span className={`px-4 py-1.5 rounded-full text-sm font-bold border 
                 ${patient.status === 'Em Atendimento' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                 {patient.status}
               </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center text-slate-600">
                  <Phone className="w-4 h-4 mr-3 text-slate-400" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-slate-600">
                  <Mail className="w-4 h-4 mr-3 text-slate-400" />
                  {patient.email}
                </div>
                <div className="flex items-center text-slate-600">
                  <Calendar className="w-4 h-4 mr-3 text-slate-400" />
                  Última visita: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                </div>
             </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-100 pt-6">
           <h3 className="text-sm font-bold text-slate-800 flex items-center mb-2">
             <FileText className="w-4 h-4 mr-2 text-blue-500" />
             Anamnese / Observações
           </h3>
           <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
             {patient.anamnesis}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Odontogram Section */}
        <div className="lg:col-span-2 space-y-6">
          <Odontogram 
            teeth={patient.teeth} 
            onToothClick={(t) => alert(`Dente #${t.number}: ${t.condition}`)}
          />
        </div>

        {/* Photos & Actions Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
               <Camera className="w-5 h-5 mr-2 text-blue-500" />
               Fotos Intraorais
             </h3>
             
             <div className="grid grid-cols-2 gap-3">
               {patient.intraoralPhotos.length > 0 ? (
                 patient.intraoralPhotos.map((photo, idx) => (
                   <div key={idx} className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                     <img 
                       src={photo} 
                       alt={`Intraoral ${idx + 1}`} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="col-span-2 text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                   Nenhuma imagem cadastrada
                 </div>
               )}
               
               {/* Add photo placeholder */}
               <button className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-colors text-blue-500">
                  <span className="text-2xl mb-1">+</span>
                  <span className="text-xs font-semibold">Adicionar</span>
               </button>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm shadow-blue-900/20 text-sm">
                Iniciar Atendimento
              </button>
              <button className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors text-sm">
                Agendar Retorno
              </button>
              <button className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors text-sm">
                Imprimir Prontuário
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
