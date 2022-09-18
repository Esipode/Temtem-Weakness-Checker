import { useMemo } from 'react';
import typeIcons from './typeIcons.json';

function Weaknesses({ tem }) {

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

	const types = useMemo(() => {
		return {
			weak: getWeaknesses(tem.weaknesses, Object.keys(tem.weaknesses), tem.name, 'weak'),
			strong: getWeaknesses(tem.weaknesses, Object.keys(tem.weaknesses), tem.name, 'strong'),
		}
	}, [tem]);

	return (
		<div className='tem-types'>
			{types.weak.length ? 
				<div className='tem-statlist'>
					Weak to <div className='tem-type-group' style={{background: 'rgba(0, 255, 0, 0.3)'}}>{types.weak}</div>
				</div>
			: ''}
			{types.strong?.length ? 
				<div className='tem-statlist'>
					Resists <div className='tem-type-group' style={{background: 'rgba(255, 0, 0, 0.5)'}}>{types.strong}</div>
				</div>
			: ''}
		</div>
	);
}

export default Weaknesses;
