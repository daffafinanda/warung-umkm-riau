"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
    errorMessage: string;
    showError: (message: string) => void;
    hideError: () => void;
    notificationMessage: string;
    showNotification: (message: string) => void;
    hideNotification: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    const showError = (message: string) => setErrorMessage(message);
    const hideError = () => setErrorMessage("");

    const showNotification = (message: string) => setNotificationMessage(message);
    const hideNotification = () => setNotificationMessage("");

    return (
        <ModalContext.Provider
            value={{
                errorMessage,
                showError,
                hideError,
                notificationMessage,
                showNotification,
                hideNotification,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
