import { ReactNode } from 'react';


export interface Product {
    productName: ReactNode | Iterable<ReactNode>;
    tags: string[];
    quantity: number;
    rating: number;
    name: string;
    
    image: any;
    _id : string;
    title : string;
    _type : "product";
    productImage? : {
        asset : {
            _ref : string;
            _type : "image";
        }
    };
    price : number;
    description : string;
    slug : {
        _type : "slug"
        current : string;
    };

    inventory : number;
    discountPercentage: number;
    category: string;
    brand: string;
    id: string;
  
    
    
}

