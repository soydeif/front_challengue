import React, { useEffect, useState } from 'react';

const PRODUCTS_QUERY = `
{
 fetchProducts{
  results(perPage:100,page:0){
  	id
    price
    sku
    stock
    tax
    title
  	}
	}
}
`

function App2() {
  
  useEffect(()=>{
    fetch('http://vps-123eb2fc.vps.ovh.net/graphql',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({query: PRODUCTS_QUERY})
    }).then(response=>response.json())
    .then(data=>setProducts(data.data.fetchProducts.results))
  },[])

  const [products,setProducts]=useState([]);

  return (
    
    <>
      <h1>Hola Mundo</h1>
      <ul>
        {products.map((prod=>(
          <li key={prod.sku}>{prod.sku}-{prod.title}-{prod.price}-{prod.tax}-{prod.stock}</li>
        )))}
        
      </ul>
    </>
  );
}

export default App2;
