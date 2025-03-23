import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Adicionando FormsModule
import { BookCardComponent } from "../book-card/book-card.component";
import { BookService } from '../../services/book.service';
import { Book } from './../../interface/Book';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent], // Incluindo FormsModule aqui
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchQuery: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getAllBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.filteredBooks = data;  // Inicializa os livros filtrados com todos os livros
    });
  }


  filterBooks() {
    if (this.searchQuery) {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredBooks = this.books;  // Se o campo estiver vazio, exibe todos os livros
    }
  }
}
