import { LoansService } from './../../services/loans.service';
import { Component } from '@angular/core';
import { EmprestimoCardComponent } from '../emprestimo-card/emprestimo-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Loans } from '../../interface/loans';

@Component({
  selector: 'app-emprestimo',
  standalone: true,
  imports: [CommonModule, FormsModule, EmprestimoCardComponent],
  providers: [LoansService],
  templateUrl: './emprestimo.component.html',
  styleUrl: './emprestimo.component.scss'
})
export class EmprestimoComponent {

  emprestimos: Loans[] = [];

  constructor(private loansService: LoansService) { }

  ngOnInit(): void {
    this.loansService.findAllLoans().subscribe((data: Loans[]) => {
      this.emprestimos = data;
    });
  }
}
