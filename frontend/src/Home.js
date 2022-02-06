/** @format */

import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const { Control, Group } = Form;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [ok, setOk] = useState("");

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const res = await axios.delete(
        `http://localhost:5000/api/user/deleteuser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: { id: id },
        },
      );
      setOk(res.data);
    }
  };

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/api/user/getallusers");
    setUsers(res.data);
  }, [ok]);

  return (
    <div className='container'>
      <Form className='mt-5 mb-5'>
        <Group className='mb-3'>
          <Control
            type='text'
            placeholder='Search Contact'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Group>
      </Form>
      <Table bordered hover>
        <thead>
          <tr className='text-center'>
            <th>S.no</th>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {search.length > 0
            ? users &&
              users.length > 0 &&
              users
                .filter((u) => u.name.toLowerCase().includes(search))
                .map((u, i) => {
                  return (
                    <tr className='text-center' key={i + 1}>
                      <td>{i + 1}</td>
                      <td>{u.name}</td>
                      <td>{u.number}</td>
                      <td>{u.email}</td>
                      <td>
                        <i
                          className='far fa-trash-alt text-danger'
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const id = u._id;
                            deleteUser(id);
                          }}></i>
                      </td>
                      <td>
                        <Link to={`/updateuser/${u._id}`}>
                          <i
                            className='far fa-edit text-warning'
                            style={{ cursor: "pointer" }}></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
            : users &&
              users.length > 0 &&
              users.map((u, i) => {
                return (
                  <tr className='text-center text-muted' key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.number}</td>
                    <td>{u.email}</td>
                    <td>
                      <i
                        className='far fa-trash-alt text-danger'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          const id = u._id;
                          deleteUser(id);
                        }}></i>
                    </td>
                    <td>
                      <Link to={`/updateuser/${u._id}`}>
                        <i
                          className='far fa-edit text-warning'
                          style={{ cursor: "pointer" }}></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
      <Link to='/adduser'>
        <Button variant='success' className='mt-3'>
          Add Contact
        </Button>
      </Link>
    </div>
  );
};

export default Home;
