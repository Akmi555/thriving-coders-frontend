import axios from "axios";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchOneCustomer = async (id) => {
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
//         import axios from 'axios';

// // Existing fetchOneCustomer function...

// export const fetchDeliveryAddresses = async (customerId) => {
//   try {
//     const response = await axios.get(`/api/customers/${customerId}/deliveryAddresses`);
//     return {
//       addresses: response.data,
//       isError: false,
//     };
//   } catch (error) {
//     console.error('Error fetching delivery addresses:', error);
//     return {
//       addresses: [],
//       isError: true,
//     };
//   }
// };

// Implement the API Route:

// If you're using Next.js API routes, create an API endpoint at pages/api/customers/[id]/deliveryAddresses.js:
// import { getDeliveryAddressesByCustomerId } from 'src/services/customerService';

// export default async (req, res) => {
//   const { id } = req.query;

//   try {
//     const addresses = await getDeliveryAddressesByCustomerId(id);
//     res.status(200).json(addresses);
//   } catch (error) {
//     console.error('Error fetching delivery addresses:', error);
//     res.status(500).json({ error: 'Failed to load delivery addresses' });
//   }
// };


    }

}