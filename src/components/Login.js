import React from 'react';
import { connect } from 'react-redux';
import { ButtonInput, Input } from 'react-bootstrap';
import { login } from '../actions';

const mapStateToProps = ({ reducer: state }) => {
  return {
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (e, name) => {
      e.preventDefault();
      dispatch(login(name.trim()));
    }
  }
}

const Login = ({ isLoading, handleSubmit }) => {
  let input;

  return (
    <form onSubmit={e => handleSubmit(e, input.getValue())}>
      <Input ref={node => input = node} type="text" label="Traveler's name" placeholder="Amos, Andy or Evie" autoFocus />
      <ButtonInput
        type="submit"
        bsStyle="primary"
        disabled={isLoading}
        block>
        {isLoading ? 'Loading...' : 'Enter'}
      </ButtonInput>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
