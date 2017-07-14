import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginAction from '../actions/LoginAction';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerMessage: '',
      passwordError: null,
      usernameError: null,
      formError: false
    }

    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this)
  }



  onLoginFormSubmit(event) {
    event.preventDefault();
    var username = event.target[0].value;
    var password = event.target[1].value;
    var error = false;
    var usernameError = false;

    if(password.length == 0){
      var passwordError = "error";
      error=true;
    }
    else{ 
      var passwordError = "null"
    }

    if(error){
      this.setState(
        {
          formError: true,
          usernameError: usernameError,
          passwordError: passwordError
        }
      );
    } else{
      this.props.registerAction(
        {
          username: username,
          password: password
        }
      )
    }
  }



  componentWillReceiveProps(nextProps) {
    if(nextProps.registerResponse.msg == 'loginSuccess') {
      this.props.history.push('/')
    } else if (nextProps.registerResponse.msg == 'userAlreadyExists'){
      this.setState({
        registerMessage: "Sorry, this username is already taken."
      })
    }
  }



  render() {

    if(this.props.registerResponse.msg == 'userInserted'){
      this.props.history.push('/');      
    }

    return (
      <div>
        <div className="register-wrapper">
          <Form horizontal onSubmit={this.onLoginSubmit} >
            <FormGroup controlId="formHorizontalName" validationState={this.state.usernameError}>
              <Col componentClass={ ControlLabel } sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="username" placeholder="Username" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalName" validationState={this.state.passwordError}>
              <Col componentClass={ ControlLabel } sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" name="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalName">
              <Col smOffset={2} sm={10}>
                  <Button bsStyle="primary" bsSize="small" type="submit">
                    Register
                  </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <h4>{this.state.registerMessage}</h4>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    registerResponse: state.registerReducer
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loginAction: LoginAction
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);