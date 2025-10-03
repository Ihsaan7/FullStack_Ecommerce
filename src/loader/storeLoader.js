// // loader/storeLoader.js
// import { getCategory } from "../api/category";
// import { getRecent } from "../api/product";

// export async function storeLoader({ request }) {
//   const { signal } = request;

//   const [products, category] = await Promise.all([
//     getRecent({ signal }),
//     getCategory({ signal }),
//   ]);

//   return { products, category };
// }