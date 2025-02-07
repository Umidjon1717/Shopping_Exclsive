import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mockOrders = [
  { id: 1, product: "Product A", status: "Shipped" },
  { id: 2, product: "Product B", status: "Pending" },
];

const mockWishlist = [
  { id: 1, product: "Product C" },
  { id: 2, product: "Product D" },
];

const Profile = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [user, setUser] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [orders] = useState(mockOrders);
  const [wishlist] = useState(mockWishlist);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    alert("Changes saved!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto my-8">
      <div className="profile-page">
        <h1 className="text-3xl mb-4">Profile Page</h1>

        <div className="user-info max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            User Information
          </h2>

          {isEditing ? (
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="font-medium text-gray-600">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={user.username}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium text-gray-600">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="font-medium text-gray-600">
                  Phone:
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-800 text-lg mb-2">
                Username: <span className="font-medium">{user.username}</span>
              </p>
              <p className="text-gray-800 text-lg mb-2">
                Email: <span className="font-medium">{user.email}</span>
              </p>
              <p className="text-gray-800 text-lg mb-4">
                Phone: <span className="font-medium">{user.phone}</span>
              </p>

              <button
                onClick={handleEditToggle}
                className="bg-yellow-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit Info
              </button>
            </div>
          )}
        </div>

        <div className="orders mt-8">
          <h2 className="text-2xl mb-2">Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="mb-2">
                  <span>
                    {order.product} - {order.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="wishlist mt-8">
          <h2 className="text-2xl mb-2">Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>No items in wishlist.</p>
          ) : (
            <ul>
              {wishlist.map((item) => (
                <li key={item.id} className="mb-2">
                  <span>{item.product}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
