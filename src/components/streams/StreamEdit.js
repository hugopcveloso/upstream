import React from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import Loader from '../Loader'
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }
  
  render() {
    if (!this.props.stream) {
      return <div>{<Loader />}</div>
    }
    return(
      <div>
       <h3>{this.props.stream.title}</h3> 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // selects the appropriate stream
  return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStream} )(StreamEdit)
