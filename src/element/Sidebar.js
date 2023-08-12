import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../logo.svg';
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar() {
  const [user, setUser] = useState({});
  const [level, setLevel] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('http://127.0.0.1:8000/api/user');
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
    fetchData();
    if (user.level === 1) {
      setLevel("Admin");
    } else {
      setLevel("User");
    }

  }, []);

  const logoutHandler = async () => {
    if (!history) {
      console.error("History object is undefined.");
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post('http://127.0.0.1:8000/api/logout');
      localStorage.removeItem("token");
      history.push('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  const logout = () => {
    if (!history) {
      console.error("History object is undefined.");
      return;
    }
    history.push('/');
  }


  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link href="../../index3.html" className="brand-link">
        <img
          src={logo}
          className="brand-image img-circle elevation-3"
          alt="AdminLTE Logo"
        />
        {/* <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style="opacity: .8"> */}
        <span className="brand-text font-weight-light">{level}</span>
      </Link>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar user (optional) --> */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={logo}
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <Link to={""} className="d-block">
              {user.name}
            </Link>
          </div>
        </div>

        {/* <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div> */}

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link href="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard {user.level}
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </Link>
            </li>
            {(() => {
              if (user.level === 1) {
                return (
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="nav-icon fas fa-users"></i>
                      <p>
                        Data User
                        {/* <i className="right fas fa-angle-left"></i> */}
                      </p>
                    </Link>
                  </li>
                )}})()}
            <li className="nav-item">
              <Link href="#" className="nav-link">
                <i className="nav-icon fas fa-briefcase"></i>
                <p>
                  Helpdesk
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <a onClick={logoutHandler} className="nav-link">
                <i className="nav-icon fas fa-lock"></i>
                <p>
                  Logout
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </a>
            </li>

            {/* <li className="nav-item">
                <Link href="#" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v1</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v2</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v3</p>
                    </Link>
                  </li>
                </ul>
              </li> */}
            {/* <li className="nav-item">
                <Link href="#" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Widgets
                    <span className="right badge badge-danger">New</span>
                  </p>
                </Link>
              </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
