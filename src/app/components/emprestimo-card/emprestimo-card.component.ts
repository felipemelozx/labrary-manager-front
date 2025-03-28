import { LoansService } from './../../services/loans.service';
import { Component, Input } from '@angular/core';
import { Loans } from '../../interface/loans';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emprestimo-card',
  imports: [CommonModule,],
  providers: [LoansService],
  standalone: true,
  templateUrl: './emprestimo-card.component.html',
  styleUrl: './emprestimo-card.component.scss'
})
export class EmprestimoCardComponent {
  @Input() emprestimo?: Loans; // Recebe os dados do empréstimo

  constructor(private loansService: LoansService) { }

  returnBook(): void {
    if (this.emprestimo) {
      this.emprestimo.status = 'RETURNED';
      this.emprestimo.returnDate = new Date().toISOString();


      this.loansService.updateLoans(this.emprestimo.id).subscribe(response => {
        console.log('Empréstimo devolvido com sucesso', response);
      }, error => {
        console.log('Erro ao devolver livro', error);
      });
    }
  }
}
