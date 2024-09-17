import axios from "axios";
import React, { useEffect, useMemo, useState } from 'react';
import CrudTable from '../../Components/CrudTable/CrudTable';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Users.scss';

function Users() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const crud_url = "http://localhost:8001/users/";

    const [validationErrors, setValidationErrors] = useState({});

    const columns = useMemo(
        () => [
        {
            accessorKey: "username",
            header: "Nom d'utilisateur",
            muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.username,
            helperText: validationErrors?.username,
            onFocus: () =>
                setValidationErrors({
                ...validationErrors,
                username: undefined,
                }),
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.email,
            helperText: validationErrors?.email,
            onFocus: () =>
                setValidationErrors({
                ...validationErrors,
                email: undefined,
                }),
            },
        },
        {
            accessorKey: "first_name",
            header: "Prénom",
            muiEditTextFieldProps: {
            required: true
            },
        },
        {
            accessorKey: "last_name",
            header: "Nom",
            muiEditTextFieldProps: {
            required: true
            },
        },
        {
            accessorKey: "role",
            header: "Rôle",
            muiEditTextFieldProps: {
            required: true
            },
        },
        {
            accessorKey: "device_name",
            header: "DeviceIdentifier",
        }
        ],
        [validationErrors]
    );

    const validateLength = (value, field, lowest) => {
        if (value.length === 0) {
            return `${field} ne peut pas être vide`;
        } else if (value.length < lowest) {
            return `Un minimum de ${lowest} caractères est requis`;
        } else {
            return "";
        }
    };

    function validateData(data) {
        return {
            username: validateLength(data.username, "Nom d'utilisateur", 1),
            email: validateLength(data.email, "Email", 1)
        };
    }

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(crud_url);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>
            <div className="suivi_main">
                <Navbar />
                <CrudTable
                    data={data}
                    fetchData={fetchData}
                    setValidationErrors={setValidationErrors}
                    columns={columns}
                    crud_url={crud_url}
                    validateData={validateData} />
            </div>
        </div>
    );
}

export default Users;
