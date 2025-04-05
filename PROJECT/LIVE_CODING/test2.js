// let product = {
//     id: 101,
//     name : "Bag",
//     price : 500,
//     discount: 10,
//     finalPrice:0,
//     }

// product.finalPrice=(product.price*product.discount)/100;
// product;

// let product = {
//     id: 101,
//     name: "Bag",
//     price: 500,
//     discount: 10,
//     finalPrice:function() {
//         // const discountAmount = (this.price * this.discount) / 100;
//         return this.price - (this.price *this.discount)/100;
//     }
// };
// product.finalPrice1=product.finalPrice();
// delete product.finalPrice;
// console.log(product);

let a=[1,2,3];
let b=[];
a.pop();
console.log(a);
console.log(a.length);
delete a[1];
a[5]=12;
a[100]=123;
console.log(a);
console.log(a.length);
// delete a[1];
delete a[100];
// console.log(a.length);
for(let val in a){
    if(val==="")
        continue;
    else{
    let b=a.val;
    // console.log(a.length);
    }
        
}
console.log(b.length);
console.log(a.length);