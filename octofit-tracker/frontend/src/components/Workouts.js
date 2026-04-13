import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const endpoint = getApiEndpoint('/api/workouts/');

function Workouts() {
	const [workouts, setWorkouts] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchWorkouts = async () => {
			try {
				const res = await fetch(endpoint);
				if (!res.ok) {
					throw new Error(`Request failed with status ${res.status}`);
				}

				const data = await res.json();
				const results = data.results || data;
				if (isMounted) {
					setWorkouts(results);
					setError('');
				}
			} catch (err) {
				if (isMounted) {
					setWorkouts([]);
					setError(err.message || 'Unable to load workouts.');
				}
			}
		};

		fetchWorkouts();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Workouts</h2>
				{error && <div className="alert alert-warning">{error}</div>}
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
