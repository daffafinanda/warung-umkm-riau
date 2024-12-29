'use client'; // Mark this component as a client component

import React from "react";
import { useModal } from "@/components/ModalContext";
import ErrorModal from "@/components/errorModal";
import NotificationPopup from "@/components/NotificationPopUp";

const Modals: React.FC = () => {
    const {
        errorMessage,
        hideError,
        notificationMessage,
        hideNotification,
    } = useModal();

    return (
        <>
            {errorMessage && <ErrorModal message={errorMessage} onClose={hideError} />}
            {notificationMessage && (
                <NotificationPopup
                    message={notificationMessage}
                    isVisible={!!notificationMessage}
                    onClose={hideNotification}
                />
            )}
        </>
    );
};

export default Modals;
