import { Patient, AppointmentStatus, ToothCondition, Transaction, Tooth } from '../types';

const generateTeeth = (): Tooth[] => {
  const teeth: Tooth[] = [];
  for (let i = 1; i <= 32; i++) {
    // Randomize some conditions
    let condition = ToothCondition.HEALTHY;
    const rand = Math.random();
    if (rand > 0.85) condition = ToothCondition.TREATED;
    else if (rand > 0.95) condition = ToothCondition.CAVITY;
    else if (rand > 0.98) condition = ToothCondition.MISSING;

    teeth.push({
      id: i,
      number: i,
      condition: condition,
    });
  }
  return teeth;
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Ana Silva',
    age: 28,
    phone: '(11) 99999-1111',
    email: 'ana.silva@email.com',
    photoUrl: 'https://picsum.photos/id/64/200/200',
    lastVisit: '2023-10-15',
    nextVisit: '2023-11-20',
    status: AppointmentStatus.IN_PROGRESS,
    anamnesis: 'Paciente relata sensibilidade ao frio no dente 14. Sem alergias conhecidas.',
    teeth: generateTeeth(),
    intraoralPhotos: [
      'https://picsum.photos/id/10/400/300',
      'https://picsum.photos/id/20/400/300',
      'https://picsum.photos/id/30/400/300',
    ]
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    age: 45,
    phone: '(11) 98888-2222',
    email: 'carlos.o@email.com',
    photoUrl: 'https://picsum.photos/id/91/200/200',
    lastVisit: '2023-09-01',
    nextVisit: '2023-11-20',
    status: AppointmentStatus.WAITING,
    anamnesis: 'Histórico de bruxismo. Utiliza placa miorrelaxante.',
    teeth: generateTeeth(),
    intraoralPhotos: ['https://picsum.photos/id/40/400/300']
  },
  {
    id: '3',
    name: 'Beatriz Costa',
    age: 32,
    phone: '(21) 97777-3333',
    email: 'bia.costa@email.com',
    photoUrl: 'https://picsum.photos/id/65/200/200',
    lastVisit: '2023-11-10',
    nextVisit: '2024-05-10',
    status: AppointmentStatus.COMPLETED,
    anamnesis: 'Limpeza de rotina realizada com sucesso.',
    teeth: generateTeeth(),
    intraoralPhotos: []
  },
  {
    id: '4',
    name: 'João Mendes',
    age: 12,
    phone: '(31) 96666-4444',
    email: 'joao.m@email.com',
    photoUrl: 'https://picsum.photos/id/1005/200/200',
    lastVisit: '2023-11-19',
    nextVisit: '2023-12-19',
    status: AppointmentStatus.WAITING,
    anamnesis: 'Acompanhamento ortodôntico.',
    teeth: generateTeeth(),
    intraoralPhotos: ['https://picsum.photos/id/50/400/300']
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', description: 'Tratamento de Canal - Ana Silva', amount: 850.00, type: 'income', date: '2023-11-20', category: 'Tratamento' },
  { id: 't2', description: 'Compra de Materiais Descartáveis', amount: 320.50, type: 'expense', date: '2023-11-19', category: 'Materiais' },
  { id: 't3', description: 'Limpeza - Beatriz Costa', amount: 250.00, type: 'income', date: '2023-11-18', category: 'Prevenção' },
  { id: 't4', description: 'Manutenção Equipamento Raio-X', amount: 1200.00, type: 'expense', date: '2023-11-15', category: 'Manutenção' },
  { id: 't5', description: 'Clareamento - Marcos Souza', amount: 1500.00, type: 'income', date: '2023-11-14', category: 'Estética' },
  { id: 't6', description: 'Conta de Energia', amount: 450.00, type: 'expense', date: '2023-11-10', category: 'Utilidades' },
  { id: 't7', description: 'Implante - Julia Lima', amount: 3500.00, type: 'income', date: '2023-11-05', category: 'Implante' },
];
