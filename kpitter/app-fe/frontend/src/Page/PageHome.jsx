import React, { useState } from "react";
import RegistrationForm from "../Components/Form"; 
import LoginForm from "../Components/loginForm";
import Modal from "@mui/material/Modal"; 
import './PageHome.css';

function Home() {
    const [openRegistration, setOpenRegistration] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

  
    const handleCloseRegistration = () => {
        setOpenRegistration(false);
    };

   
    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

   
    const handleOpenRegistration = () => {
        setOpenRegistration(true);
    };

   
    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    return (
        <div className="container">
            <header className="header">
                <h1 className="logo">KPI-tter</h1>
            </header>

            <main className="main-content">
                <h2>Ласкаво просимо до KPI-tter</h2>
                <p>Залишайте свої думки, діліться новинами та спілкуйтесь зі спільнотою!</p>

                <div className="buttons">
                    <button className="btn btn-auth" onClick={handleOpenLogin}>
                        Увійти
                    </button>
                    <button className="btn btn-register" onClick={handleOpenRegistration}>
                        Зареєструватися
                    </button>
                </div>

               
                <Modal
                    open={openRegistration}
                    onClose={handleCloseRegistration}
                >
                    <div className="modal-content">
                        <RegistrationForm />
                    </div>
                </Modal>

               
                <Modal
                    open={openLogin}
                    onClose={handleCloseLogin}
                >
                    <div className="modal-content">
                        <LoginForm />
                    </div>
                </Modal>
            </main>

            <footer className="footer">
                <p>© 2024 KPI-tter. Всі права захищені.</p>
            </footer>
        </div>
    );
}

export default Home;
