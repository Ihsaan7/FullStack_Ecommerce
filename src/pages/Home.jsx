import React from "react";
import Crousel from "../components/home/Crousel";
import Container from "../components/Container";

const Home = () => {
  return (
    <>
      <Container>
        <Crousel />
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
