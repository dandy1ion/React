import { Component } from "react";

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false };
	}

	//error boundary (add only to class based components)
	//life cycle method
	componentDidCatch(error) {
		console.log(error);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p>Something went wrong!</p>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
