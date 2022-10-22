import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../redux/partyModalSlice';
import Weaknesses from './weaknesses';
import PartyModal from './partyModal';

function Tem({ tem, hasNumber, inParty = false }) {
  const dispatch = useDispatch();

  const party = useSelector((state) => state.party.value);
  const showPartyModal = useSelector((state) => state.partyModal.value);
  const isCompetitive = useSelector((state) => state.competitive.value);

  const maxTeamSize = 6 + (isCompetitive ? 2 : 0);

	return (
    <div className='tem-wrapper' key={tem.name} style={{display: hasNumber ? "inherit" : "none"}}>
      <div className='portrait' style={{backgroundImage: `url(${tem.wikiRenderStaticUrl})`}}/>
      <div className='info'>
        <div className='title'>
          <p className='number'>#{tem.number}</p>
          <h3 className='name'>{tem.name}</h3>
          {Object.keys(party || {}).length < maxTeamSize ?
            <button 
              className={`add-team-btn ${inParty ? 'in-party' : ''}`} 
              onClick={() => dispatch(toggle(tem.name))}
            >
              Edit
            </button>
          : ''}
        </div>
        <Weaknesses tem={tem} />
      </div>
      {showPartyModal === tem.name && <PartyModal tem={tem} enabled={showPartyModal} />}
    </div>
	);
}

export default Tem;
