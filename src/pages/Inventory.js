import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Register from './Register'
import Table from 'react-bootstrap/Table' 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

const Input = styled.input`
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || "teal"};
background: lavender;
border: none;
border-radius: 3px;
`;

export default function Inventory() {
 

    const history = useHistory()
    const toRegister = () => history.push('/register')
    const [product, setProduct] = useState([])
    const [input, setInput] = useState("")
    let localData = localStorage.getItem("user")
    let localDataUser = JSON.parse(localData)
  
    useEffect(() => {
      if (!localStorage.user) {
        alert("You have to register first")
        toRegister()
        return (<Register />)
      }
      axios.get(`https://603cd864f4333a0017b68722.mockapi.io/user/${localDataUser.id}/inventory`)
      .then(result => setProduct(result.data))
    }, [])
  
    const handleChange = (e) => {
      setInput(e.target.value)
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
      }
    return (
      <Container>
      <div>
      <div className="flex-row">
      <div className="flex-large">
      <Accordion defaultActiveKey="0">
      <Accordion.Toggle as={Button} variant="text" eventKey="0">
        <h1>Add Item</h1>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
      <Form>
      <Form.Group controlId="formBasic">
      <Input placeholder="product name" type="text" name="textProduct" value={input} onChange={handleChange}/>
      </Form.Group>
      <Button onClick={handleSubmit}>Add</Button>
      </Form>
      </Accordion.Collapse>
      </Accordion>
    </div>
    <div className="flex-large">
    <h3>View Item</h3>
    <Table>
      <thead>
        <tr>
          <th>Product Name</th>
          <Col></Col>
          <th>Action</th>
        </tr>
      </thead>
    <tbody>
      { product.length > 0 ? (
      product.map((item,index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <Col></Col>
          <td>
          
          <button className="btn btn-sm btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" id="customModal" onClick={(e) => handleUpdate(e, item)}>Update</button>
          <button className="btn btn-sm btn-outline-danger" onClick={(e) => handleDelete(e, item)}>Delete</button>
          
          </td>
        </tr>
      ))) : <tr>
      <td>No product</td>
    </tr>}
    </tbody>
    </Table>
    </div>
    </div>
    </div>
    </Container>
    )
}











