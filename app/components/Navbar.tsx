export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow z-50">
      <ul className="flex justify-center space-x-6 p-4">
        <li><a href="#home" className="hover:underline">Home</a></li>
        <li><a href="#certificates" className="hover:underline">Certificates</a></li>
        <li><a href="#letters" className="hover:underline">Laboral Letters</a></li>
        <li><a href="#portfolio" className="hover:underline">Portfolio</a></li>
        <li><a href="#contact" className="hover:underline">Contacto</a></li>
      </ul>
    </nav>
  );
}