//creating two types cart and cartItems

export class Cart{
    items: CartItem[] = [];
}

export class CartItem{
    productId: string="";
    quantity: number=0;
}



export class CartItemDetails{
    product?: any;
    quantity: number=0;
}