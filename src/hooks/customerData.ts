import axios from "axios";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchOneCustomer = async (id) => {

// export const fetchOneCustomer = async (id: string) => {

// export const fetchOneCustomer = async (id: string | string[]) => {
    try {
        const response = await fetcher('http://localhost:4567/customers/' + id);
        return {
            customer: response ?? null,
            isLoading: false,
            isError: false,
        };
    } catch (error) {
        return {
            customer: null,
            isLoading: false,
            isError: true,
        };

    }

}