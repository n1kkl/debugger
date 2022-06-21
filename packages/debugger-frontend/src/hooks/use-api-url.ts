export const useApiUrl = (path: string = '/') => {
    return new URL(path, process.env.REACT_APP_API_URL).toString();
};