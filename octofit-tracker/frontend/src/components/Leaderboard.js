import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
const endpoint = `${baseUrl}/api/leaderboard/`;

function Leaderboard() {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		console.log('Fetching leaderboard from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setEntries(results);
				console.log('Fetched leaderboard:', results);
			});
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Leaderboard</h2>
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
