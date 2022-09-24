import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../redux/partyModalSlice';
import { set } from '../redux/partySlice';
import Weaknesses from "./weaknesses";
import types from './typeIcons.json';

function PartyModal({ tem, enabled }) {
  const dispatch = useDispatch();

  const [isPartyMember, setPartyMember] = useState(!!JSON.parse?.(localStorage.getItem('myTemTeam'))?.[tem.name]);

  const [typesEnabled, setTypesEnabled] = useState(JSON.parse?.(localStorage.getItem('myTemTeam'))?.[tem.name] || {});

  const updateTypes = (type) => {
    if (isPartyMember) {
      setTypesEnabled((val) => {
        const numEnabledTypes = Object.values(val).filter((e) => e).length;
        if (numEnabledTypes > 3 && !val?.[type]) {
          return val;
        }
        else {
          return {...val, [type]: !val?.[type]};
        }
      });
    };
  }

  const handleSave = () => {
    let storedData = JSON.parse?.(localStorage.getItem('myTemTeam')) || {};
    storedData[tem.name] = !isPartyMember ? undefined : typesEnabled;

    dispatch(set(storedData));
    dispatch(toggle());
  }
  
	return (
    <div 
      className='party-modal-wrapper' 
      style={enabled ? {opacity: '1', pointerEvents: 'initial'} : {opacity: '0', pointerEvents: 'none'}}
    >
      <div className='party-modal'>
        <div className='close-btn' onClick={() => dispatch(toggle())}>x</div>
        <div className='modal-top'>
          <img className='modal-portrait' src={tem.wikiPortraitUrlLarge} alt={tem.name} />
          <div className='modal-info'>
            <div className='modal-title'>
              <p className='modal-number'>#{tem.number}</p>
              <h3 className='modal-name'>{tem.name}</h3>
            </div>
            <Weaknesses tem={tem} forceMobile />
          </div>
        </div>
        <div className='modal-mid'>
          <label className={`toggle-party-label ${isPartyMember ? 'checked' : ''}`} htmlFor='toggle-party'>Party Member</label>
          <input className='toggle-party' id='toggle-party' type='checkbox' onChange={() => setPartyMember((bool) => !bool)} />
          <button 
            className='save-btn' 
            disabled={isPartyMember && !Object.values(typesEnabled).filter((e) => e).length}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <div className='modal-bottom'>
          {Object.keys(types).map((type) => {
            return (
              <img 
                className='type' 
                src={types[type]} 
                alt={type} 
                key={type} 
                onClick={() => updateTypes(type)}
                style={{
                  opacity: (
                    !isPartyMember ? '0.1' :
                    typesEnabled?.[type] ? '1' : 
                    Object.values(typesEnabled).filter((e) => e).length > 3 ? '0.1' :
                    '0.3'
                  ),
                  cursor: (
                    !isPartyMember ? '' : 
                    (Object.values(typesEnabled).filter((e) => e).length > 3 && !typesEnabled?.[type]) ? '' :
                    'pointer'
                  )
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
	);
}

export default PartyModal;
