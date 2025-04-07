import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">403 - Unauthorized Access</h1>
            <p className="text-lg mb-6">
                You do not have permission to view this page. Please contact your administrator if you believe this is a mistake.
            </p>
            <Button onClick={handleGoBack} className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700">
                Go Back
            </Button>
        </div>
    );
};

export default UnauthorizedPage;
