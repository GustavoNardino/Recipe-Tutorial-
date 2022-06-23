import Category from "./components/Category";
import Pages from "./pages/Pages";
import {BrowserRouter, Link, useNavigate} from 'react-router-dom'
import Search from "./components/Search";
import Modal from './components/Modal'
import styled from "styled-components";
import { GiKnifeFork } from 'react-icons/gi'
import {useState} from 'react'

const cartImg = require('./img/cart.png')

function App() {
  const [modalState, setModalState] = useState(false)
  
  return (
    <div className="App">
      <BrowserRouter>
        <Modal onClose={() => setModalState(false)} show={modalState} />
        <Nav>
          <GiKnifeFork />
          <Logo to='/'>Deliciousss</Logo>
          <Cart onClick={() => setModalState(true)}>Seu carrinho<img src={cartImg} alt="Carrinho" /></Cart>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`
const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2rem;
  }
  `
  const Cart = styled.div`
    border: 1px solid #c4c4c4;
    cursor: pointer;
    margin-left: 75%;
    :hover{
      border: 1px solid #000000;
    }
`
export default App;
