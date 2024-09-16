export const displayNotification = (message: string, type: "error" | "success" | "info" = "info") => {
    // eslint-disable-next-line no-undef
    alert(`${type.toUpperCase()}: ${message}`);
};