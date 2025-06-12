import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLinkedin,
  FaTrash,
  FaPhone,
  FaEdit,
  FaInstagram,
} from "react-icons/fa";

function Teamlist({ members, removeMember, editMember }) {
  const Header = () => (
    <header className="flex justify-between items-center mb-10">
      <a href="/">
        <img
          src="./logo.webp"
          alt="logo"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full"
        />
      </a>
      <h1 className="text-3xl font-bold text-white tracking-wide">Team Directory</h1>
      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        Home
      </Link>
    </header>
  );

  const EmptyState = () => (
    <section className="flex justify-center items-center h-[60vh]">
      <h2 className="text-3xl md:text-4xl font-semibold text-orange-100">
        No team members available
      </h2>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-800 to-orange-300 text-white px-6 md:px-16 py-10">
      <Header />
      {members.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-2xl border border-white/10"
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-28 h-28 mx-auto rounded-full border-4 border-orange-300 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold mt-4 text-white">{m.name}</h3>
              <p className="text-sm text-orange-200 tracking-wide">{m.position}</p>

              <div className="flex justify-center gap-4 mt-4 text-xl text-orange-100">
                <a
                  href={`mailto:${m.email}`}
                  className="hover:text-orange-400 hover:scale-110 transition"
                >
                  <FaEnvelope />
                </a>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 hover:scale-110 transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={`https://instagram.com/${m.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href={`tel:${m.phone}`}
                  className="hover:text-orange-400 hover:scale-110 transition"
                >
                  <FaPhone />
                </a>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => editMember(m)}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white text-sm shadow transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => removeMember(m.id)}
                  className="text-red-400 hover:text-red-500 flex items-center gap-2 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teamlist;
