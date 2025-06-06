const defaultDateOptions = {
    weekday: "short", // Thu
    day: "2-digit",   // 18
    month: "short",   // Mar
};

const defaultTimeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use AM/PM format
};

export const parseDateTimeString = (dateTime, options) => {
    const date = new Date(dateTime);

    return {
        date: date.toLocaleDateString("en-US", options ?? defaultDateOptions).replace(",", ""),
        time: date.toLocaleTimeString("en-US", options ?? defaultTimeOptions),
    }
}

export const parseDateString = (dateTime, options) => {
    const date = new Date(dateTime);

    return date.toLocaleDateString("en-US", options ?? defaultDateOptions)
}
