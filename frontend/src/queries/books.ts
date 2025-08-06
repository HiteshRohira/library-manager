import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

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
  const response = await axios.get<Book[]>(`/api/books`)
  return response.data
}

export const booksQueryOptions = queryOptions<Book[]>({
  queryKey: ['books'],
  queryFn: fetchBooks,
  initialData: [],
  staleTime: 0,
})
