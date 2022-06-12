import { Link, Outlet } from "react-router-dom";

function App() {
	return (
		<div>
			<h1>Bookkeeper!</h1>
			<nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
				<Link to="/invoices">Invoices</Link> |{" "}
				<Link to="/expenses">Expenses</Link> |{" "}
				<Link to="/page-1">Page 1</Link> |{" "}
				<Link to="/page-2">Page 2</Link>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
