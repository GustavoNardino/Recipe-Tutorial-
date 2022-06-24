import React, {useState} from 'react'

function Testes() {
    const [nomes, setNomes] = useState<string[]>([''])
    const handleNames = (e:string) =>{
        setNomes([...nomes, e])
    }
  return (
    <div>
        <h1>Nomes:</h1>
        <input type="text" onBlur={(e) => handleNames(e.target.value)} />
        {nomes.map(item => {
            return <h2>{item}</h2>
        })}
        
    </div>
  )
}

export default Testes