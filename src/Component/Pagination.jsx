// src/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    console.log(currentPage);
    console.log(totalPages);


  const handlePreviousPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        window.scrollTo(0,0)
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0,0)

    }
  };

  return (
    <div className='py-10 flex items-center justify-around'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className='text-white font-semibold border p-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700'>

        Previous
      </button>
      <span className='text-white'> Page {currentPage} of {totalPages} </span>
      <button onClick={handleNextPage} disabled={currentPage === 0} className='text-white font-semibold border p-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700'>

        Next
      </button>
    </div>
  );
};

export default Pagination;
