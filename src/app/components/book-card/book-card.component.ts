import { Component, Input } from '@angular/core';
import { Book } from '../../interface/Book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']  // Corrigido para styleUrls
})
export class BookCardComponent {
  @Input() book?: Book;
  defaultCoverImage = 'https://m.media-amazon.com/images/I/410ueKwaa0L.jpg'; // Imagem padrão

  ngOnInit(): void {
    if (!this.book?.coverImage) {
      this.book!.coverImage = this.defaultCoverImage;
    }
  }
}
