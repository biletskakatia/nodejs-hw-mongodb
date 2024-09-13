const ParseIntegar = (value, defaultValue) => {
    if (typeof value !== "string") return defaultValue;
    
    const parsedValue = parseInt(value);
    if (Number.isNaN(parsedValue)) return defaultValue;

    return parsedValue;
};

const parsePaginationParams = ({ perPage, page, }) => {
    const parsedPerPage = ParseIntegar(perPage, 10);
    const parsedPage = ParseIntegar(page, 1);

    return {
        perPage: parsedPerPage,
        page: parsedPage,
    };
};

export default parsePaginationParams;