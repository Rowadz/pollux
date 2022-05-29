import React, { useState, useCallback } from 'react'
import { Navbar, Nav, Icon, Drawer, Badge } from 'rsuite'
import { NavLink } from 'react-router-dom'
import BuilderBody from './Builder/BuilderBody/BuilderBody'
const { Body } = Navbar
const { Item } = Nav

function HeaderComp() {
  const [state, setState] = useState({ show: false })
  const toggleDrawer = useCallback(
    (show) => setState({ show: !show }),
    [setState]
  )
  return (
    <Navbar>
      <Body>
        <Nav>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? 'active-route' : '')}
          >
            <Item
              renderItem={() => (
                <span className="rs-nav-item-content">
                  <Icon icon="home" /> Pollux
                </span>
              )}
            ></Item>
          </NavLink>
          <NavLink
            to="/generate"
            className={(navData) => (navData.isActive ? 'active-route' : '')}
          >
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
        <Nav pullRight>
          <Item
            onClick={() => toggleDrawer(state.show)}
            icon={<Icon icon="creative" />}
          >
            Builder <Badge content="NEW!"></Badge>
          </Item>

          <Drawer
            backdrop={false}
            show={state.show}
            size="xs"
            placement="left"
            onHide={() => toggleDrawer(true)}
          >
            <Drawer.Header>
              <Drawer.Title>
                <h4>Builder Items</h4>
                <p>You can drag and drop them into any model</p>
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <BuilderBody />
            </Drawer.Body>
          </Drawer>
        </Nav>
      </Body>
    </Navbar>
  )
}

export default HeaderComp
