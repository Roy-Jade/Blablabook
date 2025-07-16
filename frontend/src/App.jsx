import { BrowserRouter, Routes, Route } from 'react-router';
import { useState  } from "react";
import { CurrentUserContext } from './Contexts';

// Liste des imports de page
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import BookID from './pages/BookID/BookID';
import Questions from './pages/Questions/Questions';
import Dashboard from './pages/Dashboard/Dashboard';
import Options from './pages/Options/Options';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Contact from './pages/Contact/Contact';
import StaticPages from './pages/StaticPages/StaticPages';
import NotFound from './pages/NotFound/NotFound';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default function App() {

    const [currentUser, setCurrentUser] = useState(null);
    console.log(currentUser)

    return (
        // Transmet le contexte CurrentUserContext à toute les pages contenue dans les balises
        <CurrentUserContext value={{ currentUser, setCurrentUser }}> 

            <BrowserRouter>
                <Header />
                <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/library/:user" element={<Library />} />
                    <Route path="/book/:bookID" element={<BookID />} />
                    <Route path="/about" element={<StaticPages />} />
                    <Route path="/questions" element={<Questions />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/options" element={<Options />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<StaticPages />} />
                    <Route path="/legal" element={<StaticPages />} />
                    <Route path="/terms" element={<StaticPages />} />
                    <Route path="/accessibility" element={<StaticPages />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </CurrentUserContext>
    )
}
