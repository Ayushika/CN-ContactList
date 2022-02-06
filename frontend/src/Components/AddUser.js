/** @format */

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const { Group, Control } = Form;

const AddUser = ({ history }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {
    const res = await axios.post("http://localhost:5000/api/user/adduser", {
      name,
      number,
      email,
    });

    if (res.data) {
      history.push("/");
    }
  };

  return (
    <div className='container'>
      <h2 className='mt-5'>Add User</h2>
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

        <Button variant='success' onClick={() => addUser()}>
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
