import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function ModalInventory(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Update Item</h4>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control type="text"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.handleSave}>Update</Button>
          <Button onClick={props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}
