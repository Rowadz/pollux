import React from 'react'
import { useToggle } from 'react-use'
import { Navbar, Nav, Drawer, Badge } from 'rsuite'
import { ImMagicWand } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'
import { GiCubes } from 'react-icons/gi'
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
            <Item>
              <span className="rs-nav-item-content">
                <AiFillHome /> Pollux
              </span>
            </Item>
          </NavLink>
          <NavLink
            to="/generate"
            className={(navData) => (navData.isActive ? 'active-route' : '')}
          >
            <Item>
              <span className="rs-nav-item-content">
                <ImMagicWand />
                Generate
              </span>
            </Item>
          </NavLink>
          {FLAGS.FLOW_GENERATE && (
            <NavLink
              to="/flow-generate"
              className={(navData) => (navData.isActive ? 'active-route' : '')}
            >
              <Item>
                <span className="rs-nav-item-content">
                  <ImMagicWand />
                  Flow Generate
                </span>
              </Item>
            </NavLink>
          )}
        </Nav>
        <Nav pullRight>
          <Item onClick={toggleShow} icon={<GiCubes />}>
            Builder <Badge content="NEW!"></Badge>
          </Item>

          <Drawer
            backdrop={false}
            open={show}
            size="xs"
            placement="left"
            onClose={toggleShow}
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
