import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
const endpoint = `${baseUrl}/api/activities/`;

function Activities() {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		console.log('Fetching activities from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setActivities(results);
				console.log('Fetched activities:', results);
			});
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Activities</h2>
				<div className="table-responsive">
					<table className="table table-striped table-bordered">
						<thead className="thead-dark">
							<tr>
								<th>User</th>
								<th>Activity Type</th>
								<th>Duration (min)</th>
								<th>Team</th>
							</tr>
						</thead>
						<tbody>
							{activities.map((a, i) => (
								<tr key={i}>
									<td>{a.user}</td>
									<td>{a.activity_type}</td>
									<td>{a.duration}</td>
									<td>{a.team}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Activities;
