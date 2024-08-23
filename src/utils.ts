export const formatDateChat = (date: string): string => {
    const parsedDate = new Date(date);

    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

    const today = new Date();
    const isToday = parsedDate.getDate() === today.getDate() &&
        parsedDate.getMonth() === today.getMonth() &&
        parsedDate.getFullYear() === today.getFullYear();

    const isThisYear = parsedDate.getFullYear() === today.getFullYear();

    if (isToday) {
        return `${hours}:${minutes}`;
    } else if (isThisYear) {
        return `${day}/${month} ${hours}:${minutes}`;
    } else {
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
}