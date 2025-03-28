import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Adicionando FormsModule
import { BookCardComponent } from "../book-card/book-card.component";
import { BookService } from '../../services/book.service';
import { Book } from './../../interface/Book';
import { CategoryDTO } from '../../interface/CategoryDTO';
import { BookCreateDTO } from '../../interface/BookCreateDTO';

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
  categories: CategoryDTO[] = [];
  searchQuery: string = '';
  isAddBookFormVisible: boolean = false;
  newBook: BookCreateDTO = {
    title: '',
    authorId: 0,
    publisher: '',
    publisherYear: '',
    category: 0,
    availableCopies: 0,
    totalCopies: 0,
    createdAt: '',
    coverImage: ''
  };
  constructor(private bookService: BookService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.bookService.getAllBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.filteredBooks = data;
    });

    this.categoryService.getAllCategories().subscribe((data: CategoryDTO[]) => {
      this.categories = data;
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
  openAddBookForm() {
    this.isAddBookFormVisible = true;
  }

  closeAddBookForm() {
    this.isAddBookFormVisible = false;
    // Limpar os campos após o cancelamento
    this.newBook = {
      title: '',
      authorId: 0,
      publisher: '',
      publisherYear: '',
      category: 0,
      availableCopies: 0,
      totalCopies: 0,
      createdAt: '',
      coverImage: ''
    };
  }

  addBook() {
    // Verificar se o título e o autor estão definidos
    if (!this.newBook.title || !this.newBook.authorId) {
      alert('Título e autor são obrigatórios!');
      return;
    }

    // Chamar o serviço para criar o livro
    this.bookService.createBook(this.newBook).subscribe(
      (book: Book) => {
        // Adicionar o livro à lista após sucesso
        this.books.push(book);
        this.filterBooks(); // Atualizar os livros filtrados
        this.closeAddBookForm(); // Fechar o formulário após adicionar
      },
      (error) => {
        // Tratar erro e fornecer feedback ao usuário
        console.error('Erro ao adicionar o livro', error);
        alert('Houve um erro ao adicionar o livro. Tente novamente.');
      }
    );
  }
}
