jest.mock("../request");
import React from "react";
import WrappedRegistrationForm from "../../App";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("should verify the phone format", () => {
  const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const phoneValue = "971713533";

  const mockCallback = jest.fn(x => 42 + x);
  const mockhandlePhone = jest.fn();
  const myCallback = new Function();
  const wrapper = shallow(
    <WrappedRegistrationForm handlePhone={mockhandlePhone} />
  );
  wrapper
    .find("phone")
    .simulate("change", {
      rule: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      value: phoneValue,
      callback: myCallback
    });
  expect(mockhandlePhone).toHaveBeenCalledWith("Wrong format！");
});

describe("stringMatching in stringContaining", () => {
  const expected = [
    expect.stringMatching(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    )
  ];
  it("matches even if received contains additional elements", () => {
    expect(["a@g.com"]).toEqual(expect.arrayContaining(expected));
  });
});
describe("stringMatching in stringContaining", () => {
  const expected = [
    expect.stringMatching(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
  ];
  it("matches even if received contains additional elements", () => {
    expect(["9717135337"]).toEqual(expect.arrayContaining(expected));
  });
});
