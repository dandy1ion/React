import React from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

//Stateless Component when done without practice notes
function ExpenseItem(props) {
	//const [title, setTitle] = useState(props.title);
	//console.log("ExpenseItem evaluated by React."); //see instances

	//function clickHandler() {};
	//const clickHandler = () => {
	//	setTitle("Updated!");
	//	console.log(title); //new value not available yet
	//};
	//put inside <Card></Card>
	//<button onClick={clickHandler}>Change Title</button>

	return (
		<li>
			<Card className="expense-item">
				<ExpenseDate date={props.date} />
				<div className="expense-item__description">
					<h2>{props.title}</h2>
					<div className="expense-item__price">${props.amount}</div>
				</div>
			</Card>
		</li>
	);
}

export default ExpenseItem;
