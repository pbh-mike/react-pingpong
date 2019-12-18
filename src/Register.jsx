import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import {connect} from 'react-redux';
import Error from './components/Error';

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '', 
			email: '', 
			password: '', 
			password_confirmation: '',
			errors: {}
		};
	}

	handleForm = (e) => {
		e.preventDefault();
		const data = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password_confirmation: this.state.password_confirmation
		};

		axios.post(process.env.REACT_APP_API_URL + '/auth/register', data)
			.then(res => {
				cookie.set('token', res.data.access_token);
				this.props.setLogin(res.data.user);
				this.props.history.push('/profile');
			})
			.catch(e => {
				if(e.response){
					console.log('err: ', e.response );
					this.setState({ errors: e.response.data.errors });
				}
			});
	}

	handleInput = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}

	render(){
		return(
			<div className="page-login flex">
	            <div className="w-1/3"></div>
	            <div className="w-1/3 mt-10 p-4 bg-white">
	            	<form className="border border-gray-500" onSubmit={this.handleForm}>
	            		<Error error={this.state.errors['result'] ? this.state.errors['result'] : null} />
	            		<div className="p-4">
	            			<h1 className="text-lg border-b border-gray-500">Register</h1>
	            			<div className="mt-4">
	            				<label>Name</label>
	            				<input type="text" 
	            						name="name" 
	            						placeholder="Name..." 
	            						className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
	            						onChange={this.handleInput} />
	            				<Error error={this.state.errors['name'] ? this.state.errors['name'] : null} />
	            			</div>
	            			<div className="mt-4">
	            				<label>Email</label>
	            				<input type="email" 
	            						name="email" 
	            						placeholder="Email..." 
	            						className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
	            						onChange={this.handleInput} />
	            				<Error error={this.state.errors['email'] ? this.state.errors['email'] : null} />
	            			</div>
	            			<div className="mt-4">
	            				<label>Password</label>
	            				<input type="password" 
	            						name="password" 
	            						placeholder="Password..." 
	            						className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
	            						onChange={this.handleInput} />
	            				<Error error={this.state.errors['password'] ? this.state.errors['password'] : null} />
	            			</div>
	            			<div className="mt-4">
	            				<label>Confirm Password</label>
	            				<input type="password" 
	            						name="password_confirmation" 
	            						placeholder="Password..." 
	            						className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
	            						onChange={this.handleInput} />
	            				<Error error={this.state.errors['password_confirmation'] ? this.state.errors['password_confirmation'] : null} />
	            			</div>
	            			<div className="mt-4">
	            				<input type="submit" 
	            						name="password" 
	            						value="Register"
	            						className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white" />
	            			</div>
	            		</div>
	            	</form>
	            </div>
	            <div className="w-1/3"></div>
	        </div>
		);
	}

}

const mapDispatchToProps = dispatch => {
	return {
		setLogin: (user) => dispatch({ type: "SET_LOGIN", payload: user })
	};
};

export default connect(null, mapDispatchToProps)(Register);