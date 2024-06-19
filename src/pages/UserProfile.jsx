import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchId = async() => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await res.json();
        setUser([...data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchId();

    const fetchAlbums = async() => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`);
        const data = await res.json();
        setAlbums([...data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbums();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile of {user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Back to User List</Link>
    </div>
  );
};

export default UserProfile;