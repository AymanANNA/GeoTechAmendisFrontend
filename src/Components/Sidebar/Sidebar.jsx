import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <div className="geolocation-header">
                    <h2 className="text_none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9C5 13.25 12 22 12 22C12 22 19 13.25 19 9C19 5.13 15.87 2 12 2ZM12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 8.62 10.62 7.5 12 7.5C13.38 7.5 14.5 8.62 14.5 10C14.5 11.38 13.38 12.5 12 12.5Z" fill="white"/>
                        </svg>
                        GeoTechAmendis
                    </h2>
                </div>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">lists</p>

                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Tableau de bord
                        </li>
                    </Link>

                    <Link to="/suivi" style={{ textDecoration: 'none' }}>
                        <li>
                            <FmdGoodIcon className="icon" /> Suivi
                        </li>
                    </Link>

                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Gestion des utilisateurs
                        </li>
                    </Link>

                    <Link to="/Reports" style={{ textDecoration: 'none' }}>
                        <li>
                            <svg width="16" className="icon" height="16" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512"><path d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg> Itérinaires
                        </li>
                    </Link>

                    <p className="spann">Settings</p>
                    
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <li>
                            <LogoutIcon className="icon" /> Se déconnecter
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
