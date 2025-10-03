import React from "react";

const Home = () => {
  return (
    <>
      <div>Home</div>
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
