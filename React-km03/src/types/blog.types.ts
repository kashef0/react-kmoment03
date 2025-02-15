import {User} from './auth.types';
import { Category } from './category.types';


export interface Blog {
    _id: string,
    title: string,
    content: string,
    author: User,
    category: Category,
    createdAt?: string,
    updatedAt?: string
}