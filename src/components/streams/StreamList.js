import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const StreamList = () => {
	const dispatch = useDispatch();
	const streams = useSelector((state) => Object.values(state.streams));
	const currentUserId = useSelector((state) => state.auth.userId);
	const userSignedIn = useSelector((state) => state.auth.isSignedIn);

	useEffect(() => {
		dispatch(fetchStreams());
	}, []);

	const renderAdmin = (stream) => {
		if (stream.userId === currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<Link
						to={`/streams/delete/${stream.id}`}
						className="ui button negative"
					>
						Delete
					</Link>
				</div>
			);
		}
	};

	const renderList = () => {
		return streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/streams/${stream.id}`} className="header">
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	};

	const renderCreate = () => {
		if (userSignedIn) {
			return (
				<div style={{ textAlign: "right" }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			);
		}
	};
	return (
		<div>
			<h2>Streams</h2>
			<div className="ui celled list">{renderList()}</div>
			{renderCreate()}
		</div>
	);
};

// class StreamList extends React.Component {
// 	componentDidMount() {
// 		this.props.fetchStreams();
// 	}

// 	renderAdmin = (stream) => {
// 		if (stream.userId === this.props.currentUserId) {
// 			return (
// 				<div className="right floated content">
// 					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
// 						Edit
// 					</Link>
// 					<Link
// 						to={`/streams/delete/${stream.id}`}
// 						className="ui button negative"
// 					>
// 						Delete
// 					</Link>
// 				</div>
// 			);
// 		}
// 	};

// 	renderList = () => {
// 		return this.props.streams.map((stream) => {
// 			return (
// 				<div className="item" key={stream.id}>
// 					{this.renderAdmin(stream)}
// 					<i className="large middle aligned icon camera" />
// 					<div className="content">
// 						<Link to={`/streams/${stream.id}`} className="header">
// 							{stream.title}
// 						</Link>

// 						<div className="description">{stream.description}</div>
// 					</div>
// 				</div>
// 			);
// 		});
// 	};

// 	renderCreate = () => {
// 		if (this.props.userSignedIn) {
// 			return (
// 				<div style={{ textAlign: "right" }}>
// 					<Link to="/streams/new" className="ui button primary">
// 						Create Stream
// 					</Link>
// 				</div>
// 			);
// 		}
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<h2>Streams</h2>
// 				<div className="ui celled list">{this.renderList()}</div>
// 				{this.renderCreate()}
// 			</div>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		streams: Object.values(state.streams),
// 		currentUserId: state.auth.userId,
// 		userSignedIn: state.auth.isSignedIn,
// 	};
// };

// export default connect(mapStateToProps, { fetchStreams })(StreamList);
