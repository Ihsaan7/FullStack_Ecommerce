// components/Container.js
export default function Container({ className, children }) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      {children}
    </div>
  );
}