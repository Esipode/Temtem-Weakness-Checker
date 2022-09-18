import { useState, useMemo } from 'react';
import Weaknesses from './weaknesses';

function TemList({ tems }) {

	const [search, setSearch] = useState('');
	
	const checkMatch = (name, number, string) => (
		name.toLowerCase().includes(string) ||
		number.toString().includes(string)
	);

	const temList = useMemo(() => {
		return tems.map((tem) => {
			if (checkMatch(tem.name, tem.number, search)) {
				return (
					<div className='tem-wrapper' key={tem.name}>
						<img className='tem-portrait' src={tem.wikiPortraitUrlLarge} alt={tem.name} />
						<div className='tem-info'>
							<div className='tem-title'>
								<p className='tem-number'>#{tem.number}</p>
								<h3 className='tem-name'>{tem.name}</h3>
							</div>
							<Weaknesses tem={tem} />
						</div>
					</div>
				)
			}
			else return undefined;
			}).filter((tem) => tem !== undefined);
	}, [tems, search]);

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
