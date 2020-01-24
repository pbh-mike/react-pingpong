import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import Error from './components/Error';
import SideNav from './components/SideNav';

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {name: props.name, email: props.email, errors: {}};
	}

	handleForm = (e) => {
		e.preventDefault();
		const data = {
			name: this.state.name,
			email: this.state.email
		};

		axios
			.patch(process.env.REACT_APP_API_URL + '/auth/update', data)
			.then(res => {
				console.log(res.data);
			})
			.catch(e => {
				if(e.response){
					console.log('err: ', e.response.data );
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
		return (
			<div className="flex w-full">
				<SideNav />
				<section className="section-main">
					<form className="form" onSubmit={this.handleForm}>
	            		<div className="p-4">
	            			<h1 className="hdln_1">Edit your details</h1>
	            			<Error error={this.state.errors['result'] ? this.state.errors['result'] : null} />
	            			<div className="mt-4">
	            				<label>Name</label>
	            				<input type="text" 
	            						name="name" 
	            						placeholder="Name..." 
	            						className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
	            						value={this.state.name}
	            						onChange={this.handleInput} />
	            			</div>
	            			<div className="mt-4">
	            				<label>Email</label>
	            				<input type="email" 
	            						name="email" 
	            						placeholder="Email..." 
	            						className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
	            						value={this.state.email}
	            						onChange={this.handleInput} />
	            			</div>
	            			<div className="mt-4">
	            				<input type="submit" 
	            						name="password" 
	            						value="Update"
	            						className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white" />
	            			</div>
	            		</div>
	            	</form>

				</section>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		name: state.auth.user.name,
		email: state.auth.user.email
	};
};

export default connect(mapStateToProps, null)(Profile);