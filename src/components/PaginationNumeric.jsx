import React from 'react';

function PaginationNumeric(props) {
  const pagGenerator = (currentPage, totalResults, handlePage) => {
    
    
    return (
      <>
        <li onClick={(e) => { (currentPage !== 1) ? (handlePage(currentPage)) : ""}}>
          <span className="inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm">{currentPage}</span>
        </li>
        <li>
          <span className="read-only:bg-gray-100 inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-white border border-slate-200 text-blue-500">...</span>
        </li> 
        <li onClick={(e) => { (handlePage(totalResults) )}}>
          <span className="inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm">{totalResults}</span>
        </li>
      </>
    )
  }
  return (
    <>
      <div className="flex justify-center">
        <nav className="flex" role="navigation" aria-label="Navigation">
          <div className="mr-2 " onClick={(e) => {
            if (props.prevPage !== null) return (props.handlePage(props.prevPage))
          }}>
            <a href="#0" className="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm">
              <span className="sr-only" >{props.prevPage}</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
              </svg>
            </a>

          </div>
          <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
            
            {pagGenerator(props.currentPage, props.totalResults, props.handlePage)}
            
          </ul>
          <div className="ml-2" onClick={(e) => {

            if (props.nextPage !== null) return (props.handlePage(props.nextPage))
          }}>
            <a href="#0" className="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm">
              <span className="sr-only" >{props.nextPage}</span><wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
      <div className="flex justify-center">
        <div className="text-sm text-slate-500 text-center sm:text-left py-2">
          {/* <span className="font-medium text-slate-600">{props.currentPage}</span> a <span className="font-medium text-slate-600">{props.nextPage}</span> <span className="font-medium text-slate-600">{props.lastPage}</span> */}
        </div>
      </div> 
    </>
  );
}

export default PaginationNumeric;
