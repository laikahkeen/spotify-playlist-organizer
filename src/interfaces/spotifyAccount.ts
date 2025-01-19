export interface PublicAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface PrivateAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
