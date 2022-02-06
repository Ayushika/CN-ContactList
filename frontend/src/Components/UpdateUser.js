/** @format */

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
const { Group, Control } = Form;

const UpdateUser = ({ history }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const updateUser = async () => {
    const res = await axios.post(`http://localhost:5000/api/user/updateuser`, {
      name,
      number,
      email,
      id,
    });

    history.push("/");
  };

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/api/user/getuser/${id}`);
    const { name, email, number } = res.data;
    setName(name);
    setEmail(email);
    setNumber(number);
  }, [id]);

  return (
    <div className='container'>
      <h2 className='mt-5'>Update User</h2>
      <Form className='mt-5'>
        <Group className='mb-3'>
          <Control
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Group>
        <Group className='mb-3'>
          <Control
            type='text'
            placeholder='Phone'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </Group>
        <Group className='mb-3'>
          <Control
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Group>

        <Button variant='success' onClick={() => updateUser()}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
