import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, Redirect } from 'react-router-dom';
import {Menu, Icon} from 'antd'
import {useDispatch} from 'react-redux'

function Nav() {
  const dispatch = useDispatch()
  const [isLogged, setIsLogged] = useState(true);
  useEffect(()=>{
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(!user){
      setIsLogged(false)
    }
  }, [])

  const logOut = () =>{
    window.localStorage.removeItem('user')
    dispatch({type: "removeUser"})
  }

  if(!isLogged){
    return <Redirect to="/" />
  }else{
    return (
      <nav >
        <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

          <Menu.Item key="mail">
            <Link to="/sources">
              <Icon type="home" />
              Sources
            </Link>
          </Menu.Item>

          <Menu.Item key="test">
            <Link to="/articles">
              <Icon type="read" />
              My Articles
            </Link>
          </Menu.Item>

          <Menu.Item key="app">
            <Link to="/" onClick={logOut}>
              <Icon type="logout" />
              Logout
            </Link>
          </Menu.Item>

        </Menu>
      </nav>
    );
  }
}

export default Nav;
