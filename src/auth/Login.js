import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);

    // routing
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
        }
    }, []);

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        await axios.post('http://127.0.0.1:8000/api/login', formData).then((res) => {
            localStorage.setItem('token', res.data.token);
            history.push('/dashboard');
        }).catch((err) => {
            setValidation(err.response.data);
        })
    }

    const navToRegister = () => {
        history.push('/register');
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <Link to={""} className="h1"><b>Sistem</b>Helpdesk</Link>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        {
                            validation.message && (
                                <div classNameName="alert alert-info">
                                    {validation.message}
                                </div>
                            )
                        }
                        <form onSubmit={loginHandler}>
                            <div className="input-group mb-3">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-3">Sign In</button>
                        </form>
                        <p>dont have account ?</p>
                        <button type="button" onClick={navToRegister} className="btn btn-info btn-block mb-3">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
