import { useState, useEffect } from 'react';
import './styles/App.scss';
import TemList from './components/temList';

function App() {

	const [temData, setTemData] = useState([]);

	useEffect(() => {
		if (!temData.length) {
			fetch('https://temtem-api.mael.tech/api/temtems?weaknesses=true').then((res) => res.json()).then((data) => setTemData(data));
		}
	});

  return (
    <div className="App">
      <TemList tems={temData} />
    </div>
  );
}

export default App;
