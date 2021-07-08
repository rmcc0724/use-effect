import React, { useState, useEffect, useReducer } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const emailReducer  = (state, action) => {
  if (action.type === 'USER_INPUT') {
    console.log(action.val + ' ' + action.val.includes('@'));
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    console.log(state.value + ' ' + state.value.includes('@'));
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer  = (state, action) => {
  if (action.type === 'USER_INPUT') {
    console.log(`${action.val} ${action.val.trim().length > 6}`);
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    console.log(state.value + 'test' + state.value.trim().length > 6);
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  useEffect(() => {
    console.log('Effect Running')

    return () => {
      console.log('Effect CleanUp')
    }
  }, [])

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Checkig for validity.");
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6,
  //     )
  //   }, 5000)
  //   return () => {
  //     console.log("CLEANUP");
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    )
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.value.includes('@'),
    )
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR'});
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR'});
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
