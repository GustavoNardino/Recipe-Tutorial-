import React from 'react'
import './modalStyle.css'
import {useState} from 'react'

type ModalType = {
    show:boolean
    onClose:React.MouseEventHandler<HTMLButtonElement> 
}

function Modal(props:ModalType) {
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    
    if (!props.show){
        return null
    }
    
    const getCepData = async (cep:string) =>{
        let numCep:number = Number(cep.replace(/[^0-9]/g, ''));
        if(numCep){
            const api = await fetch(`https://viacep.com.br/ws/${numCep}/json/`);
            const data = await api.json();
            setLogradouro(data.logradouro)
            setBairro(data.bairro)
            setLocalidade(data.localidade)
        }else{
            console.log('endereço não encontrado')
        }
       
      }
  return (
    <div className='modal' onScroll={() => console.log('rodando')} onClick={() => props.onClose} >
        <div className='modal-content' onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">Dados para entrega</h2>
            </div>
            <div className="modal-body">
                <input type="text" placeholder='CEP' name='cep'  onChange={(e) => getCepData(e.target.value)} autoFocus/>
                <input type="text" placeholder='Nome da rua' value={logradouro} disabled />
                <input type="text" placeholder='Bairro' value={bairro} disabled />
                <input type="text" placeholder='Cidade' value={localidade} disabled />
                <input type="text" placeholder='Número' />
            </div>
            <div className="modal-footer">
                <button onClick={props.onClose} className='button'>Confirmar</button>
            </div>
        </div>
    </div>
  )
}

export default Modal