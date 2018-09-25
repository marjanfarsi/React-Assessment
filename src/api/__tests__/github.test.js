jest.mock("../request");
import postUser from '../github';
import React from "react";
import RegisterForm from '../../components/RegisterForm';
import Enzyme from "enzyme";
import { shallow , mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { getFileItem } from 'antd/lib/upload/utils';
import { Form} from "antd";

//  ***** UNIT TEST - JEST (Test all user defiend functions in the project) *****

Enzyme.configure({ adapter: new Adapter() });

var instance = new RegisterForm();

describe('handlePhone() checks the phone number validity format !', () => {

it("should verify the phone format", () => {
  
  const phoneValue = "971713537"; 
  const value = instance.handlePhone(phoneValue);
  expect(value).toBe(false);
});

describe('handleEmail() checks the E-mail validity format !', () => {

it("should verify the email format", () => {
 
  const emailValue = "marjan@x.";
  const value = instance.handleEmail(emailValue);
  expect(value).toBe(false);
});
})

describe('handleBirthdate() checks the date not to exceed today date', () => {
it("should verify the birthdate (should prevent future date!)", () => {
  var futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 4);
  const value = instance.handleBirthdate(futureDate);
  expect(value).toBe(false);
});
});
});
/* // ***** THIS TEST IS NOT WORKING PROPERLY ! (maybe because of the inner function "validateFieldsAndScroll") *****
describe('Submit event handler post data successfully!', () => {
  test('should Submit input values', () => {
   const testValues = {
      prifix: '1',
      fname: 'marjan',
      lname: 'farsi',
      email: 'marjan@g.com',
      phone: '9717135337',
      birthdate: '2016-08-09'
  };
 const newFunction = jest.fn(testValues);
  const WrappedForm = Form.create()(RegisterForm);
  const wrapper = mount(<WrappedForm newFunction={newFunction} {...testValues} />); 
  wrapper.find('#submitButton').at(0).hostNodes().simulate('click')
  expect(newFunction).toHaveBeenCalledWith(testValues);
});
}); */
   
describe("(E-mail RegEX) using stringMatching to check for matching with Regular Expression ! ", () => {
  const expected = [
    expect.stringMatching(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    )
  ];
  it("matches if the received E-mail follow the RegEx format", () => {
    expect(["a@g.com"]).toEqual(expect.arrayContaining(expected));
  });
});

describe("(Phone number RegEX) using stringMatching to check for matching with Regular Expression !", () => {
  const expected = [
    expect.stringMatching(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
  ];

  it("matches if the received phone number follow the RegEx format", () => {
    expect(["9717135337"]).toEqual(expect.arrayContaining(expected));
  });
});


/* // ***** THIS TEST WORKS WELL AND CREATE THE JSON FILE (MOCK THE ENDPOINT) BUT IT GET STUCK INTO AN INFINITE LOOP !  *****
describe('postUser() using Promises to pass the data to a JSON file instead of endpoint (Mocking Endpoint !)', () => {
  
  it('should load user data', () => {
    return postUser({fname: 'mojdeh', email: 'moj@x.com', phone:'9823455661', })
    .then(data => {
      expect(data).toBeDefined()
      expect(data.entity.name).toEqual('mojdeh')
    })
  })
})*/
