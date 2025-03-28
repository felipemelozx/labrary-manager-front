export interface LoansCreateDTO {
    bookId: number;
    userId: string;
    borrowDate: Date;  // Data do empréstimo (formato ISO 8601)
    dueDate: Date;     // Data de devolução (formato ISO 8601)
}
