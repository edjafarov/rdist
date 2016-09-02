import { connect } from 'react-redux'

class Remote extends React.Component {

  render() {
    const { onClick } = this.props;
    let props = JSON.stringify(this.props, null, 2);
    return <div>
      <h1>Remote</h1>
      <pre>
        {props}
      </pre>
      <div onClick={onClick}>[xxx]</div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state
  }
}

export function increment() {
  return { type: 'INCREMENT'}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(increment())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Remote);
