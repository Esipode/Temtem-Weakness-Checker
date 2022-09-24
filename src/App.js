import './styles/App.scss';
import TemList from './components/temList';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <div className="App">
			<Provider store={store} >
      	<TemList />
			</Provider>
    </div>
  );
}

export default App;
