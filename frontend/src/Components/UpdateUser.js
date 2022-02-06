/** @format */

import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
const { Group, Control } = Form;

const UpdateUser = ({ history }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { id } = useParams();
  const updateUser = async () => {
    const res = await axios.post(`http://localhost:5000/api/user/updateuser`, {
      name,
      number,
      email,
      id,
    });

    if (res.data.message) {
      setMessage(res.data.message);
    } else history.push("/");
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
      <h2 className='mt-5'>Update Contact</h2>
      <Form className='mt-5'>
        {message && <Alert variant='danger'>{message}</Alert>}
        <Group className='mb-3'>
          <Control
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setMessage("");
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

        <Button variant='success' onClick={() => updateUser()}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
