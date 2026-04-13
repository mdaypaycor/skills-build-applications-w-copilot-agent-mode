import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespace
	? `https://${codespace}-8000.app.github.dev/api/activities/`
	: 'http://localhost:8000/api/activities/';

function Activities() {
	const [activities, setActivities] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchActivities = async () => {
			try {
				const res = await fetch(endpoint);
				if (!res.ok) {
					throw new Error(`Request failed with status ${res.status}`);
				}

				const data = await res.json();
				const results = data.results || data;
				if (isMounted) {
					setActivities(results);
					setError('');
				}
			} catch (err) {
				if (isMounted) {
					setActivities([]);
					setError(err.message || 'Unable to load activities.');
				}
			}
		};

		fetchActivities();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Activities</h2>
				{error && <div className="alert alert-warning">{error}</div>}
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
