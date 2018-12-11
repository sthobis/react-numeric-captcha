import { mount } from "enzyme";
import React from "react";
import Captcha from "./captcha";

test("render properly", () => {
  const wrapper = mount(<Captcha onChange={() => {}} />);

  expect(wrapper.find(`[data-testid="captcha-canvas"]`)).toBeTruthy();
  expect(wrapper.find(`[data-testid="captcha-refresh"]`)).toBeTruthy();
  expect(wrapper.find(`[data-testid="captcha-audio"]`)).toBeTruthy();
  expect(wrapper.find(`[data-testid="captcha-input"]`)).toBeTruthy();
});

test("refresh captcha", () => {
  const wrapper = mount(<Captcha onChange={() => {}} />);

  const initialSolution = wrapper.state().solution;
  wrapper
    .find(`[data-testid="captcha-input"]`)
    .simulate("change", { target: { value: "111111" } });
  wrapper.find(`[data-testid="captcha-refresh"]`).simulate("click");
  const finalSolution = wrapper.state().solution;
  expect(initialSolution === finalSolution).toBeFalsy();
  expect(wrapper.find(`[data-testid="captcha-input"]`).props().value).toBe("");
});

test("play audio", () => {
  const wrapper = mount(<Captcha onChange={() => {}} />);

  window.SpeechSynthesisUtterance = jest.fn();
  window.speechSynthesis = {
    speak: jest.fn()
  };
  wrapper.find(`[data-testid="captcha-audio"]`).simulate("click");
  expect(window.SpeechSynthesisUtterance).toHaveBeenCalledTimes(1);
  expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
});

test("challenge captcha", () => {
  const handleChange = jest.fn();
  const wrapper = mount(<Captcha onChange={handleChange} />);

  const solution = 123456;
  wrapper.setState({ solution });
  wrapper
    .find(`[data-testid="captcha-input"]`)
    .simulate("change", { target: { value: "111111" } });
  expect(handleChange).toHaveBeenCalledWith(false);
  wrapper
    .find(`[data-testid="captcha-input"]`)
    .simulate("change", { target: { value: solution.toString() } });
  expect(handleChange).toHaveBeenCalledWith(true);
  expect(handleChange).toHaveBeenCalledTimes(2);
});

test("use custom placeholder", () => {
  const placeholder = "Placeholder";
  const wrapper = mount(
    <Captcha onChange={() => {}} placeholder={placeholder} />
  );

  expect(
    wrapper.find(`[data-testid="captcha-input"]`).props().placeholder
  ).toBe(placeholder);
});
