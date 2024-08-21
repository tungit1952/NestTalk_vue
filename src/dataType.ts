export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
};

export type Message = {
    content: string;
    receiverId:number;
    roomId:number;
}