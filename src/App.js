import './default.scss';
import Header from './components/Header/index';
import HomePage from './pages/HomePage';
import { Route } from 'react-router';
import Registration from './pages/Registration';
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/registration" component={Registration}></Route>
      </div>
    </div>
  );
}

export default App;
