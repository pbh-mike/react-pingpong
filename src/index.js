import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import {Provider} from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

const jwt_secret = 'cWxCMyl1tvwUh31GZW5s4eImJ94cZImxZ0WuPUoW44vIr5Pjjq9EI9SBSfV6nSUS';
let token = cookie.get('token');

if(token){
	jwt.verify(token, jwt_secret, function(err, decoded){
		if(err){
			token = null;
			cookie.remove('token');
		}else{
			if(decoded.iss !== 'http://dev.pingpongapi.com/api/auth/login'){
				token = null;
				cookie.remove('token');
			}
		}
	});
}

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App /> 
		</Provider>,
		document.getElementById('root')
	);
};

if(token){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	axios.post('http://dev.pingpongapi.com/api/auth/me')
		.then(res => {
			store.dispatch({type: "SET_LOGIN", payload: res.data})
			render();
		});
}else{
	render();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
