import React from "react";
import Crousel from "../components/Crousel";
import Container from "../components/Container";

const Home = () => {
  return (
    <>
      <Container>
        <Crousel />
        <h1>Home</h1>
      </Container>
    </>
  );
};

function loader({ request: { signal } }) {
  return <h1>Loader</h1>;
}

export const homeRoute = {
  loader,
  element: <Home />,
};
