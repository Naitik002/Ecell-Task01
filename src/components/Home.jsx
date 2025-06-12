import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as createId } from "uuid";
import { toast } from "react-toastify";

function TeamMemberForm({ saveUser, resetEdit, currentEdit }) {
  const [fields, setFields] = useState({
    name: "",
    position: "",
    email: "",
    linkedin: "",
    instagram: "",
    phone: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentEdit) setFields(currentEdit);
  }, [currentEdit]);

  const updateField = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => setFields((f) => ({ ...f, image: fileReader.result }));
      fileReader.readAsDataURL(files[0]);
    } else {
      setFields((f) => ({ ...f, [name]: value }));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const member = { ...fields, id: fields.id ?? createId() };
    saveUser(member);
    setFields({
      name: "",
      position: "",
      email: "",
      linkedin: "",
      instagram: "",
      phone: "",
      image: null,
    });
    toast.success(currentEdit ? "Member updated!" : "Member added!");
    resetEdit();
    navigate("/team");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-10">
      <header className="flex items-center justify-between mb-8">
        <img src="./logo.webp" alt="Logo" className="w-16 h-16 md:w-24 md:h-24" />
        <h2 className="text-2xl md:text-4xl font-semibold">
          {currentEdit ? "Update Member" : "New Team Member"}
        </h2>
        <Link
          to="/team"
          className="bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded text-white transition"
        >
          Team List
        </Link>
      </header>
      <form
        onSubmit={submitForm}
        className="max-w-xl mx-auto bg-gray-800/80 backdrop-blur p-8 rounded-2xl shadow-2xl"
      >
        {[
          { key: "name", label: "Full Name" },
          { key: "position", label: "Role/Position" },
          { key: "email", label: "Email Address" },
          { key: "linkedin", label: "LinkedIn Profile" },
          { key: "instagram", label: "Instagram" },
          { key: "phone", label: "Contact Number" },
        ].map(({ key, label }) => (
          <input
            key={key}
            name={key}
            placeholder={label}
            value={fields[key] || ""}
            onChange={updateField}
            className="mb-4 block w-full bg-gray-900 bg-opacity-40 text-gray-100 border-b-2 border-orange-400 px-5 py-3 rounded-none focus:outline-none text-base"
            required
            autoComplete="off"
          />
        ))}
        <div className="mb-6">
          <label
            htmlFor="profileImage"
            className="cursor-pointer bg-gray-900 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition"
          >
            {fields.image ? "Change Image" : "Upload Image"}
          </label>
          <input
            id="profileImage"
            type="file"
            name="image"
            accept="image/*"
            onChange={updateField}
            className="hidden"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 text-white rounded py-3 font-bold text-lg transition"
        >
          {currentEdit ? "Save Changes" : "Add Member"}
        </button>
      </form>
    </main>
  );
}

export default TeamMemberForm;