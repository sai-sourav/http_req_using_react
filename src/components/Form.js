import React, { useCallback, useRef } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddMovie() {
  const AddnewMovie = useCallback(async (event) => {
    event.preventDefault();
    const form = event.target;
    const obj = {
      title: titleref.current.value,
      openingtext: openingref.current.value,
      releasedate: releaseref.current.value,
    };
    try {
      await fetch(
        "https://react-http-2467f-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    form.reset();
  }, []);

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
        <Form.Control type="text" placeholder="openingText" ref={openingref} />
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
