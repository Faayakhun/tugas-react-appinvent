import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Register from './Register'

export default function Inventory() {
    const history = useHistory()
    const toRegister = () => history.push('/register')
    const isLogin = localStorage.getItem("isLoggedIn")
    
    const [product, setProduct] = useState([])
    const [input, setInput] = useState("")
    const [inputData,setInputData] = useState("")
    let localData = localStorage.getItem("user")
    let localDataUser = JSON.parse(localData)
      
    useEffect(() => {
      if (!localStorage.user) {
        toRegister()
        return (<Register />)
        alert("You have to register first")
      }
      axios.get(`https://603cd864f4333a0017b68722.mockapi.io/user/${localDataUser.id}/inventory`)
      .then(result => setProduct(result.data))
    }, [])
    if (!localStorage.user) {
      alert("You have to register first")
      toRegister()
      return (<Register />)
    }
    const handleChange = (e) => {
      setInput(e.target.value)
    }
    const handleChangeData = (e) => {
      setInputData(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      axios.post(`https://603cd864f4333a0017b68722.mockapi.io/user/${localDataUser.id}/inventory`, {name: input})
      .then(result => {
        console.log(result)
        setProduct([...product, result.data])
      })
      .catch(err => console.log(err))
  
      setInput("")
    }
  
    const handleDelete = (e, item) => {
      e.preventDefault()
      console.log(item);
  
      axios.delete(`https://603cd864f4333a0017b68722.mockapi.io/user/${localDataUser.id}/inventory/${item.id}`)
      .then(result => {
        console.log(result)
        let finalData = product.filter(value => value.id !== item.id)
        setProduct(finalData)
      })
      .catch(err => console.log(err))
    }
    const handleUpdate = (e, item) => {
        const dataUpdate = prompt("Insert new product here : ")
        e.preventDefault()
        console.log(item);
    
        axios.put(`https://603cd864f4333a0017b68722.mockapi.io/user/${localDataUser.id}/inventory/${item.id}`, {name: dataUpdate})
        .then(result => {
          console.log(result)
          axios.get(`https://603cd864f4333a0017b68722.mockapi.io/user/${localDataUser.id}/inventory`)
          .then(result => setProduct(result.data))
        })
        .catch(err => console.log(err))

        setInputData("")
      }

      const handleLogout = () => {
        localStorage.clear()
        toRegister()
      }
      

    return (
      <div className="container">
        <div>
        <div className="flex-row">
        <div className="flex-large">
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit}>
        <input type="text" name="textProduct" value={input} onChange={handleChange}/>
        <button>OK</button>
      </form>
      </div>
      <div className="flex-large">
      <h2>View item</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th className ="col-4">Action</th>
          </tr>
        </thead>
      <tbody>
        {product.map((item,index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>
            <button className="btn btn-sm btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" id="customModal" onClick={(e) => handleUpdate(e, item)}>Update</button>
            <button className="btn btn-sm btn-outline-danger" onClick={(e) => handleDelete(e, item)}>Delete</button>
            </td>
          </tr>
        ))}
        <td>
        <button className="btn btn-sm btn-danger" onClick={handleLogout} >LOGOUT</button>
        </td>
      </tbody>
      </table>
      </div>
      </div>
      {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update Form</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="recipient-name" className="col-form-label">Product name :</label>
                      <input type="text" className="form-control" id="recipient-name" value= {inputData} onChange={handleChangeData}/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal">update</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        </div>
    )
}
