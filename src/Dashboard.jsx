import React, { Component } from 'react';
import SideNav from './components/SideNav';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {

	state = {
		loading: false,
		events: []
	};

	componentDidMount() {
		this.setState({loading: true});

		axios
			.get(process.env.REACT_APP_API_URL + '/events')
			.then(res => {
				this.setState({events: res.data.events, loading: false});
			})
			.catch(e => {
				if(e.response){
					console.log('err: ', e.response );
				}
			});
	}

	render(){

		let classes = 'section-main';

		if(this.state.loading){
			classes += ' loading'
		}

		return (
			<div>
				<SideNav />
				<div className={classes}>
					<h1 className="hdln_1">Dashboard</h1>
					<h2 className="hdln_2">Events</h2>
					<Link to="/events/add" className="ft4 pointer">Add event</Link>
					{
						this.state.events.map(event => <div>{event.title}</div>)
					}
				</div>
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

export default connect(mapStateToProps, null)(Dashboard);