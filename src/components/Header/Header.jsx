import './Header.css'
import Pokeball from '../../img/Pokeball.png'

const Header = () => {
  return (
    <div className='header-container'>
      <h1>Reactdex</h1>
      <img src={Pokeball} alt="pokeball-img" />
    </div>
  )
}

export default Header
