import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

const App = () => {
	useEffect(() => {
		const getAPI = async () => {
			const response = await fetch('http://localhost:8080/');
			const data = await response.json();

			try {
				console.log(data);
				setLoading(false);
				setShare(data);
			} catch (error) {
				console.log(error);
			}
		};
		getAPI();
	}, []);

	const [share, setShare] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<Fragment>
			<header>
				<h1>KITEPROJECT: React Front End</h1>
				<a href="http://localhost:8080">View All Share</a>
				/*<a href="http://localhost:8080/add-share">Add New Share &#x27A2;</a>*/
			</header>

			<div className="container">
				{loading ? (
					<div>
						<p>No data to load</p>
					</div>
				) : (
					<div>
						{share.map((data) => (
							<div key={data._id}>
								<main>
									<ul className="share">
										<li>
											<h1>{data.symbol}</h1>
										</li>
										<li>
											<h1>{data.open}</h1>
										</li>
										<li>
											<h1>{data.high}</h1>
										</li>
										<li>
											<h1>{data.low}</h1>
										</li>

										<li>
											<a href={data._id}>View Share &#x21DB;</a>
										</li>
									</ul>
								</main>
							</div>
						))}
					</div>
				)}
			</div>
			{/* <div>
				<h1>Add New Share</h1>
				<form method="POST" action="http://localhost:8080/add-share">
					<div>
						<label>Name</label>
						<input type="text" name="name" required />
					</div>
					<div>
						<label>Image</label>
						<input type="text" name="image" required />
					</div>
					<div>
						<label>Description</label>
						<input type="text" name="description" required />
					</div>

					<div>
						<button type="submit">Add Share</button>
					</div>
				</form>
			</div> */}
		</Fragment>
	);
};

export default App;
