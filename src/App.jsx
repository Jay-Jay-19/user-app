import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserProfile from './pages/UserProfile';
import AlbumDetails from './pages/AlbumDetails';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
      </Routes>
    </Router>
  )
}