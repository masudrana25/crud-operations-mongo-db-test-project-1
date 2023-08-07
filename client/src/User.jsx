import { useEffect, useState } from 'preact/hooks';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState();
  useEffect(async () => {
    const data = await axios.get('http://localhost:3300/');
    await setUsers(data.data);
  }, []);

  // handle delete
  const handleDelete = id => {
    axios
      .delete('http://localhost:3300/deleteUser/' + id)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
    location.reload(true);
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          {' '}
          Add User +
        </Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={e => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
