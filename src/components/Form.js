import React, { useCallback, useRef } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddMovie() {

  const AddnewMovie = useCallback((event) => {
    event.preventDefault();
    const form = event.target;
    const obj ={
        title : titleref.current.value,
        openingText : openingref.current.value,
        releaseDate : releaseref.current.value
    }
    console.log(obj);
    form.reset();
  },[]);

  const titleref = useRef(undefined);
  const openingref = useRef(undefined);
  const releaseref = useRef(undefined);
  return (
    <Form onSubmit={AddnewMovie}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" ref={titleref} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicopeningText">
        <Form.Label>openingText</Form.Label>
        <Form.Control type="text" placeholder="openingText" ref={openingref}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicReleaseDate">
        <Form.Label>Release Date</Form.Label>
        <Form.Control type="text" placeholder="ReleaseDate" ref={releaseref} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
