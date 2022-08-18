import React, { Fragment, useEffect, useState } from "react";
import userService from "../services/userService";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  // const [id, setId] = useState(0);
  
  const loadData = () => {
    userService.getAll().then((res) => {
      setUsers(res);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="card border-primary bt-primary-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  User <small className="text-muted">list</small>
                </h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr className="table-primary text-center">
                    <th style={{ width: "50px" }}>#</th>
                    <th>User Name</th>
                    <th>Address Detail</th>
                    <th>District</th>
                    <th>City</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.addressDetail}</td>
                        <td style={{textAlign: "center"}}>{user.addressDistrict}</td>
                        <td style={{textAlign: "center"}}>{user.addressCity}</td>
                        <td style={{textAlign: "center"}}>{user.roles}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
