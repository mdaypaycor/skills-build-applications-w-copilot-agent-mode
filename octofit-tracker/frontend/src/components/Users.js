import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

const endpoint = getApiEndpoint('/api/users/');

function Users() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchUsers = async () => {
			try {
				const res = await fetch(endpoint);
				if (!res.ok) {
					throw new Error(`Request failed with status ${res.status}`);
				}

				const data = await res.json();
				const results = data.results || data;
				if (isMounted) {
					setUsers(results);
					setError('');
				}
			} catch (err) {
				if (isMounted) {
					setUsers([]);
					setError(err.message || 'Unable to load users.');
				}
			}
		};

		fetchUsers();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Users</h2>
				{error && <div className="alert alert-warning">{error}</div>}
				<div className="table-responsive">
					<table className="table table-striped table-bordered">
						<thead className="thead-dark">
							<tr>
								<th>Username</th>
								<th>Email</th>
								<th>First Name</th>
								<th>Last Name</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u, i) => (
								<tr key={i}>
									<td>{u.username}</td>
									<td>{u.email}</td>
									<td>{u.first_name}</td>
									<td>{u.last_name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Users;
