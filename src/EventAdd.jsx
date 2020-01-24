import React, { Component } from 'react';
import SideNav from './components/SideNav';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EventAdd extends Component {

	state = {
		date: null,
		time: null
	};

	handleInput = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}

	handleForm = e => {
		e.preventDefault();
	}

	render(){
		return (
			<div>
				<SideNav />
				<div className="section-main">
					<h1 className="hdln_1">Events</h1>
					<h2 className="hdln_2">Add Event</h2>

					<form className="form" onSubmit={this.handleForm}>
						<label>Date</label>
						<input type="date" name="date" onChange={this.handleInput} />
						<label>Time</label>
						<input type="time" name="time" onChange={this.handleInput} />
						<label>Length</label>
						<input type="time" name="length" onChange={this.handleInput} />
						<input type="submit" value="Submit" />
					</form>

				</div>
			</div>
		);
	}

}

export default EventAdd;