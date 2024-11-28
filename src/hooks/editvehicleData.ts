const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchOneVehicle = async (id) => {
    try {
        //const response = await fetcher('https://api.thriving-coders.com/vehicles');
        const response = await fetcher('https://api.thriving-coders.com/vehicles/' + id);
        return {
            vehicle: response ?? null,
            isLoading: false,
            isError: false,
        };
    } catch (error) {
        return {
            vehicle: null,
            isLoading: false,
            isError: true,
        };
    }

}