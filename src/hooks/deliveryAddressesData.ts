export const fetchDeliveryAddressesByCustomerId = async (id) => {
    try {
      const response = await fetch(`https://api.thriving-coders.com/customers/${id}/deliveryaddresses` + id);
      return {
        deliveryAddresses: response ?? [],
        isLoading: false,
        isError: false,
      };
    } catch (error) {
      console.error('Error fetching delivery addresses:', error);
      return {
        deliveryAddresses: [],
        isLoading: false,
        isError: true,
      };
    }
  };