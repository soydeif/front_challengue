import React, { useState, useEffect } from 'react';
import PaginationNumeric from '../../components/PaginationNumeric';
import Products from './ProductsTableItem';
import { useTranslation } from 'react-i18next';
import SearchForm from '../actions/SearchForm';
import FilterButton from '../../components/DropdownFilter';

const productsQuery = (pageNum=1) =>{

return `   
{
  fetchProducts{
   results(perPage:10,page:${pageNum}){
     id
     price
     sku
     stock
     tax
     title
     }
   pagination(perPage:10, page:${pageNum}){
     firstPage
     lastPage
     currentPage
     prevPage
     nextPage
     totalResults
    }
   }
   
 }`}


function ProductsTable() {
  
  const handlePage = (pageNum) =>{
    
    fetch('http://vps-123eb2fc.vps.ovh.net/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: productsQuery(pageNum) })
    }).then(response => response.json())
      .then(data => {       
        setProducts(data.data.fetchProducts.results)  
        let tagTaxes = []
        data.data.fetchProducts.results.map(result=>{
          if (!tagTaxes.includes(result.tax)){
            tagTaxes.push(result.tax)
          }
        })
        setTaxes(tagTaxes)
        setPagination(data.data.fetchProducts.pagination)
      })
  }

  useEffect(() => {
    handlePage()

  }, [])

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [t,i18n]=useTranslation("global")
  const [taxes, setTaxes] = useState([])
  const [filteredTaxes, setFilteredTaxes] = useState([])
  const [searchTerm,setSearchTerm]= useState("");
  const [searchResults, setSearchResults] = useState([])

   useEffect(() => {
    //console.log(event.target.value)
   if(searchTerm !== ""){
    const newResultsList= products.filter((product)=>{
      return(product.sku.includes(searchTerm.toLowerCase()) || product.title.toLowerCase().includes(searchTerm.toLowerCase())) 
    });
    setSearchResults(newResultsList)
  }
  else {
   setSearchResults(products)
  } 
  
   
  }, [searchTerm])
  

//logica para render busqueda  
  const searchHandler =(resultTerm)=>{
    setSearchTerm(resultTerm)
    
  }
  
  //////logica de filtrado

  useEffect(() => {
    
   if(filteredTaxes !== []){
    const newResultsList= products.filter((product)=>{
      console.log(filteredTaxes.includes(product.tax))
      return(filteredTaxes.includes(product.tax) ) 
      
    });
    setSearchResults(newResultsList)
  }
  else {
   setSearchResults(products)
  } 
  
   
  }, [filteredTaxes])
  

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      
      <header className="px-4 py-3 grid grid-flow-col">
        <h2 className="font-semibold text-slate-800">{t("subHeader.products")} <span className="text-slate-400 font-medium">{pagination.totalResults}</span></h2>
        
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          <SearchForm  searchKeyWord={searchHandler} term={searchTerm} /> 
         
          {/* Filter button */}
          <FilterButton taxes={taxes} setFilteredTaxes={setFilteredTaxes} filteredTaxes={filteredTaxes} align="right" />
        </div>
      </header>
      <div>
  
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200 ">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">SKU</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">{t("tagName.article")}</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                  <div className="font-semibold text-left">Stock</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left ">{t("tagName.tax")}</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">{t("tagName.price")}</div>
                </th>

              </tr>
            </thead>
            {/* Table body */}
            
            <tbody className="text-sm divide-y divide-slate-200">
              { searchResults.length ==0 ? products.map((product)=>{
                return(
                <Products                             
                key={product.sku}                               
                sku={product.sku}
                title={product.title}
                stock={product.stock}
                tax={product.tax}
                price={product.price}
                />)}) : searchResults.map((product)=>{
                return(
                <Products                             
                key={product.sku}                               
                sku={product.sku}
                title={product.title}
                stock={product.stock}
                tax={product.tax}
                price={product.price}
                />)})}
                                                                      

            </tbody>
          </table>

        </div>

      </div>
      {/* Pagination */}
      <div className="mt-8">
        <PaginationNumeric 
          nextPage={pagination.nextPage}
          handlePage={handlePage}
          prevPage={pagination.prevPage} 
          totalResults={pagination.totalResults} 
          lastPage={pagination.lastPage}
          currentPage={pagination.currentPage}
          firstPage={pagination.firstPage}
        />
      </div>
    </div>
  );

}

export default ProductsTable;
