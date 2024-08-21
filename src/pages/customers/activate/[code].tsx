import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivateCustomerPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query; // Get the activation code from the URL
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (code && typeof code === 'string') {
      activateCustomer(code);
    }
  }, [code]);

  const activateCustomer = async (activationCode: string) => {
    try {
      const response = await axios.get(`/api/customers/activate/code/${activationCode}`);

      if (response.status === 200) {
        setSuccess(true);
        toast.success('Your account has been successfully activated!');
        setTimeout(() => router.push('/login'), 3000); // Redirect to login or another page
      } else {
        throw new Error('Activation failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during activation';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Activating Your Account</h1>
      {loading && <p>Activating, please wait...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p>Your account has been activated successfully!</p>}
      <ToastContainer />
    </div>
  );
};

export default ActivateCustomerPage;
