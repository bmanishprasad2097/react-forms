import React, { FormEvent, useRef, useState } from 'react'

type GroceryProduct  = {
  id: number
  name: string
  price: number
  quantity: number
}

const Header = () => {
  return (
    <div className='text-4xl bg-[#120624] text-[#d9cced] h-[100px] '>
      Welcome to Grocs | India's only grocery management app
    </div>
  )
}

interface FormProps {
  setGlist: (newItem: GroceryProduct[]) => void;
  Glist : GroceryProduct[]
}

const Form : React.FC<FormProps>  = ({setGlist , Glist}) =>{

  const itemName  = useRef<HTMLInputElement>(null);
  const itemPrice = useRef<HTMLInputElement>(null);
  const itemQuantity = useRef<HTMLInputElement>(null);


  function addItemtoList(e: FormEvent){
    e.preventDefault();
    
    if(itemName.current && itemPrice.current && itemQuantity.current)       
    {
        const newItem = {
          id: Date.now(),
          name: itemName.current.value,
          price: parseFloat(itemPrice.current.value),
          quantity: parseInt(itemQuantity.current.value)
 
        }
        setGlist([...Glist, newItem]);

          itemName.current.value = '';
          itemPrice.current.value = '';
          itemQuantity.current.value = '';
    }
    
    
  }
  
  return (
    <div className='mb-5 ml-2 mt-5'>
      <form onSubmit={addItemtoList}>
        <div>
          <label htmlFor="GName">Grocery Name: </label>
          <input type="text" className='border' ref={itemName}/>
        </div>
        <div>
          <label htmlFor="Gprice">Price: </label>
          <input type="text" className='border' ref={itemPrice}/>
        </div>
        <div>
          <label htmlFor="GQuantity">Quantity: </label>
          <input type="text" className='border' ref={itemQuantity} />
        </div>
        <div>
          <button type='submit' className=' border-2 border-[#120624] rounded-md'>Add</button>
        </div>
      </form>
    </div>
  )
}


const Card = (props : GroceryProduct )=>{
  return(
    <div className='ml-2'>
      <div>ID: {props.id}</div>
      <div>Item Name: {props.name}</div>
      <div>Price: {props.price}</div>
      <div>Quantity: {props.quantity}</div>
      <div>
        <button className='border-2 border-[#120624] rounded-md'>Remove</button>
      </div>
    </div>
  )
}
let products : GroceryProduct[] = [{
  id: 1,
  name: "Milk",
  price: 100,
  quantity: 2
}];

const App = () => {

  const [ Glist , setGlist] = useState(products)
  
  
  return (
    <div>
      <Header />
      <Form setGlist = {setGlist} Glist = {Glist}/>
      <div className='text-2xl mb-2'>
        Grocery List
      </div>
      <div>
        {Glist.map((item)=> {
          return <Card key={item.id} {...item}/>
        })}
      </div>
    </div>
  )
}

export default App