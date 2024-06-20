import UserTable from '../components/UserTable.jsx';
import './UserList.css'

const UserList = () => {
  return (
    <div className='container'>
      <h1>User List</h1>
        <UserTable />
    </div>
  );
};

export default UserList;
