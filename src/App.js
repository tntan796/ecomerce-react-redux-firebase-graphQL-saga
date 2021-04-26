import './default.scss';
import Header from './components/Header/index';
import HomePage from './pages/HomePage';
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
