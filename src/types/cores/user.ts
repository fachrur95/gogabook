export interface IUser {
  id: string;
  masteruser_id: string;
  masteruser_email: string | null;
  masteruser_username: string | null;
  masteruser_password: string | null;
  masteruser_nama: string | null;
  masteruser_telp: string | null;
  masteruser_isverifikasi: boolean
  masteruser_referal: string | null;
  masteruser_superuser: boolean;
  masteruser_kodeotp: string | null;
  masteruser_expiredotp: number | null;
  masteruser_active: boolean;
  masteruser_createdate: number | null;
}