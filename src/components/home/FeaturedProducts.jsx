function FeaturedProducts() {}

function loader({ required: { signal } }) {
  return <h1>Loader</h1>;
}

export const featuredRoute = {
  loader,
  element: <FeaturedProducts />,
};
