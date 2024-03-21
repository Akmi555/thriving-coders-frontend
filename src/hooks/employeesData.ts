import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchAllEmployees = async () => {
    try {
        const response = await fetcher('https://api.thriving-coders.com/employees');
        return {
            employees: response ?? [],
            isLoading: false,
            isError: false,
        };
    } catch (error) {
        return {
            employees: [],
            isLoading: false,
            isError: true,
        };
    }
}
