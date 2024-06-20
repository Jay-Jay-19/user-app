import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [todosCount, setTodosCount] = useState({});
  const [albumsCount, setAlbumsCount] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      for (const user of users) {
        try {
          const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
          const todosData = await todosResponse.json();
          setTodosCount(prevState => ({ ...prevState, [user.id]: todosData.length }));

          const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`);
          const albumsData = await albumsResponse.json();
          setAlbumsCount(prevState => ({ ...prevState, [user.id]: albumsData.length }));
        } catch (error) {
          console.error(error);
        }
      }
    };
      fetchUserDetails();
  }, [users]);

  return (
    <div className='user-table'>
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
              <td>{todosCount[user.id] || 'Loading...'}</td>
              <td>{albumsCount[user.id] || 'Loading...'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;