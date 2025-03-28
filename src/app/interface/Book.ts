export interface Book {
  id: number;
  title: string;
  authorId: number | null;
  publisher: string;
  publisherYear: string;
  categoryId: number | null;
  availableCopies: number;
  totalCopies: number | null;
  createdAt: string;
  coverImage: string | null;
}
