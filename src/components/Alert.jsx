import React, { useEffect } from 'react';
import '../assets/css/alert.css';
import { useStateContext } from '../context/StateContext';

/**
 * Alert Component
 * This component is responsible for displaying alerts based on the state managed in a global context.
 * It handles auto-hiding alerts and provides an option for manual dismissal when autoHide is not enabled.
 *
 * @returns {JSX.Element|null} Returns alert component or null based on the alert.show state.
 */
export const Alert = () => {
    const { alert, setAlert, defaultAlert } = useStateContext(); // Destructuring alert state and updater functions from the context.

    /**
     * handleCancel function
     * This function resets the alert state to its default value when the user clicks the cancel button.
     */
    const handleCancel = () => {
        setAlert(defaultAlert); // Resetting alert to its default state.
    };

    useEffect(() => {
        // If autoHide is false, we don't want to set any timeout.
        if (!alert.autoHide) {
            return;
        }

        // Set a timeout to hide the alert automatically after 2000ms (2 seconds).
        const alertTimeout = setTimeout(() => {
            setAlert(defaultAlert); // Hide the alert after the timeout.
        }, 2000);

        // Cleanup the timeout when component is unmounted or alert.autoHide changes.
        return () => clearTimeout(alertTimeout);
    }, [alert.autoHide, setAlert, defaultAlert]);

    // If alert is not set to show, return null (don't render anything).
    if (!alert.show) {
        return null;
    }

    return (
        <div className={`alert-wrap${alert.global ? '' : ' alert-normal-wrap'}`}>
            {/* Display the alert message */}
            <p className="alert-message">{alert.message}</p>

            {/* If autoHide is false, show action buttons to allow manual interaction */}
            {!alert.autoHide && (
                <div className="alert-btn-wrap">
                    {/* Cancel button to reset alert state */}
                    <button
                        className={`alert-btn${alert.disableCancel ? ' alert-btn-disable' : ''}`}
                        type="button"
                        title="Cancel Edit"
                        onClick={handleCancel}
                        disabled={alert.disableCancel}
                        aria-label="Cancel Edit">
                        Cancel
                    </button>

                    {/* Custom action button for any additional handler defined in alert */}
                    <button
                        className="alert-btn"
                        type="button"
                        title="Cancel Edit"
                        onClick={alert.handler}
                        aria-label="Cancel Edit">
                        {alert.handlerText} {/* Text for custom handler */}
                    </button>
                </div>
            )}
        </div>
    );
};
