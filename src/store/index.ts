import { createStore } from 'vuex';
import auth from './auth';
import user from './user';
import houses from './houses';

export default createStore({ modules: { auth, user, houses } });
