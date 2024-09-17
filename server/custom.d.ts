import { SecureUser } from "./src/api/user/userModel";
declare global {
   namespace Express {
      interface Request {
         user?: SecureUser;
      }
   }
}