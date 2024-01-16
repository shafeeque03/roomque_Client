import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({currentPage,setCurrentPage,totalPages,numbers}) => {
  

  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changePage(num) {
    setCurrentPage(num);
  }
  return (
    <div>
      <nav aria-label="Page navigation example" className="mt-4">
            <ul className="inline-flex -space-x-px">
              {currentPage !== 1 && <li>
                <a
                  className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                  onClick={prevPage}
                >
                  <FontAwesomeIcon icon={faArrowLeft}/>
                </a>
              </li>}
              {numbers.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      onClick={() => changePage(item)}
                      className={
                        currentPage == item
                          ? "px-3 py-2 leading-tight text-gray-500 bg-blue-900 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer"
                          : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                      }
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
              {currentPage !== totalPages && <li>
                <a
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                  onClick={nextPage}
                >
                  <FontAwesomeIcon icon={faArrowRight}/>
                </a>
              </li>}
            </ul>
          </nav>
    </div>
  )
}

export default Pagination