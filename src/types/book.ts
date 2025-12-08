export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  amazonUrl: string;
  genre?: string;
  createdAt: Date;
}

export interface PinTemplate {
  id: string;
  name: string;
  style: 'cover' | 'classic' | 'modern' | 'minimal' | 'bold' | 'elegant';
}

export interface GeneratedPin {
  id: string;
  bookId: string;
  templateId: string;
  imageUrl?: string;
  createdAt: Date;
}
