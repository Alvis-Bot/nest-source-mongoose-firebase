import { User } from "../schemas/user.schema";

export interface AuthenticationRequest extends Request {
  user: User;
}