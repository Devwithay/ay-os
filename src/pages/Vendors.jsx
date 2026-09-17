import { useState } from 'react';

import { useGrowth } from '../context/GrowthContext';

import '../styles/vendors.css';

const statuses = [
  'prospect',
  'contacted',
  'interested',
  'onboarded',
  'active',
  'inactive',
];

function Vendors() {
  const {
    vendors,
    addVendor,
    updateVendor,
    deleteVendor,
  } = useGrowth();

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const [form, setForm] = useState({
    name: '',
    business: '',
    contact: '',
    status: 'prospect',
    notes: '',
  });

  const filteredVendors =
    filter === 'all'
      ? vendors
      : vendors.filter((vendor) => vendor.status === filter);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    addVendor(form);

    setForm({
      name: '',
      business: '',
      contact: '',
      status: 'prospect',
      notes: '',
    });

    setShowForm(false);
  };

  return (
    <div className="vendors-page">
      <header className="page-header">
        <div>
          <span className="eyebrow">GAINLY CRM</span>
          <h1>Vendors</h1>
          <p>
            Every vendor should have a clear next action.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm((value) => !value)}
        >
          {showForm ? 'Cancel' : '+ Add vendor'}
        </button>
      </header>

      {showForm && (
        <form
          className="vendor-form"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Vendor name"
            value={form.name}
            onChange={(event) =>
              setForm({
                ...form,
                name: event.target.value,
              })
            }
          />

          <input
            placeholder="Business name"
            value={form.business}
            onChange={(event) =>
              setForm({
                ...form,
                business: event.target.value,
              })
            }
          />

          <input
            placeholder="Phone / WhatsApp"
            value={form.contact}
            onChange={(event) =>
              setForm({
                ...form,
                contact: event.target.value,
              })
            }
          />

          <select
            value={form.status}
            onChange={(event) =>
              setForm({
                ...form,
                status: event.target.value,
              })
            }
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(event) =>
              setForm({
                ...form,
                notes: event.target.value,
              })
            }
          />

          <button
            className="primary-button"
            type="submit"
          >
            Add vendor
          </button>
        </form>
      )}

      <div className="vendor-filters">
        {['all', ...statuses].map((status) => (
          <button
            key={status}
            className={filter === status ? 'active' : ''}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <section className="vendor-list">
        {filteredVendors.length === 0 ? (
          <div className="empty-vendors">
            <span>♙</span>
            <strong>No vendors here yet.</strong>
            <p>
              Add your first vendor and start tracking the relationship.
            </p>
          </div>
        ) : (
          filteredVendors.map((vendor) => (
            <article
              className="vendor-card"
              key={vendor.id}
            >
              <div className="vendor-avatar">
                {vendor.name.charAt(0).toUpperCase()}
              </div>

              <div className="vendor-info">
                <strong>{vendor.name}</strong>

                <span>
                  {vendor.business || 'No business name'}
                </span>

                {vendor.contact && (
                  <small>{vendor.contact}</small>
                )}

                {vendor.notes && (
                  <p>{vendor.notes}</p>
                )}
              </div>

              <select
                value={vendor.status}
                onChange={(event) =>
                  updateVendor(vendor.id, {
                    status: event.target.value,
                  })
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                className="delete-vendor"
                onClick={() => deleteVendor(vendor.id)}
              >
                ×
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default Vendors;