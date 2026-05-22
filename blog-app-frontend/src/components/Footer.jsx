function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a href="#" className="text-gray-500 hover:text-[#7c3aed]">About</a>
          <a href="#" className="text-gray-500 hover:text-[#7c3aed]">Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-[#7c3aed]">Terms of Service</a>
          <a href="#" className="text-gray-500 hover:text-[#7c3aed]">Contact</a>
        </div>
        <p className="text-gray-400 text-sm">
          {currentYear} MyBlog.
        </p>
      </div>
    </footer>
  );
}

export default Footer;