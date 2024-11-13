import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [data ,setData]= useState<Type[]> ([])
  const nameRef = useRef<HTMLInputElement | null >(null)
  const dateRef = useRef<HTMLInputElement | null> (null)

  interface Type {
    name: string,
    date: number
  }

  useEffect(() =>{
    const locdata = localStorage.getItem('data')
    if (locdata) {
      setData(JSON.parse(locdata))
    }
  },[])

  function addCard(e:React.FormEvent) {
    e.preventDefault()

    if (nameRef.current && dateRef.current) {
      let newData: Type = {
        name: nameRef.current.value,
        date: Date.parse(dateRef.current.value),
      }

      let dataNew = [...data,newData]
      setData(dataNew)

      localStorage.setItem('data',JSON.stringify(dataNew))

      nameRef.current.value = '';
      dateRef.current.value = '';
    }
    
  }

  return (
    <div>
      <div className='max-w-[600px] mx-auto bg-slate-400 mt-16 p-5 rounded-md'>
        <h1 className='text-center text-4xl font-bold text-blue-500 mb-5'>TODO</h1>
        <div className='flex justify-between mb-4'>
          <input ref={nameRef} className='py-2 px-2 w-[250px] rounded-md' type="text" />
          <input ref={dateRef} className='py-2 px-2 w-[250px] rounded-md' type="date" />
        </div>
        <button onClick={addCard} className='py-2 rounded-md text-white bg-green-600 w-full'>
          ADD
        </button>
        <h2 className='text-2xl text-gray-700 font-bold mt-5'>Todo items</h2>
        <div className='flex flex-col gap-2 mt-4'>
          {data.length > 0 &&
            data.map((value, index) => (
              <div className='w-full p-3 bg-red-500 rounded-md flex justify-between' key={index}>
                <h1 className='text-xl text-white max-w-[300px]'>{value.name}</h1>
                <p className='text-white'>{new Date(value.date).toLocaleDateString()}</p> 
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
