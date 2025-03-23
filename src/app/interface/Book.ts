export interface Book {
  id: number;
  title: string;
  authorId: number;
  publisher: string;
  publisherYear: string;
  categoryId: number;
  availableCopies: number;
  totalCopies: number;
  createdAt: string;
  coverImage: string | null;
}
