import axios from "axios";
import { Customer } from "interfaces/customer";
import { Interface } from "readline";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const editOneCustomer= async (customerData:Customer) => {
    try {
        // const response = await fetcher('https://api.thriving-coders.com/customers');
        const response = await fetcher('https://api.thriving-coders.com/customers' + id);
        return {
            customers: response ?? null,
            isLoading: false,
            isError: false,
        };
    } catch (error) {
        return {
            customers: null,
            isLoading: false,
            isError: true,
        };
    }

}
    