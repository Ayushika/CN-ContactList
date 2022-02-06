/** @format */

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
const { Group, Control } = Form;

const AddUser = ({ history }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const addUser = async () => {
    const res = await axios.post("http://localhost:5000/api/user/adduser", {
      name,
      number,
      email,
    });

    if (res.data.message) {
      setMessage(res.data.message);
    } else if (res.data) {
      history.push("/");
    }

    // <Alert variant='danger'>{error.message}</Alert>;
  };

  return (
    <div className='container'>
      <h2 className='mt-5'>Add Contact</h2>
      <Form className='mt-5'>
        {message && <Alert variant='danger'>{message}</Alert>}
        <Group className='mb-3 mt-3'>
          <Control
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => {
              setMessage("");
              setName(e.target.value);
            }}
          />
        </Group>
        <Group className='mb-3'>
          <Control
            type='text'
            placeholder='Phone'
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setMessage("");
            }}
          />
        </Group>
        <Group className='mb-3'>
          <Control
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
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
