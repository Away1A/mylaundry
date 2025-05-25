// src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import { fetchMyProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetchMyProfile(token)
      .then(setProfile)
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <p>
        <strong>ID:</strong> {profile.id}
      </p>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Role:</strong> {profile.role}
      </p>
    </div>
  );
};

export default ProfilePage;
