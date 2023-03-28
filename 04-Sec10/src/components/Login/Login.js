import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/input/Input";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: "", isValid: false };
};

//component function:
const Login = (props) => {
	//const [enteredEmail, setEnteredEmail] = useState("");
	//const [emailIsValid, setEmailIsValid] = useState();
	//const [enteredPassword, setEnteredPassword] = useState("");
	//const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	//useEffect(() => {
	//	console.log("EFFECT RUNNING");
	//	return () => {
	//		console.log("EFFECT CLEANUP");
	//	};
	//}, [enteredPassword]);
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	//with useReducer states:
	useEffect(() => {
		//console.log('Checking form validity!')//with each key stroke
		const identifier = setTimeout(() => {
			//console.log('Checking form validity!')
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			//console.log('CLEANUP');
			clearTimeout(identifier);
		}; //cleanup function
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		//setEnteredEmail(event.target.value);
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });

		//depending on two other states
		//setFormIsValid(event.target.value.includes("@") && enteredPassword.trim().length > 6);
		//useReducer:
		//setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
	};

	const passwordChangeHandler = (event) => {
		//setEnteredPassword(event.target.value);
		dispatchPassword({ type: "USER_INPUT", val: event.target.value });

		//depending on two other states:
		//setFormIsValid(enteredEmail.includes("@") && event.target.value.trim().length > 6);
		//useReducer:
		//setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	};

	const validateEmailHandler = () => {
		//depending on another state:
		//setEmailIsValid(enteredEmail.includes("@"));
		//useReducer:
		//setEmailIsValid(emailState.isValid);
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		//depending on another state
		//setPasswordIsValid(enteredPassword.trim().length > 6);
		//useReducer:
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
		authCtx.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id="email"
					label="E-Mail"
					type="email"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					id="password"
					label="Password"
					type="password"
					isValid={passwordIsValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
