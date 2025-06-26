import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

// Liste des imports de page
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import Book from './pages/Book/Book';
import Questions from './pages/Questions/Questions';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Options from './pages/Options/Options';
// import Register from './pages/Register/Register';
// import Login from './pages/Login/Login';
// import Logout from './pages/Logout/Logout';
import Contact from './pages/Contact/Contact';
import StaticPages from './pages/StaticPages/StaticPages';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import '../static/scss/index.scss';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Header />
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/personnalLibrary" element={<Library />} />
        <Route path="/library/:bookID" element={<Book />} />
        <Route path="/about" element={<StaticPages />} />
        <Route path="/questions" element={<Questions />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/dashboard/options" element={<Options />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<StaticPages />} />
        <Route path="/legal" element={<StaticPages />} />
        <Route path="/terms" element={<StaticPages />} />
        <Route path="/accessibility" element={<StaticPages />} />
      </Routes>
=======
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/personnalLibrary" element={<Library />} />
          {/* <Route path="/library/:bookID" element={<Book />} /> */}
          <Route path="/about" element={<StaticPages />} />
          <Route path="/questions" element={<Questions />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/options" element={<Options />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<StaticPages />} />
          <Route path="/legal" element={<StaticPages />} />
          <Route path="/terms" element={<StaticPages />} />
          <Route path="/accessibility" element={<StaticPages />} />
        </Routes>
      </main>
>>>>>>> dev
      <Footer />
    </BrowserRouter>
  );