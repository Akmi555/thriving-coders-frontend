export const fetchDeliveryAddressesByCustomerId = async (id) => {
    try {
      const response = await fetch(`http://localhost:4567/customers/${id}/deliveryaddresses` + id);
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