import api from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'

export type Book = {
  id: number
  title: string
  author: string
  publisher: string
  publishDate: string
  genre: string
  pages: number
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>(`/books`)
  return response.data
}

export const booksQueryOptions = queryOptions<Book[]>({
  queryKey: ['books'],
  queryFn: fetchBooks,
  initialData: [],
  staleTime: 0,
})

export const fetchBookCatalog = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>(`/admin/books`)
  return response.data
}

export const bookCatalogQueryOptions = queryOptions<Book[]>({
  queryKey: ['books'],
  queryFn: fetchBookCatalog,
  initialData: [],
  staleTime: 0,
})
