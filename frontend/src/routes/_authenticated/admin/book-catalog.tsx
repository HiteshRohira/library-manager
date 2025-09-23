import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { bookCatalogQueryOptions } from '@/queries/books'

export const Route = createFileRoute('/_authenticated/admin/book-catalog')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, isError } = useQuery(bookCatalogQueryOptions)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading books.</div>
  }

  return (
    <div className='container mx-auto mt-8 shadow'>
      <h2 className='font-semibold mb-4'>Book Catalog</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Book ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead className='text-right'>Pages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(book => (
            <TableRow key={book.id}>
              <TableCell className='font-medium'>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell className='text-right'>{book.pages}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
