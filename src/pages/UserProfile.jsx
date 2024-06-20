import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const userData = await userRes.json();
        setUser(userData);

        const albumsRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`);
        const albumsData = await albumsRes.json();
        setAlbums(albumsData);
      } catch (error) {
        console.log('Failed to fetch user or albums', error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='container'>
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