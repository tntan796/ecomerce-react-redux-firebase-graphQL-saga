import './default.scss';
import HomePage from './pages/HomePage';
import { Redirect, Route, Switch } from 'react-router';
import Registration from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import Login from './pages/Login';
import { useEffect } from 'react';
import { auth, handlUserProfile } from './firebase/ultils';
import Recovery from './pages/Recovery';
import * as UserAction from './redux/User/user.action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  let authenListener = null;

  let currentUser = useSelector((state) => state.user.currentUser);

  let dispatch = useDispatch();
  useEffect(() => {
    authenListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handlUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(
            UserAction.setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
              })
          )
        }); 
      }
      dispatch(
        UserAction.setCurrentUser(null)
      )
    });

    return () => {
      authenListener();
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render = {() => (
          <HomeLayout>
            <HomePage></HomePage>
          </HomeLayout>
        )}></Route>
        <Route path="/registration" render = {() => currentUser ?
        <Redirect to="/"/> : (
          <MainLayout>
            <Registration></Registration>
          </MainLayout>
        )}></Route>
        <Route path="/login" render = {() => (currentUser) ?
        <Redirect to = "/"/> : (
          <MainLayout>
            <Login></Login>
          </MainLayout>
        )}></Route>
         <Route path="/recovery" render = {() => currentUser ? <Redirect to="/"/> : (
          <MainLayout>
            <Recovery></Recovery>
          </MainLayout>
        )}></Route>
      </Switch>
    </div>
  );
}

export default App;
