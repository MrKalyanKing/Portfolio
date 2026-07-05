import React, { useState } from "react";
import { User, LogOut } from "lucide-react";
import dp from '../assets/kalyanprofile.jpg'
export function Settings() {
  const [profileData, setProfileData] = useState({
    name: "Kalyan Badhavath",
    role: " Full Stack Web Developer",
    phone: "+91-9392491012",
    email: "badhavathkalyan08@gmail.com",
  });
  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here
  };
  return (
    <div className="p-8">
      <div className="mb-16">
        <h1 className="text-2xl font-bold text-purple-600">Admin Settings</h1>
        <p className="text-gray-600">ADMIN PANEL</p>
      </div>
      <div className="bg-gradient-to-r from-blue-100 to-blue-500 rounded-3xl p-8 relative overflow-hidden">
        <div className="bg-white rounded-2xl p-6 max-w-2xl shadow-lg">
          <div className="flex gap-8">
            <div className="w-1/3">
              <div className="relative">
                <img
                  src={dp}
                  alt="Profile"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <label className="absolute bottom-2 right-2 bg-white p-2 rounded-lg shadow cursor-pointer">
                  <input type="file" className="hidden" />
                  <User className="w-5 h-5" />
                </label>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">My Profile:</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        role: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Phone:</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Email:</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-500"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-8 bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-1 ">My Account</h3>
              <p className="text-gray-600">Active Account</p>
              <p className="text-gray-600">Email</p>
            </div>
            <button className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
