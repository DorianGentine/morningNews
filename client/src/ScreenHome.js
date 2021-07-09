import React, {useState, useEffect} from 'react';
import './App.css';
import {Input,Button,Alert} from 'antd';
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

function ScreenHome() {
  const dispatch = useDispatch()
  const [isLogged, setIsLogged] = useState(false)
  useEffect(()=>{
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
      dispatch({
        type: "saveUser",
        user: user
      })
      setIsLogged(true)
    }
  }, [dispatch])

  const [signUpFirstname, setSignUpFirstname] = useState('')
  const [signUpLastname, setSignUpLastname] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpError, setSignUpError] = useState('')

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signInError, setSignInError] = useState('')

  const onClose = (e) => {
    setSignInError('')
    setSignUpError('')
  };

  const handleSubmitSignIn = async () => {
    if(signInEmail==='' || signInPassword===''){
      setSignInError('Merci de renseigner tous les champs')
    }else{
      const request = await fetch('/users/sign-in', {
        method: "POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `email=${signInEmail}&password=${signInPassword}`
      })
      const response = await request.json()
      if(response.result){
        dispatch({
          type: "saveUser",
          user: response.user
        })
        window.localStorage.setItem('user', JSON.stringify(response.user))
        setIsLogged(true)
      }else{
        setSignInError(response.error)
      }
    }
  }

  const handleSubmitSignUp = async () => {
    if(signUpFirstname==='' || signUpLastname==='' || signUpEmail==='' || signUpPassword===''){
      setSignUpError("Merci de renseigner tous les champs")
    }else{
      const request = await fetch('/users/sign-up', {
        method: "POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `firstname=${signUpFirstname}&lastname=${signUpLastname}&email=${signUpEmail}&password=${signUpPassword}`
      })
      const response = await request.json()
      if(response.result){
        dispatch({
          type: "saveUser",
          user: response.user
        })
        window.localStorage.setItem('user', JSON.stringify(response.user))
        setIsLogged(true)
      }else{
        setSignUpError(response.error)
      }
    }
  }

  if(isLogged){
    return <Redirect to='/sources' />
  }else{
    return (
      <div className="Login-page" >
  
            {/* SIGN-IN */}
            <div className="Sign">
              {signInError ? <Alert style={{marginTop: "10px", maxWidth: "250px"}} message={signInError} type="error" closable onClose={onClose} /> : null }
              <Input value={signInEmail} onChange={e=> setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />
              <Input.Password value={signInPassword} onChange={e=> setSignInPassword(e.target.value)} className="Login-input" placeholder="password" />
              <Button onClick={handleSubmitSignIn} style={{width:'80px'}} type="primary">Sign-in</Button>
            </div>
  
            {/* SIGN-UP */}
            <div className="Sign">
              {signUpError ? <Alert style={{marginTop: "10px", maxWidth: "250px"}} message={signUpError} type="error" closable onClose={onClose} /> : null }
              <Input value={signUpFirstname} onChange={e => setSignUpFirstname(e.target.value)} className="Login-input" placeholder="Prénom" />
              <Input value={signUpLastname} onChange={e => setSignUpLastname(e.target.value)} className="Login-input" placeholder="Nom" />
              <Input value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} className="Login-input" placeholder="Email" />
              <Input.Password value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} className="Login-input" placeholder="Password" />
              <Button onClick={handleSubmitSignUp} style={{width:'80px'}} type="primary">Sign-up</Button>
            </div>
  
        </div>
    );
  }

}

export default ScreenHome;
