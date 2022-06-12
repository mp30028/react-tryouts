import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Invoice from "./routes/invoice";
import Page1 from "./routes/page-1";
import Page2 from "./routes/page-2";


const root = ReactDOM.createRoot(
	document.getElementById("root")
);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} >
				<Route path="expenses" element={<Expenses />} />
				<Route path="invoices" element={<Invoices />} >
					<Route path=":invoiceId" element={<Invoice />} />
					<Route
						index
						element={
							<main style={{ padding: "1rem" }}>
								<p>Select an invoice</p>
							</main>
						}
					/>

				</Route>
			</Route>
			<Route path="page-1" element={<Page1 />} />
			<Route path="page-2" element={<Page2 />} />

			<Route
				path="*"
				element={
					<main style={{ padding: "1rem" }}>
						<p>There's nothing here!</p>
					</main>
				}
			/>

		</Routes>
	</BrowserRouter>
);