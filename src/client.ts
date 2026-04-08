import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID from the thirdweb dashboard
const clientId = "b0857771746f363c4613204907921a22"; // Public dummy/test client ID or user should replace

export const client = createThirdwebClient({
  clientId: clientId,
});
