import React, { Component } from 'react'
import './App.css';
import {MyForm} from './components/RegisterForm';
//import { Form, Input, DatePicker, Select, Button } from "antd";
//var Instance = new RegisterForm();
//const app = Form.create()(RegisterForm);
export default class App extends Component {
  
  render() {
    return (
      <MyForm />
    )
  }
}

