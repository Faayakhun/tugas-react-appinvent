import { Form } from 'react-bootstrap'
import axios from 'axios'
import React, {useState,} from 'react'
import { useHistory } from 'react-router-dom'


export default function Login(props) {
    const history = useHistory()
    const toInventory = () => history.push('/inventory')
    const divStyle = {
        position: "fixed",
        top: "55%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "3px solid #f1f1f1",
    }
    const [state , setState] = useState({
        email : "",
        password : "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        axios.get("https://603cd864f4333a0017b68722.mockapi.io/user")
        .then ((result) => {
            console.log(result)
            const dataUser= result.data
            console.log(dataUser)
            const user = dataUser.filter((user)=>user.email === state.email).map((user, index) => {
                if (user.password === state.password) {
                    let {password,...restUser} = user
                    localStorage.setItem("user", JSON.stringify(restUser))
                    localStorage.setItem("isLoggedIn", true)
                    props.setIsLogin(true)
                    alert("Login success")
                    alert("Redirect you to inventory page")
                    toInventory()
                } else {
                    alert("Check your username or password")
                }
            })
        })
        
    }
        
    return (
        <div>
            <div style={divStyle} className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h1>LOGIN FORM</h1>
            <Form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange} 
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Login</button>
            </Form>
        </div>
        </div>
    )
}


