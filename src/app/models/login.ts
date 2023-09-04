export interface Login{
    email: string;
    password: string;
  }

export interface restorePassword{
  sEmail: string;
  sOldPassword: string;
  sNewPassword: string;
}