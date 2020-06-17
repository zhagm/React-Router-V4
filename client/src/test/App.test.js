import React from "react";
import { shallow } from "enzyme";
import App from "../containers/App";

/**
 * Factory function to create ShallowWrapper for App component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @param {object} state - Initial state of App.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};

test("renders without error", () => {
  const wrapper = setup();
});
