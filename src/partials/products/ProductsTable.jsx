import React, { useState, useEffect } from 'react';
import PaginationNumeric from '../../components/PaginationNumeric';
import Products from './ProductsTableItem';


const PRODUCTS_QUERY = `
{
  fetchProducts{
   results(perPage:10,page:0){
     id
     price
     sku
     stock
     tax
     title
     }
   pagination(perPage:10, page:0 ){
     firstPage
     lastPage
     currentPage
     prevPage
     nextPage
     totalResults
    }
   }
   
 }
`


function ProductsTable() {


useEffect(()=>{
  fetch('http://vps-123eb2fc.vps.ovh.net/graphql',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({query: PRODUCTS_QUERY})
  }).then(response=>response.json())
  .then(data=>setProducts(data.data.fetchProducts.results))
  //console.log(products.replace('results','pagination'))
  
},[])

const [products,setProducts]=useState([]);
 


  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">Productos <span className="text-slate-400 font-medium">67</span></h2>
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
                  <div className="font-semibold text-left">Articulo</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
                  <div className="font-semibold text-left">Stock</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left ">Impuesto</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Precio</div>
                </th>
              
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                
                products.map(product => {
                  return (
                    <Products
                      key={product.sku}
                      sku={product.sku}
                      title={product.title}
                      stock={product.stock}
                      tax={product.tax}
                      price={product.price}
                    />
                  )
                })
              }
              
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
