import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	//no longer need these as we get the values from Refs
	//const [enteredUsername, setEnteredUsername] = useState("");
	//const [enteredAge, setEnteredAge] = useState("");
	const [error, setError] = useState();

	const addUserHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredUserAge = ageInputRef.current.value;
		if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
			setError({
				title: "Invalid Input",
				message: "Please enter a valid name and age (non-empty values).",
			});
			return;
		}
		if (+enteredUserAge < 1) {
			setError({
				title: "Invalid Age",
				message: "Please enter a valid age (> 0).",
			});
			return;
		}
		//console.log(enteredUsername, enteredAge);
		props.onAddUser(enteredName, enteredUserAge);
		//setEnteredUsername("");
		//setEnteredAge("");
		nameInputRef.current.value = "";
		ageInputRef.current.value = "";
	};

	//const usernameChangeHandler = (event) => {
	//	setEnteredUsername(event.target.value);
	//};

	//const ageChangeHandler = (event) => {
	//	setEnteredAge(event.target.value);
	//};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<Wrapper>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" ref={nameInputRef} />
					<label htmlFor="age">Age (Years)</label>
					<input id="age" type="number" ref={ageInputRef} />
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default AddUser;
