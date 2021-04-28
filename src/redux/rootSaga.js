import { call, all } from 'redux-saga/effects';
import userSagas from './User/user.sagas';



export default function* rootSaga() {
    yield all([call(userSagas)]);
}