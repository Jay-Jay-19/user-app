import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserTable = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers([...data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Website</th>
          <th>Company</th>
          <th>Nb Todos</th>
          <th>Nb Albums</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <Link to={`/user/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.email}</td>
            <td>
              <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </td>
            <td>{user.company.name}</td>
            <td>{/* Nombre de Todos */}</td>
            <td>{/* Nombre d'albums */}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;