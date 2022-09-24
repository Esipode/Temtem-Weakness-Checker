import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../redux/partySlice';

function Team({ tems }) {
  const dispatch = useDispatch();

	const party = useSelector((state) => state.party.value);

  const buildParty = useMemo(() => {
    return tems.filter((tem) => {
      return Object.keys(party).includes(tem.name);
    })
    .map((tem) => ({
      ...tem, moveset: party[tem.name]
    }));
  }, [tems, party]);

  const handleRemove = (name) => {
    let partyCopy = {...party};
    partyCopy[name] = undefined;

    dispatch(set(partyCopy));
  }

	return (
    <div className='my-tem-team'>
      {buildParty.map((tem) => {
        return (
          <div className='team-member' key={tem.name}>
            <div className='remove-btn' onClick={() => handleRemove(tem.name)}>x</div>
            <img className='team-portrait' src={tem.wikiPortraitUrlLarge} key={tem.name} alt={`team--${tem.name}`} />
          </div>
        )
      })}
    </div>
	);
}

export default Team;
