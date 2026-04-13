import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const endpoint = getApiEndpoint('/api/leaderboard/');

function Leaderboard() {
	const [entries, setEntries] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchLeaderboard = async () => {
			try {
				const res = await fetch(endpoint);
				if (!res.ok) {
					throw new Error(`Request failed with status ${res.status}`);
				}

				const data = await res.json();
				const results = data.results || data;
				if (isMounted) {
					setEntries(results);
					setError('');
				}
			} catch (err) {
				if (isMounted) {
					setEntries([]);
					setError(err.message || 'Unable to load leaderboard.');
				}
			}
		};

		fetchLeaderboard();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Leaderboard</h2>
				{error && <div className="alert alert-warning">{error}</div>}
				<div className="table-responsive">
					<table className="table table-striped table-bordered">
						<thead className="thead-dark">
							<tr>
								<th>Team</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{entries.map((e, i) => (
								<tr key={i}>
									<td>{e.team}</td>
									<td>{e.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Leaderboard;
