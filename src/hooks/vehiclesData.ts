const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchAllVehicles = async () => {
    try {
        //const response = await fetcher('https://api.thriving-coders.com/vehicles');
        const response = await fetcher('https://api.thriving-coders.com/vehicles');
        return {
            vehicles: response ?? [],
            isLoading: false,
            isError: false,
        };
    } catch (error) {
        return {
            vehicles: [],
            isLoading: false,
            isError: true,
        };
    }
}
