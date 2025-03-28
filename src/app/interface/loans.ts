export interface Loans {
  id: number;
  userEmail: string;
  bookId: number;
  loanDate: string; // ou Date, se preferir trabalhar com objetos Date
  dueDate: string; // ou Date, para trabalhar com objetos Date
  returnDate: string | null; // A data de retorno pode ser nula
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE'; // Definição de status possíveis
}
