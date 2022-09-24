import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../redux/partySlice';
import { set as setTems } from '../redux/temsSlice';
import { toggle } from '../redux/competitiveSlice';
import { toggle as weaknessesToggle } from '../redux/teamWeaknesses';
import Tem from './tem';
import Team from './team';

function TemList() {
	const dispatch = useDispatch();

	const partyModalOpen = useSelector((state) => state.partyModal.value);
  const isCompetitive = useSelector((state) => state.competitive.value);
  const showTeamWeaknesses = useSelector((state) => state.teamWeaknesses.value);
  const party = useSelector((state) => state.party.value);
	const tems = useSelector((state) => state.tems.value);

	const [search, setSearch] = useState('');

	// Fetch Temtems from API
	useEffect(() => {
		if (!tems.length) {
			fetch('https://temtem-api.mael.tech/api/temtems?weaknesses=true').then((res) => res.json()).then((data) => dispatch(setTems(data)));
		}
	});

	const checkMatchRegex = (tem, searchRegex) => (
		tem.name.toLowerCase().match(searchRegex) || 
		tem.number.toString().match(searchRegex)		
	)

	const temList = useMemo(() => {
		const searchRegex = new RegExp(search, "i");
		let temsToShow = [];

		if (!search || !search.length || !!"".match(searchRegex)) {
			temsToShow = tems;
		} else {
			temsToShow = tems.filter(tem => checkMatchRegex(tem, searchRegex));
		}

		return new Set(temsToShow.map(tem => tem.number));
	}, [tems, search]);

	const handleCompetitive = () => {
		dispatch(toggle(!isCompetitive));
		const teamLength = Object.keys(party).length;
		if (isCompetitive && teamLength > 6) {
			let teamCopy = {...party};
			for (let i = 6; i < teamLength; i++) {
				teamCopy[Object.keys(party)[i]] = undefined;
			}
			
			dispatch(set(teamCopy));
		}
	}

	return (
		<div className="tem-list">
			<input 
				className='search' 
				value={search} 
				onChange={(e) => setSearch(e.target.value)} 
				placeholder='Search Temtem here...'
				disabled={partyModalOpen}
			/>
			<div className='toggle-wrapper'>
				{Object.keys(party || {}).length > 0 ?
					<>
						<label 
							className={`toggle-competitive-label ${isCompetitive ? 'checked' : ''} ${partyModalOpen ? 'disabled' : ''}`} 
							htmlFor='toggle-competitive'
						>
							Competitive Team
						</label>
						<input disabled={partyModalOpen} className='toggle-competitive' id='toggle-competitive' type='checkbox' onChange={handleCompetitive} />
					</>
				: ''}

				{Object.keys(party || {}).length > 0 ?
					<>
						<label 
							className={`toggle-weaknesses-label ${showTeamWeaknesses ? 'checked' : ''} ${partyModalOpen ? 'disabled' : ''}`} 
							htmlFor='toggle-weaknesses'
						>
							Team Effectiveness
						</label>
						<input disabled={partyModalOpen} className='toggle-weaknesses' id='toggle-weaknesses' type='checkbox' onChange={() => dispatch(weaknessesToggle(!showTeamWeaknesses))} />
					</>
				: ''}
			</div>
			{tems?.length ? 
				<div className='tem-container'>
					{tems.map((tem) => (
						<Tem tem={tem} hasNumber={temList.has(tem.number)} key={tem.name} />
					))}
					{
						!temList.size && search?.length && (
							<p className='tem-missing-warning'>
								<span className='tem-warning tem-tag'>⚠</span> No Temtem with that <span className='tem-tag'>name </span> or <span className='tem-tag'>number</span> found
							</p>
						)
					}
				</div>
			: ''}
			<Team tems={tems} />
		</div>
	);
}

export default TemList;
