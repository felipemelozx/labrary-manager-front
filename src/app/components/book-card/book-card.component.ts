import { Component, Input } from '@angular/core';
import { Book } from '../../interface/Book';
import { LoansService } from '../../services/loans.service';
import { LoansCreateDTO } from '../../interface/LoansCreateDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-card',
  standalone: true,
 imports: [FormsModule, CommonModule,],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book?: Book;
  defaultCoverImage = 'https://m.media-amazon.com/images/I/410ueKwaa0L.jpg'; // Imagem padrão

  loans: LoansCreateDTO = {
    bookId: 0,
    userId: "",
    borrowDate: new Date(),
    dueDate: new Date()
  };

  isModalOpen = false;

  constructor(private loansService: LoansService) { }

  ngOnInit(): void {
    if (!this.book?.coverImage) {
      this.book!.coverImage = this.defaultCoverImage;
    }
  }

  // Verifica se o botão de pegar emprestado deve ser ativado
  get isButtonEnabled(): boolean {
    return this.book!.availableCopies > 0;
  }

  // Abre o modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Fecha o modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Função para confirmar o empréstimo
  confirmLoan(): void {
    if (this.isButtonEnabled && this.loans.userId) {
      // Preenche o ID do livro no objeto de empréstimo
      this.loans.bookId = this.book!.id;
      this.loans.borrowDate = new Date();
      this.loans.dueDate = new Date();
      this.loans.dueDate.setDate(this.loans.dueDate.getDate() + 10); // Define uma data de devolução (10 dias após o empréstimo)

      try {
        // Chama o serviço para criar o empréstimo
        this.loansService.createLoans(this.loans).subscribe(response => {
          console.log('Empréstimo confirmado', response);
          // Atualiza a quantidade de cópias disponíveis
          this.book!.availableCopies--;
          this.closeModal(); // Fecha o modal após a confirmação
        });
      } catch (error) {
        console.log('Erro ao emprestar livro', error);
      }
    } else {
      console.log('Por favor, insira um e-mail válido.');
    }
  }
}
