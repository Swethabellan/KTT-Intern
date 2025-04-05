// let product = {
//     id: 101,
//     name : "Bag",
//     price : 500,
//     discount: 10,
//     finalPrice:0,
//     }

// product.finalPrice=(product.price*product.discount)/100;
// product;

let product = {
    id: 101,
    name: "Bag",
    price: 500,
    discount: 10,
    finalPrice:function() {
        // const discountAmount = (this.price * this.discount) / 100;
        return this.price - (this.price *this.discount)/100;
    }
};
product.finalPrice1=product.finalPrice();
delete product.finalPrice;
console.log(product);