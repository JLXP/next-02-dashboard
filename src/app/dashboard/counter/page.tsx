

import { Metadata } from "next";
import { CartCounter } from '../../shopping-cart/components/CartCounter';

export const metadata: Metadata = {
    title: 'Shopping Cart',
    description: 'Un simple contador',
};

export default function Counterpage() {


    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <span>Productos en el carrito</span>

            <CartCounter />

        </div>
    )
}
