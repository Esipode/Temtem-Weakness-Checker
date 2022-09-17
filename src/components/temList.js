import { useState, useEffect, useMemo } from 'react';
import typeIcons from './typeIcons.json';

function TemList() {

	const [temData, setTemData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (!temData.length) {
		fetch('https://temtem-api.mael.tech/api/temtems?weaknesses=true').then((res) => res.json()).then((data) => setTemData(data));
		}
	});
	
	const checkMatch = (name, number, string) => (
		name.toLowerCase().includes(string) ||
		number.toString().includes(string)
	);

	const getWeaknesses = (data, types, mode) => types.map((type) => {
		if (data[type] >= 2 && mode === 'weak') {
			return (
				<div className='tem-weakness'>
					<img className='tem-type' src={typeIcons[type]} alt={type} />
				</div>
			)
		}
		else if (data[type] < 1 && mode === 'strong') {
			return (
				<div className='tem-weakness'>
					<img className='tem-type' src={typeIcons[type]} alt={type} />
				</div>
			)
		}
		else return undefined;
	}).filter((type) => type !== undefined);

	const temList = useMemo(() => {
		return temData.map((tem) => {
			const weaknesses = getWeaknesses(tem.weaknesses, Object.keys(tem.weaknesses), 'weak');
			const strengths = getWeaknesses(tem.weaknesses, Object.keys(tem.weaknesses), 'strong');

			if (checkMatch(tem.name, tem.number, search)) {
				return (
					<div className='tem-wrapper'>
						<img className='tem-portrait' src={tem.wikiPortraitUrlLarge} alt={tem.name} />
						<div className='tem-info'>
							<div className='tem-title'>
								<p className='tem-number'>#{tem.number}</p>
								<h3 className='tem-name'>{tem.name}</h3>
							</div>
							<div className='tem-types'>
								{weaknesses.length ? 
									<div className='tem-statlist'>
										Weak to <div className='tem-type-group' style={{background: 'rgba(0, 255, 0, 0.3)'}}>{weaknesses}</div>
									</div>
								: ''}
								{strengths?.length ? 
									<div className='tem-statlist'>
										Strong against <div className='tem-type-group' style={{background: 'rgba(255, 0, 0, 0.5)'}}>{strengths}</div>
									</div>
								: ''}
							</div>
						</div>
					</div>
				)
			}
			else return undefined;
			}).filter((tem) => tem !== undefined);
	}, [temData, search]);

	return (
		<div className="tem-list">
			<input 
				className='search' 
				value={search} 
				onChange={(e) => setSearch(e.target.value)} 
				placeholder='Search Temtem here...'
			/>
			<div className='tem-container'>
				{temList}
				{
					!temList.length && search?.length && (
						<p className='tem-missing-warning'>
							<span className='tem-warning tem-tag'>⚠</span> No Temtem with that <span className='tem-tag'>name </span> or <span className='tem-tag'>number</span> found
						</p>
					)
				}
			</div>
		</div>
	);
}

export default TemList;
