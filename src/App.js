import './default.scss';
import HomePage from './pages/HomePage';
import { Redirect, Route, Switch } from 'react-router';
import Registration from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { auth, handlUserProfile } from './firebase/ultils';


function App() {
  const [state, setstate] = useState({currentUser: null})
  let authenListener = null;

  useEffect(() => {
    authenListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handlUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setstate({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        }); 
      }
      setstate({currentUser: null});
    });

    return () => {
      authenListener();
    }
  }, [])


  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render = {() => (
          <HomeLayout currentUser = {state.currentUser}>
            <HomePage></HomePage>
          </HomeLayout>
        )}></Route>
        <Route path="/registration" render = {() => state.currentUser ? <Redirect to="/"/> : (
          <MainLayout currentUser = {state.currentUser}>
            <Registration></Registration>
          </MainLayout>
        )}></Route>
        <Route path="/login" render = {() => (state && state.currentUser) ?
        <Redirect to = "/"/> : (
          <MainLayout  currentUser = {state.currentUser}>
            <Login></Login>
          </MainLayout>
        )}></Route>
      </Switch>
    </div>
  );
}

export default App;
