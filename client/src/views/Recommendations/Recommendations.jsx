import { getProducts } from "../../Redux/actions/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.products);

  // Obtener 9 productos aleatorios
  const getRandomProducts = (products, count) => {
    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, count);
  };

  const recommendedProducts = getRandomProducts(products, 9);

  return (
    <div className="select-none">
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Our Recommendations
            </h2>

            <p className="max-w-md mx-auto mt-4 text-gray-500">
              Discover our hand-picked selection of products that we think you
              will love.
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
              <li key={product._id}>
                <a className="relative block group">
                  <img
                    src={product.image}
                    alt=""
                    className="rounded object-cover w-full transition duration-500 aspect-square group-hover:opacity-80"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3
                      className="text-xl font-medium text-white"
                      style={{ textShadow: "1px 1px 2px #000000" }}
                    >
                      {product.name}
                    </h3>

                    <Link to={`/products/${product._id}`}>
                      <span className="rounded mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                        View Detail
                      </span>
                    </Link>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Recommendations;
