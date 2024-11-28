import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchAllCustomers= async () => {
    try {
        // const response = await fetcher('https://api.thriving-coders.com/customers');
        const response = await fetcher('https://api.thriving-coders.com/customers');
        return {
            customers: response ?? [],
            isLoading: false,
            isError: false,
        };
    } catch (error) {
        return {
            customers: [],
            isLoading: false,
            isError: true,
        };
    }
}
