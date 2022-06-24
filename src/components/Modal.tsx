import React from 'react'
import './modalStyle.css'
import {useState} from 'react'

type ModalType = {
    modalData: any[];
    show:boolean
    onClose:React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>
}
let price:number;
function Modal(props:ModalType) {
    const [cepNumber, setCepNumber] = useState<number>()
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [price, setPrice] = useState(0)
    //INSERIR ESSES DADOS NUM OBJETO USANDO APENAS 1 SETSTATE
    if (!props.show){
        return null
    }
    const handleClose = ()=>{
        //envia tudo para o backend
        //props.onClose
    }
    const getCepData = async (cep:string) =>{
        let numCep:number = Number(cep.replace(/[^0-9]/g, ''));
        if(numCep){
            const api = await fetch(`https://viacep.com.br/ws/${numCep}/json/`);
            const data = await api.json();
            setCepNumber(numCep)
            setLogradouro(data.logradouro)
            setBairro(data.bairro)
            setLocalidade(data.localidade)
            setPrice(10);
        }else{
            setPrice(0);
        }
      }
  return (
    <div className='modal' onClick={props.onClose} >
        <div className='modal-content' onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">Dados para entrega</h2>
            </div>
            <div className="modal-body">
                {props.modalData?.map(item => {
                    return (
                        <div>
                            <img src={item.image?item.image:null} />
                            <h3>{item.title?item.title:''}</h3>
                        </div>
                    )
                })}
                <h3>Entrega: R${price}</h3>
            </div>
            <div className="modal-footer">
                <input type="text" placeholder='CEP' name='cep' defaultValue={cepNumber} onChange={(e) => getCepData(e.target.value)} maxLength={9} autoFocus/>
                <input type="text" placeholder='Nome da rua' value={logradouro} disabled />
                <input type="text" placeholder='Bairro' value={bairro} disabled />
                <input type="text" placeholder='Cidade' value={localidade} disabled />
                <input type="text" placeholder='Número' />
                <button onClick={props.onClose} className='button'>Confirmar</button>   
            </div>
        </div>
    </div>
  )
}

export default Modal