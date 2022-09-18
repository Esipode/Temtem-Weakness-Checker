import { useState, useMemo } from 'react';
import Weaknesses from './weaknesses';

function TemList({ tems }) {

	const [search, setSearch] = useState('');

	const checkMatchRegex = (tem, searchRegex) => (
		tem.name.toLowerCase().match(searchRegex) || 
		tem.number.toString().match(searchRegex)		
	)

	const temList = useMemo(() => {
		const searchRegex = new RegExp(search);
		let temsToShow = [];

		if (!search || !search.length || !!"".match(searchRegex)) {
			temsToShow = tems;
		} else {
			temsToShow = tems.filter(tem => checkMatchRegex(tem, searchRegex));
		}

		return new Set(temsToShow.map(tem => tem.number));
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
				{tems.map((tem) => (
					<div className='tem-wrapper' key={tem.name} style={{display: temList.has(tem.number) ? "inherit" : "none"}}>
						<img className='tem-portrait' src={tem.wikiPortraitUrlLarge} alt={tem.name} />
						<div className='tem-info'>
							<div className='tem-title'>
								<p className='tem-number'>#{tem.number}</p>
								<h3 className='tem-name'>{tem.name}</h3>
							</div>
							<Weaknesses tem={tem} />
						</div>
					</div>
				))}
				{
					!temList.size && search?.length && (
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
