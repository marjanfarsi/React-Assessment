
import React, { Component } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { Layout } from 'antd';
import '../App.css';
import axios from 'axios';


const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Footer, Content } = Layout;
     
 export default class RegisterForm extends Component {
  constructor(){
    super();
    this.state ={ messages:[], alertMsg: ''}

  };

   
 handleSubmit = e => {
    e.preventDefault();  

    this.props.form.validateFieldsAndScroll((err, values) => {
      const newMsg = [];

      if(this.state.messages.length === 0){
        this.setState({alertMsg: ''});}

        if( values.fname === undefined || values.fname  === "" ){
        newMsg.push("First Name is required!");
     }
      if(  values.lname === undefined || values.lname  === ""){
        newMsg.push("Last Name is required!");
     }
      if(  values.email === undefined || values.email  === ""){
        newMsg.push("Email is required!");
     }
    
      
       if(!(this.handlePhone(values.phone)) && !(values.phone ===  undefined || values.phone  === "")){
        newMsg.push("Wrong phone number format!");
      }
       if(!(this.handleEmail(values.email)) &&  !(values.email === undefined || values.email  === "")){
        newMsg.push("Wrong email address format!");
      }
       if(!(this.handleBirthdate(values.birthdate))){
        newMsg.push("Future date is not allowed!");  
      }
      this.setState({messages: newMsg});



       if (newMsg.length === 0){

         this.setState({alertMsg: ''});      

        axios.post(`https://data.usbnc.org/api/contact`, { values })
         .then(response => { 
          console.log(response)
           //response.status(200).send("Successfully saved your contact info");
          //response.status(400).send("Invalid Data (see list of messages below)");
          //response.status(500).send("Server Error “Unable to process your request at this time. Please try again");
        }).catch(e => 
          console.log('ERRORRRR!')
        )
       }
               
      else{
        this.setState({alertMsg : "Please consider the above error message(s) before moving forward!"})
      }
    });
  };

  handleBirthdate ( value) {
    
    var today = new Date();
    
    if (today < value) { 
      return false;
    }
   return true;
  };

  handleEmail  ( value)  {
    var emailformat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!(value && value.match(emailformat))) {
      return false;
    }
    return true;
  } 
  
  handlePhone  ( value)  {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!(value && value.match(phoneno))) {
      return false;
    }
    return true;
  }

  render() {

const  RenderItem = () => {
      
    return(
      <div>
     <ul>
      
  {this.state.messages.map((msg, index) => 
      <li key={index}>{msg}</li>,          
      )}
      </ul> 
      </div>
    ) 
  };
  
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

   

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "1"
    })(
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
      </Select>
    );

    return (
     
        <Layout>
        <div style={{color: "red"}}>
        <RenderItem /> 
        </div>
        <Header style={{ backgroundColor:  "gray" }}> 
        <h1 style={{color: "white" , textAlign: "center"}}> Registration Form </h1>
       
        
        </Header>
        
        <Content>
        
      <Form  className = {'regForm'} >
      
        <FormItem {...formItemLayout} label="First Name" >
          {getFieldDecorator("fname", {
            //rules: [{ required: true, message: "First Name is required!" }]
          })(<Input  style={{ width: "50%" }}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="Last Name">
          {getFieldDecorator("lname", {
            //rules: [{ required: true, message: "Last Name is required!" }]
          })(<Input style={{ width: "50%" }}/>)}
        </FormItem>

        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
           // rules: [{required: true, message: "E-mail is required!"}]
          })(<Input style={{ width: "50%" }}/>)}
        </FormItem>

        <FormItem {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phone", {
           // rules: [{ required: true, message: "Phone number is required!" }]
          })(<Input addonBefore={prefixSelector} style={{ width: "50%" }}  />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Birthdate ('YYYY-MM-DD')">
          {getFieldDecorator("birthdate", {
            //rules: [{required: true}]//, message: "Please input your correct Birthdate!"}]
          })(<DatePicker  />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" id="submitButton" onClick= {this.handleSubmit}> 
            Register
          </Button>
          <div>
          <label style = {{color:"white", backgroundColor: "red", textAlign: "center"}}>
         <strong> {this.state.alertMsg} </strong>
          </label>
          </div>
        </FormItem>
       
      </Form>
      
      </Content>
      
      <Footer></Footer>
      </Layout>
    );
  }
}

const MyForm = Form.create()(RegisterForm);
export {MyForm};
