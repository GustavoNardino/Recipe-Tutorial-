import React from 'react';
import Home from './Home'
import Cuisine from './Cuisine'
import Searched from './Searched'
import Recipe from './Recipe'
import {Route, Routes, BrowserRouter, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'

type PagesProps = {
  setModalData: React.Dispatch<React.SetStateAction<any>>
}

function Pages(props: PagesProps) {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/cuisine/:type' element={<Cuisine />} />
          <Route path='/searched/:search' element={<Searched />} />
          <Route path='/recipe/:name' element={<Recipe setModalData={props.setModalData} />} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages