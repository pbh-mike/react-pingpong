import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import cookie from 'js-cookie';

function Layout(props){

	const handleLogout = (e) => {
		e.preventDefault();
		cookie.remove('token');
		props.logout();
	};

	return (
		<div>
			<nav className={ !props.loggedIn ? 'main-nav mb4 bg1' : 'main-nav main-nav--loggedin mb4 bg1' }>
				<div className="container--full">
					<div className="frame pv2">
						<div className="blk">
							<h1 className="hdln_1 tcw mb0">PingPong</h1>
						</div>
						<div className="blk">
							<div className="tar">
								{
									!props.loggedIn ? (
										<Fragment>
											<Link to="/login">
												Login
											</Link>
											<Link to="/register">
												Register
											</Link>
										</Fragment> 
									) : (
										<Fragment>
											<Link to="/dashboard">
												Dashboard
											</Link>
											<Link to="/profile">
												Profile
											</Link>
											<Link to="/logout"
												  onClick={handleLogout}>
												Logout
											</Link>
										</Fragment>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</nav>
			{props.children}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		loggedIn: state.auth.loggedIn
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch({type: 'SET_LOGOUT'})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);