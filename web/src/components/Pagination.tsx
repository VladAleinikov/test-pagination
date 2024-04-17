import { Pagination as PaginationBootstrap } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number,
  lastPage: number,
}
export const Pagination = ({ currentPage, lastPage }: PaginationProps) => {
  const pages = [];
  let start = 0;
  if (currentPage >= 5) {
    start = currentPage - 4;
  }
  if (currentPage > (lastPage - 6)) { 
    start = lastPage - 9;
  }

  for (let i = start; i < (start + 10); i++) {
    pages.push(i);
  }
  return (
    <PaginationBootstrap>
      <PaginationBootstrap.First disabled={currentPage === 0} href='/?page=0' />
      <PaginationBootstrap.Prev disabled={currentPage === 0} href={'/?page=' + (currentPage - 1)} />
      {currentPage >= 5 && <PaginationBootstrap.Ellipsis />}

      {pages.map(page => 
        <PaginationBootstrap.Item key={page} active={page === currentPage} href={'/?page=' + page}>
          {page + 1}
        </PaginationBootstrap.Item>)}

      {currentPage <= (lastPage - 6) && <PaginationBootstrap.Ellipsis />}
      <PaginationBootstrap.Next disabled={currentPage === lastPage} href={'/?page=' + (currentPage + 1)} />
      <PaginationBootstrap.Last disabled={currentPage === lastPage} href={'/?page=' + lastPage} />
    </PaginationBootstrap >
  )
}