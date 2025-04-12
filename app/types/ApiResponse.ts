import { Transaction } from "../model/User";
export interface ApiResponse {
  success: boolean;
  message: string;
  Transaction?: Array<Transaction>;
  data?: any;
  error?: string;
}
