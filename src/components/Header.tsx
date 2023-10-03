import React, { useState } from 'react'
import { Navbar, Nav, Icon, Drawer, Badge, Dropdown } from 'rsuite'
import { NavLink, useLocation } from 'react-router-dom'
import BuilderBody from './Builder/BuilderBody/BuilderBody'
import { FLAGS } from 'flags'
import { LOCALE_MAP } from './locale.map'
import { useDispatch, useSelector } from 'react-redux'
import { setLocaleAction, toggleBuilderAction } from 'redux/actions'
import { ReduxState } from './shared'
import waveHello from './wave_hello.gif'

const { Body } = Navbar
const { Item } = Nav
type LocalesType = keyof typeof LOCALE_MAP

const HeaderComp = () => {
  const { pathname } = useLocation()
  const [locale, setLocale] = useState<LocalesType>('en')
  const dispatch = useDispatch()
  const isOpen: boolean = useSelector(
    (state: ReduxState) => state.builder.isOpen
  )

  const changeLocale = (newLocale: LocalesType) => {
    // feels nasty to do this in redux and the locale state
    setLocale(newLocale)
    dispatch(setLocaleAction(newLocale))
  }

  const toggleShow = () => {
    dispatch(toggleBuilderAction())
  }

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
                <span
                  className="rs-nav-item-content"
                  style={{ fontSize: '1rem' }}
                >
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
              renderItem={() => {
                return (
                  <span
                    className="rs-nav-item-content"
                    style={{ fontSize: '1rem' }}
                  >
                    <Icon icon="magic2" />
                    Generate
                    {pathname === '/' && (
                      <img
                        width={20}
                        height={20}
                        alt="Wave hello"
                        src={waveHello}
                        style={{ marginLeft: 10 }}
                      />
                    )}
                  </span>
                )
              }}
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
          <Dropdown
            title={LOCALE_MAP[locale]}
            activeKey={locale}
            onSelect={changeLocale}
          >
            <Dropdown.Item eventKey="en">English</Dropdown.Item>
            <Dropdown.Item eventKey="de">German</Dropdown.Item>
            <Dropdown.Item eventKey="ar">Arabic</Dropdown.Item>
            <Dropdown.Item eventKey="cz">Czech</Dropdown.Item>
            <Dropdown.Item eventKey="es">Spanish</Dropdown.Item>
            <Dropdown.Item eventKey="fr">French</Dropdown.Item>
            <Dropdown.Item eventKey="ko">Korean</Dropdown.Item>
            <Dropdown.Item eventKey="sv">Swedish</Dropdown.Item>
            <Dropdown.Item eventKey="zh_CN">Chinese</Dropdown.Item>
          </Dropdown>
          <Item onClick={toggleShow} icon={<Icon icon="creative" />}>
            Builder <Badge content="NEW!"></Badge>
          </Item>
          <Drawer
            backdrop={false}
            show={isOpen}
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
