import React from "react";
import { shallow, mount } from "enzyme";
import MainNav from "../components/navigation/MainNav";
import MenuDrawer from "../components/navigation/MenuDrawer";
import { findByTestId } from "./testUtils";
import { createShallow, createMount } from "@material-ui/core/test-utils";

import { MemoryRouter } from "react-router";
// import { createShallow } from "@material-ui/core/test-utils";

describe("MainNav", () => {
  /**
   * Factory function to create ShallowWrapper for App component.
   * @function setup
   * @param {object} props - component props specific to this setup.
   * @param {object} children - children to render within component.
   * @param {function} func - function alternative to Enzyme.shallow to create wrapper.
   * @returns {ShallowWrapper}
   */
  const setup = (props = {}, children) => {
    return shallow(<MainNav {...props}>{children}</MainNav>);
  };

  it("renders without error", () => {
    const wrapper = setup();
  });

  it("has transparent background if prop option[`transparent`] is true", () => {
    const wrapper = setup({ options: { transparent: true } });
    let transparentItem = wrapper.find(
      '[className^="makeStyles-transparentNav"]'
    );
    // find better implementation - can't access comp's useStyles to get classes
    expect(transparentItem).toHaveLength(1);
  });

  it("doesn't have transparent background if prop option[`transparent`] is false", () => {
    const wrapper = setup({ options: { transparent: false } });
    let transparentItem = wrapper.find(
      '[className^="makeStyles-transparentNav"]'
    );
    // find better implementation - can't access comp's useStyles to get classes
    expect(transparentItem).toHaveLength(0);
  });

  it("renders child component in Nav", () => {
    const testText = "TEST TEXT HERE";
    const testId = "testChild";
    const wrapper = setup(null, <span id={testId}>{testText}</span>);
    const NavToolbar = findByTestId(wrapper, "main-nav-toolbar");
    expect(NavToolbar.childAt(1).text()).toEqual(testText);
  });
});

describe("MenuDrawer", () => {
  /**
   * Factory function to create MenuDrawer wrapped in MainNav and MemoryRouter (for withRouter()).
   * @function setup
   * @param {object} props - component props specific to this setup.
   * @param {object} children - children to render within component.
   * @returns {MountWrapper}
   */
  const setup = (props = {}, children) => {
    mount(
      <MemoryRouter>
        <MainNav>
          <MenuDrawer isAuthenticated={true} />
        </MainNav>
      </MemoryRouter>
    );
  };

  it("opens drawer when burger menu icon is clicked", () => {
    const wrapper = mount(
      <MemoryRouter>
        <MainNav>
          <MenuDrawer isAuthenticated={true} />
        </MainNav>
      </MemoryRouter>
    );

    const toggleButton = wrapper.find(`[role='toggle-menu-drawer']`).at(0);
    expect(findByTestId(wrapper, "component-drawer-list")).toHaveLength(0);
    toggleButton.simulate("click");
    expect(findByTestId(wrapper, "component-drawer-list")).toHaveLength(1);
  });
});
