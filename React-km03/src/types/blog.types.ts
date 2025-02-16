

export interface Blog {
    _id?: string,
    title: string,
    content: string,
    author: HandleAuthor,
    category: string,
    createdAt?: string,
    updatedAt?: string
}


interface HandleAuthor {
    _id: string;
    username: string;
  }
  
  interface HandleCategory {
    _id: string;
    name: string;
  }
  
  export interface HandleBlog {
    _id: string;
    title: string;
    content: string;
    author: HandleAuthor; 
    category: HandleCategory;
    createdAt: string;
  }
  
  export interface UpdateBlog {
 
    title: string;
    content: string;
    author: string; 
    category: string;

  }
  