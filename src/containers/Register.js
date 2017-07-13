import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterAction from '../actions/RegisterAction'
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log("User submitted form!");
    var name = event.target[0].value;
    var password = event.target[1].value;
    var email = event.target[2].value;
    var accountType = event.target[3].value
    var city = event.target[4].value;
    var state = event.target[5].value;
    var salesRep = event.target[6].value;
    this.props.registerAction();
  }

  render() {
    return (
      <div className="register-wrapper">
        <Form horizontal onSubmit={this.onFormSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ ControlLabel } sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Full Name" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ ControlLabel } sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" name="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ ControlLabel } sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="text" name="email" placeholder="Email" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formAccountSelect">
            <Col componentClass={ControlLabel} sm={2}>
                Account Type
            </Col>
            <Col sm={10}>
                <FormControl componentClass="select" placeholder="formAccountSelect">
                    <option value="customer">Customer</option>
                    <option value="employee">Employee</option>
                </FormControl>    
            </Col>
          </FormGroup>
          { /*<FormGroup controlId="formHorizontalName">
            <Col componentClass={ ControlLabel } sm={2}>
              Account Type
            </Col>
            <Col sm={10}>
              <FormControl type="text" name="type" value="customer" disabled />
            </Col>
          </FormGroup> */}
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ ControlLabel } sm={2}>
              City
            </Col>
            <Col sm={10}>
              <FormControl type="text" name="city" placeholder="City" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ ControlLabel } sm={2}>
              State
            </Col>
            <Col sm={10}>
              <FormControl type="text" name="state" placeholder="State" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ ControlLabel } sm={2}>
              Sales Representative
            </Col>
            <Col sm={10}>
              <FormControl type="text" name="employee" placeholder="Employee you worked with" />
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
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    registerAction: RegisterAction
  }, dispatch)
}


export default connect(null, mapDispatchToProps)(Register);