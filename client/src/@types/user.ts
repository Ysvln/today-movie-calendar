export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  id: number;
  name: string;
  email: string;
}

export interface UserSignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpSendEmailRequest {
  email: string;
}

export interface SignUpCheckEmailRequest {
  email: string;
  code: string;
}

export interface MessageResponse {
  message: string;
}

export interface UserInfo {
  id: number | null;
  name: string;
  email: string;
  watchedMovieCount: number | null;
  commentedMovieCount: number | null;
  ratingMovieCount: number | null;
}
