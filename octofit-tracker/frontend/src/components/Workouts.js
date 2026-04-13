import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
const endpoint = `${baseUrl}/api/workouts/`;

function Workouts() {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		console.log('Fetching workouts from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setWorkouts(results);
				console.log('Fetched workouts:', results);
			});
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Workouts</h2>
				<div className="table-responsive">
					<table className="table table-striped table-bordered">
						<thead className="thead-dark">
							<tr>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{workouts.map((w, i) => (
								<tr key={i}>
									<td>{w.name}</td>
									<td>{w.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Workouts;
