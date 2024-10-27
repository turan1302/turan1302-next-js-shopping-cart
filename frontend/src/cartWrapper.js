"use client"

import {useCart} from "react-use-cart";

const cartWrapper = WrappedComponent => props =>{
    const cart = useCart();

    return <WrappedComponent {...props} {...{cart}}></WrappedComponent>
}

export default cartWrapper;