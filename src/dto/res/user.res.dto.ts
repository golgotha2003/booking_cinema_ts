export interface UserResponseDto {
    _id: string | unknown;
    avatar: string;
    email: string;
    full_name: string;
    phone: string;
    role: string;
}

export interface AuthResponseDto{
    message: string;
    access_token?: string;
    error?: boolean;
    user?: UserResponseDto;
}