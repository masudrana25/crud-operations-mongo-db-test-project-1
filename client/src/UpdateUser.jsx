import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const {id} = useParams();
  const [name, setName] = useState();
const [email, setEmail] = useState();
const [age, setAge] = useState();
const navigate = useNavigate();

   useEffect(async () => {
     const data = await axios.get('http://localhost:3300/getUser/'+id);
     await setName(data.data.name);
     await setEmail(data.data.email);
     await setAge(data.data.age);
     console.log(data);
   }, []);
  
    const handleSubmit = e => {
      e.preventDefault();
      axios
        .put('http://localhost:3300/updateUser/'+id, { name, email, age })
        .then(result => {
          console.log(result);
          navigate('/');
        })
        .catch(err => console.log(err));
    };
  
  return (
    <div>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Update User</h2>
            <div className="mb-2">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                name={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                name={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="">Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                className="form-control"
                name={age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <button className="btn btn-success">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;