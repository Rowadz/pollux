import React from 'react'
import { Navbar, Nav, Icon } from 'rsuite'
import { NavLink } from 'react-router-dom'
const { Body } = Navbar
const { Item } = Nav

function HeaderComp() {
  return (
    <Navbar>
      <Body>
        <Nav>
          <NavLink to="/pollux" activeClassName="active-route" exact={true}>
            <Item
              renderItem={() => (
                <span className="rs-nav-item-content">
                  <Icon icon="home" /> Pollux
                </span>
              )}
            ></Item>
          </NavLink>
          <NavLink to="/pollux/generate" activeClassName="active-route">
            <Item
              renderItem={() => (
                <span className="rs-nav-item-content">
                  <Icon icon="magic2" />
                  Generate
                </span>
              )}
            >
              About
            </Item>
          </NavLink>
        </Nav>
        {/* <Nav pullRight>
          <Item icon={<Icon icon="cog" />}>Settings</Item>
        </Nav> */}
      </Body>
    </Navbar>
  )
}

export default HeaderComp
