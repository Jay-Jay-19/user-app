import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AlbumDetails.css'

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumRes = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        const albumData = await albumRes.json();
        setAlbum(albumData);
        setUserId(albumData.userId);

        const photosRes = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
        const photosData = await photosRes.json();
        setPhotos(photosData);
      } catch (error) {
        console.error("Failed to fetch album or photos", error);
      }
      setLoading(false);
    };

    fetchAlbum();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div className="album-container">
      <h1 className="album-title">{album.title}</h1>
        <div className="photos-mosaic">
          {photos.map(photo => (
            <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} className="photo-thumbnail" />
          ))}
        </div>
      {userId && <Link to={`/user/${userId}`} className="back-link">Back to User Profile</Link>}
    </div>
  );
};

export default AlbumDetails;