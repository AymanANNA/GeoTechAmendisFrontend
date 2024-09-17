import React, { useEffect, useState } from 'react';

const TechnicianStatusDisplay = () => {
    const [technicians, setTechnicians] = useState({ active: [], notActive: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8001/api/technician-status', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Échec de la récupération des données');
                }
                const data = await response.json();
                setTechnicians({ active: data.active, notActive: data.not_active });
            } catch (error) {
                console.error('Erreur lors de la récupération des données des techniciens:', error);
            }
        }
        fetchData();
        const intervalId = setInterval(fetchData, 30000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={styles.container}>
            <h4 style={styles.header}>Statut des Techniciens</h4>
            <div>
                <strong>Techniciens Actifs</strong>
                <ul style={styles.list}>
                    {['Zakariae', 'Samid'].length > 0 ? (
                        ['Zakariae', 'Samid'].map((tech, index) => (
                            <li key={`active-${index}`} style={{ ...styles.listItem, ...styles.activeItem }}>
                                {tech}
                            </li>
                        ))
                    ) : (
                        <p>Aucun technicien actif.</p>
                    )}
                </ul>
            </div>
            <div>
                <strong>Techniciens Inactifs</strong>
                <ul style={styles.list}>
                    {['Amine', 'Mouad', 'Imad', 'Mohamed'].length > 0 ? (
                        ['Amine', 'Mouad', 'Imad', 'Mohamed'].map((tech, index) => (
                            <li key={`not-active-${index}`} style={{ ...styles.listItem, ...styles.inactiveItem }}>
                                {tech}
                            </li>
                        ))
                    ) : (
                        <p>Aucun technicien inactif.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxWidth: '350px',
        zIndex: 1000,
        position: 'absolute',
        top: '20px',
        right: '20px',
        overflow: 'hidden',
        border: '1px solid #ccc'  // Ajoute une bordure subtile
    },
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
        marginBottom: '10px'  // Ajoute un espace entre l'en-tête et la liste
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0
    },
    listItem: {
        padding: '8px 12px',
        margin: '5px 0',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    activeItem: {
        backgroundColor: '#e3f2fd', // Fond bleu clair pour les éléments actifs
    },
    inactiveItem: {
        backgroundColor: '#ffebee', // Fond rouge clair pour les éléments inactifs
    }
};


export default TechnicianStatusDisplay;
