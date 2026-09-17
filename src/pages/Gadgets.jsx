import { useGrowth } from '../context/GrowthContext';
import '../styles/gadgets.css';

function Gadgets() {
  const { gadgetProducts, addGadgetProduct, deleteGadgetProduct } =
    useGrowth();

  const handleAddProduct = () => {
    const name = window.prompt('Product name');

    if (!name?.trim()) return;

    const price = window.prompt('Selling price');

    addGadgetProduct({
      name: name.trim(),
      price: price || '0',
      status: 'available',
    });
  };

  return (
    <div className="gadgets-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">SIDE BUSINESS</span>
          <h1>Ayomide Gadgets</h1>
          <p>
            Keep the gadget business organized without letting it distract
            from the core missions.
          </p>
        </div>

        <button className="primary-button" onClick={handleAddProduct}>
          + Add Product
        </button>
      </div>

      <section className="gadget-stats">
        <div className="gadget-stat">
          <span>PRODUCTS</span>
          <strong>{gadgetProducts.length}</strong>
        </div>

        <div className="gadget-stat">
          <span>AVAILABLE</span>
          <strong>
            {
              gadgetProducts.filter(
                (product) => product.status === 'available'
              ).length
            }
          </strong>
        </div>

        <div className="gadget-stat">
          <span>BUSINESS MODE</span>
          <strong>Side</strong>
        </div>
      </section>

      <section className="gadget-products">
        <div className="section-heading">
          <div>
            <span className="muted-label">INVENTORY</span>
            <h2>Products</h2>
          </div>
        </div>

        {gadgetProducts.length === 0 ? (
          <div className="gadget-empty">
            <strong>No products added yet.</strong>
            <p>
              Add your first gadget to start tracking the business.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {gadgetProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-placeholder">
                  {product.name.charAt(0).toUpperCase()}
                </div>

                <div className="product-info">
                  <strong>{product.name}</strong>
                  <span>₦{product.price}</span>
                </div>

                <button
                  className="delete-button"
                  onClick={() => deleteGadgetProduct(product.id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Gadgets;