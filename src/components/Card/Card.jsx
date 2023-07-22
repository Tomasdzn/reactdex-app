import './Card.css'
import { Capitalize, getTypeIcon } from '../../utils/misc';
import { useEffect, useState, useRef } from 'react';

const Card = ({ name, value, imgURL, fetchPokemonTypes, passSelectedPokemon }) => {
  const [types, setTypes] = useState([]);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const getTypes = async () => {
      const typesArray = await fetchPokemonTypes(); // Call the function to get the types
      setTypes(typesArray);
    };
    getTypes();
  }, [fetchPokemonTypes]);

  const handleCardClick = () => {
    cardRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='cdt-ct' onClick={handleCardClick}>
      <div ref={cardRef} className='card-container' value={value} onClick={() => passSelectedPokemon(value)}>
        <div className='card-img'>
          <img src={imgURL} alt="sprite"/>
        </div>
        <div className='card-name'>
          <b>{name}</b>
          <div className='card-info'>
            {types.map((typeName,index) => (
              <div className='card-info-index' key={index}>
                <span className='typename-span' key={typeName}>{Capitalize(typeName)}</span>
                <img
                  key={typeName+1}
                  src={getTypeIcon(typeName)}
                  alt="type"
                  className='card-type-icon'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Card;