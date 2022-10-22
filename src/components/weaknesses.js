import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import typeIcons from './typeIcons.json';

function Weaknesses({ tem, forceMobile }) {

	const showTeamWeaknesses = useSelector((state) => state.teamWeaknesses.value);
	const party = useSelector((state) => state.party.value);
	const temsList = useSelector((state) => state.tems.value);

	const getWeaknesses = (data, types, name, mode) => types.map((type) => {
		if (data[type] >= 2 && mode === 'weak') {
			return (
				<div className='tem-weakness' key={`${name}-${type}`}>
					<div className='tem-multiplier'>x{data[type]}</div>
					<img className='tem-type' src={typeIcons[type]} alt={type} />
				</div>
			)
		}
		else if (data[type] < 1 && mode === 'strong') {
			return (
				<div className='tem-weakness' key={`${name}-${type}`}>
					<div className='tem-multiplier'>x{data[type]}</div>
					<img className='tem-type' src={typeIcons[type]} alt={type} />
				</div>
			)
		}
		else return undefined;
	}).filter((type) => type !== undefined);

	const getTeamWeaknesses = (enemyName) => {
		return Object.keys(party).map((partyMember) => {
			const enemy = temsList.filter((e) => e.name === enemyName)[0];

			const partyMemberData = temsList.filter((e) => e.name === partyMember)[0];
			const partyMemberMoves = party[partyMember];
			const effectiveMoves = Object.keys(partyMemberMoves).filter((move) => (
				enemy.weaknesses[move] > 1
			))
			const ineffectiveMoves = Object.keys(partyMemberMoves).filter((move) => (
				enemy.weaknesses[move] < 1
			))

			if (effectiveMoves.length) {
				return (
					<div className='party-member' key={`${partyMember}--weakness`}>
						<div className='weakness-portrait' style={{backgroundImage: `url(${partyMemberData.wikiRenderStaticUrl})`}} />
						<div className='moves'>
							<div 
								className='effective-moves' 
								style={{visibility: effectiveMoves.length ? 'visible' : 'hidden'}}
							>
								{effectiveMoves.map((type) => {
									return <img className='effective-type' src={typeIcons[type]} alt={`team--${type}`} key={type} />
								})}
							</div>
							<div 
								className='ineffective-moves' 
								style={{visibility: ineffectiveMoves.length ? 'visible' : 'hidden'}}
							>
								{ineffectiveMoves.map((type) => {
									return <img className='ineffective-type' src={typeIcons[type]} alt={`team--${type}`} key={type} />
								})}
							</div>
						</div>
					</div>
				)
			}
			else {
				return undefined;
			}
		}).filter((e) => e !== undefined)
	};

	const types = useMemo(() => {
		if (!showTeamWeaknesses || !Object.keys(party || {}).length || forceMobile) {
			return {
				weak: getWeaknesses(tem.weaknesses, Object.keys(tem.weaknesses), tem.name, 'weak'),
				strong: getWeaknesses(tem.weaknesses, Object.keys(tem.weaknesses), tem.name, 'strong'),
			}
		}
		else {
			return {team: getTeamWeaknesses(tem.name)}
		}
	}, [tem, party, forceMobile, showTeamWeaknesses]);

	return (
		<div className={`tem-types ${forceMobile ? 'force-mobile' : ''}`}>
			{types.weak?.length ? 
				<div className='tem-statlist'>
					Weak to <div className='tem-type-group' style={{background: 'rgba(0, 255, 0, 0.3)'}}>{types.weak}</div>
				</div>
			: ''}
			{types.strong?.length ? 
				<div className='tem-statlist'>
					Resists <div className='tem-type-group' style={{background: 'rgba(255, 0, 0, 0.5)'}}>{types.strong}</div>
				</div>
			: ''}
			{types.team?.length ? 
				<div className='tem-teamlist'>
					{types.team}
				</div>
			: ''}
		</div>
	);
}

export default Weaknesses;
