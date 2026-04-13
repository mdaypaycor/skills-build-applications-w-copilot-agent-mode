import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://localhost:8000';
const endpoint = `${baseUrl}/api/users/`;

function Users() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		console.log('Fetching users from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setUsers(results);
				console.log('Fetched users:', results);
			});
	}, []);

	return (
		<div className="card mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4">Users</h2>
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
