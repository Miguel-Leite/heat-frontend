import { TUser } from "./TUser"


export type TAuthContextData = {
  user: TUser | null;
  signInUrl: string;
  signOut: ()=> void
}