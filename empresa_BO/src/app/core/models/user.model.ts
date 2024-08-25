export interface UserModel {
    id: number;
    createAt: Date;
    name: string;
    lastname: string;
    email: string;
    age: number;
}

export interface UserCreateModel {
    name: string;
    lastname: string;
    email: string;
    age: number;
}

export interface UserUpdateModel {
    id: number;
    name: string;
    lastname: string;
    email: string;
    age: number;
}