import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
const endpoint = `${baseUrl}/api/teams/`;

function Teams() {
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		console.log('Fetching teams from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setTeams(results);
				console.log('Fetched teams:', results);
			});
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Teams</h2>
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
