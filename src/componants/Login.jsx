import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

const Login_Auth = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const [showProfile, setShowProfile] = useState(false);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center space-x-2"
      >
        <div className="w-4 h-4 rounded-full animate-pulse bg-[#66c7c7]"></div>
        <span className="text-[#1a1a4d]">Loading...</span>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <motion.div
            className="relative"
            onHoverStart={() => setShowProfile(true)}
            onHoverEnd={() => setShowProfile(false)}
          >
            <motion.img
              src={user?.picture}
              alt={user?.name}
              className="w-8 h-8 rounded-full cursor-pointer border-2 border-[#66c7c7]"
              whileHover={{ scale: 1.1 }}
            />

            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-sm text-[#2d1c3b]">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs mt-1">{user?.email}</p>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <p className="text-xs text-gray-500">
                      Joined: {new Date(user?.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-[#ffb4b4] text-[#1a1a4d] px-4 py-2 rounded-full shadow-md"
            whileHover={{ scale: 1.05, backgroundColor: "#f5a6a6" }}
            whileTap={{ scale: 0.95 }}
          >
            Log Out
          </motion.button>
        </div>
      ) : (
        <motion.button
          onClick={() => loginWithRedirect()}
          className="bg-[#ffb4b4] text-[#1a1a4d] px-4 py-2 rounded-full shadow-md"
          whileHover={{ scale: 1.05, backgroundColor: "#f5a6a6" }}
          whileTap={{ scale: 0.95 }}
        >
          Log In
        </motion.button>
      )}
    </div>
  );
};

export default Login_Auth;
