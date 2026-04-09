import { createThirdwebClient } from "thirdweb";

// Use environment variable for client ID, fallback to dummy for preview if not set
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "b0857771746f363c4613204907921a22";

export const client = createThirdwebClient({
  clientId: clientId,
});
