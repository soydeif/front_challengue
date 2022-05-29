import React from 'react'
import { render, screen } from '@testing-library/react'
import'@testing-library/jest-dom/extend-expect'
import ProductsTableItem from './ProductsTableItem'

describe('ProductsTableItem', ()=>{
   test.todo('Rendering must be completed'),() =>{ 
       render (<ProductsTableItem/>);
       expect (screen.getByText(/productos/i)).toHaveTextContent(/sku/i)

     }
   test.todo('')
    
})



// global.fetch=jest.fn(()=>Promise.resolve({
//     json: () => Promise.resolve({
//      title: " Lightweight "
//     })
// }))

// todo.describe('ProductsTable', ()=>{

//     it ("rendering the data", async () => {
//        await act (async ()=> render(<Products/>))
//         expect(screen.getByText('Lightweight')).toBeInTheDocument()
//     })
    
// })