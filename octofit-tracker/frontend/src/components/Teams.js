import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const endpoint = getApiEndpoint('/api/teams/');

function Teams() {
	const [teams, setTeams] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchTeams = async () => {
			try {
				const res = await fetch(endpoint);
				if (!res.ok) {
					throw new Error(`Request failed with status ${res.status}`);
				}

				const data = await res.json();
				const results = data.results || data;
				if (isMounted) {
					setTeams(results);
					setError('');
				}
			} catch (err) {
				if (isMounted) {
					setTeams([]);
					setError(err.message || 'Unable to load teams.');
				}
			}
		};

		fetchTeams();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Teams</h2>
				{error && <div className="alert alert-warning">{error}</div>}
				<div className="table-responsive">
					<table className="table table-striped table-bordered">
						<thead className="thead-dark">
							<tr>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{teams.map((t, i) => (
								<tr key={i}>
									<td>{t.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Teams;
