export enum AppointmentStatus {
  WAITING = 'Aguardando',
  IN_PROGRESS = 'Em Atendimento',
  COMPLETED = 'Finalizado',
  CANCELED = 'Cancelado'
}

export enum ToothCondition {
  HEALTHY = 'Saudável',
  CAVITY = 'Cárie',
  TREATED = 'Tratado',
  MISSING = 'Ausente',
  CROWN = 'Coroa'
}

export interface Tooth {
  id: number;
  number: number; // Universal numbering system 1-32
  condition: ToothCondition;
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  photoUrl: string;
  lastVisit: string;
  nextVisit: string;
  status: AppointmentStatus;
  anamnesis: string;
  teeth: Tooth[];
  intraoralPhotos: string[];
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
