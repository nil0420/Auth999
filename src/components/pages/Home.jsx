import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LogoutAlert from "../necessary/LogoutAlert";
import Footer from "./Footer";
import axios from "axios";
import { debounce } from "lodash";
import Loader from "../necessary/Loader";

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("hero");
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("movies");
  const [showLoader, setShowLoader] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const fetchMovies = (query) => {
    axios
      .get(`https://www.omdbapi.com/?s=${query}&apikey=3a8605c7`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const debouncedSearch = debounce((query) => {
    fetchMovies(query);
  }, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim()) {
      debouncedSearch(value);
    } else {
      setApiData(null);
    }
  };

  const handleTabSwitch = (tab) => {
    setShowLoader(true);
    setTimeout(() => {
      setActiveTab(tab);
      setShowLoader(false);
    }, 1500);
  };

  const handleAddToWishlist = (movie) => {
    if (!wishlist.find((item) => item.imdbID === movie.imdbID)) {
      const updatedWishlist = [...wishlist, movie];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      showAlert(`${movie.Title} added to Wishlist!`);
    }
  };

  const handleRemoveFromWishlist = (movie) => {
    const updatedWishlist = wishlist.filter((item) => item.imdbID !== movie.imdbID);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    showAlert(`${movie.Title} removed from Wishlist.`);
  };

  useEffect(() => {
    fetchMovies(searchTerm);

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }

    const handleBackButton = (event) => {
      event.preventDefault();
      setShowLogoutAlert(true);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleConfirmLogout = () => {
    localStorage.removeItem("loggedInUserEmail");
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutAlert(false);
    window.history.pushState(null, null, window.location.pathname);
  };

  return (
    <>
      {showLogoutAlert && (
        <LogoutAlert
          message="Are you sure you want to logout?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
      <Navbar />
      {alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg z-50 shadow-lg">
          {alertMessage}
        </div>
      )}
      <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-full lg:w-1/5 bg-black text-white p-6 border-r-2 border-gray-700">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav>
            <ul className="space-y-6">
              <li
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  activeTab === "movies" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"
                }`}
                onClick={() => handleTabSwitch("movies")}
              >
                <span>Home</span>
              </li>
              <li
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  activeTab === "wishlist" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"
                }`}
                onClick={() => handleTabSwitch("wishlist")}
              >
                <span>Wishlist</span>
              </li>
              <li
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  activeTab === "settings" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"
                }`}
                onClick={() => handleTabSwitch("settings")}
              >
                <span>Settings</span>
              </li>
              <li
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  activeTab === "career" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"
                }`}
                onClick={() => handleTabSwitch("career")}
              >
                <span>Career</span>
              </li>
              <li
                className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-600 hover:text-white rounded-lg cursor-pointer transition-all"
                onClick={() => setShowLogoutAlert(true)}
              >
                <span>Logout</span>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-4/5 p-6">
          {showLoader ? (
            <Loader />
          ) : (
            <>
              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-8">My Wishlist</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {wishlist.length > 0 ? (
                      wishlist.map((movie) => (
                        <div
                          key={movie.imdbID}
                          className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-64 object-cover transition-transform duration-300"
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">{movie.Title}</h3>
                            <p className="text-sm text-gray-400 mt-2">Year: {movie.Year}</p>
                            <button
                              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                              onClick={() => handleRemoveFromWishlist(movie)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-red-600 text-lg mt-6">Your wishlist is empty.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "movies" && (
                <div>
                  <div className="mb-8 flex items-center">
                    <input
                      type="text"
                      className="flex-grow border border-gray-700 focus:ring-2 focus:ring-red-600 rounded-lg p-3 text-gray-300"
                      placeholder="Search for a movie..."
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </div>
                  {apiData && apiData.Response === "True" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                      {apiData.Search.map((movie) => (
                        <div
                          key={movie.imdbID}
                          className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-72 object-cover transition-transform duration-300"
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-semibold">{movie.Title}</h3>
                            <p className="text-sm text-gray-400 mt-2">Year: {movie.Year}</p>
                            <button
                              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                              onClick={() => handleAddToWishlist(movie)}
                            >
                              Add to Wishlist
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && <div>website under maintainancce</div>}
              {activeTab === "career" && <div>website under maintaainance</div>}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
