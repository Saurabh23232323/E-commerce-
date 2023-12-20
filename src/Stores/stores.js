import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarslice";
import categoryReducer from "./Categoryslice";
import productReducer from "./Productslice";
import cartReducer from "./Cartslice";
import searchReducer from "./Searchslice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer
    }
});

export default store;