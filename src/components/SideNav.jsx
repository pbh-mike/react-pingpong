import React, {Component}  from 'react';
import {Link} from 'react-router-dom';

class SideNav extends Component {

	render(){
		return (
			<aside className="section-side-nav">
				<ul className="text-white p-4">
					<li>
						<Link to="dashboard">Dashboard</Link>
					</li>
					<li>
						<Link to="profile">Profile</Link>
					</li>
					<li>
						<Link to="profile">Thing</Link>
					</li>
					<li>
						<Link to="profile">Yeah</Link>
					</li>
				</ul>
			</aside>
		);
	}

}

export default SideNav;