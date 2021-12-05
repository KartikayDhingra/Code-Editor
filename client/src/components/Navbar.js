const Navbar = () => {
  return (
    <nav className="px-12 py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex">
      <div className="text-2xl tracking-widest">LOGO</div>
      <ul className="flex justify-between items-center ml-auto w-1/3 text-blue-800 font-light">
        <li>
          <a href="/" className="px-1.5 py-1.5 text-white hover:bg-white hover:bg-opacity-30">Home</a>
        </li>
        <li>
          <a href="/" className="px-1.5 py-1.5 text-white hover:bg-white hover:bg-opacity-30">Codepair</a>
        </li>
        <li>
          <a href="/" className="px-1.5 py-1.5 text-white hover:bg-white hover:bg-opacity-30">Algorithms</a>
        </li>
        <li>
          <a href="/" className="px-1.5 py-1.5 text-white hover:bg-white hover:bg-opacity-30">Sign up / Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
