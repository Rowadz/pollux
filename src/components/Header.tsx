import React from 'react'
import { useToggle } from 'react-use'
import { Navbar, Nav, Icon, Drawer, Badge } from 'rsuite'
import { NavLink } from 'react-router-dom'
import BuilderBody from './Builder/BuilderBody/BuilderBody'
import { FLAGS } from 'flags'

const { Body } = Navbar
const { Item } = Nav

const HeaderComp = () => {
  const [show, toggleShow] = useToggle(false)

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
          {FLAGS.FLOW_GENERATE && (
            <NavLink
              to="/flow-generate"
              className={(navData) => (navData.isActive ? 'active-route' : '')}
            >
              <Item
                renderItem={() => (
                  <span className="rs-nav-item-content">
                    <Icon icon="magic2" />
                    Flow Generate
                  </span>
                )}
              >
                About
              </Item>
            </NavLink>
          )}
        </Nav>
        <Nav pullRight>
          <Item onClick={toggleShow} icon={<Icon icon="creative" />}>
            Builder <Badge content="NEW!"></Badge>
          </Item>

          <Drawer
            backdrop={false}
            show={show}
            size="xs"
            placement="left"
            onHide={toggleShow}
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
