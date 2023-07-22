import './App.css'
import { useState } from 'react'

import Wrapper from './components/Wrapper/Wrapper'
import Pokeinfo from './components/Pokeinfo/Pokeinfo'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState()

  const passSelectedPokemon = (value) => {
    setSelectedPokemon(value)
  }

  return (
    <>
      <Header />
      <div className='all'>
        <main className='app-container'>
          <Wrapper 
            passSelectedPokemon={passSelectedPokemon}
          />
        </main>
        <Pokeinfo 
          selectedPokemon={selectedPokemon}
        />
        <Footer
          text="By <tsn-dev>"
        />
      </div>
    </>
  )
}

export default App
