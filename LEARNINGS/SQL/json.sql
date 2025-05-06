CREATE TABLE products(
    id serial PRIMARY KEY,
    data JSONB
);

INSERT INTO products(data)
VALUES 
('{
 "name": "iPhone 15 Pro",
        "category": "Electronics",
        "description": "The latest iPhone with advanced features.",
        "brand": "Apple",
        "price": 999.99,
        "attributes": {
            "color": "Graphite",
            "storage": "256GB",
            "display": "6.1-inch Super Retina XDR display",
            "processor": "A15 Bionic chip"
        },
        "tags": ["smartphone", "iOS", "Apple"]
}'),
 ('{
        "name": "Samsung Galaxy Watch 4",
        "category": "Electronics",
        "description": "A smartwatch with health tracking and stylish design.",
        "brand": "Samsung",
        "price": 349.99,
        "attributes": {
            "color": "Black",
            "size": "42mm",
            "display": "AMOLED display",
            "sensors": ["heart rate monitor", "ECG", "SpO2"]
        },
        "tags": ["smartwatch", "wearable", "Samsung"]
    }'),
    ('{
        "name": "Leather Case for iPhone 15 Pro",
        "category": "Accessories",
        "description": "Premium leather case for iPhone 15 Pro.",
        "brand": "Apple",
        "price": 69.99,
        "attributes": {
            "color": "Saddle Brown",
            "material": "Genuine leather",
            "compatible_devices": ["iPhone 15 Pro", "iPhone 15 Pro Max"]
        },
        "tags": ["phone case", "accessory", "Apple"]
    }'),
    ('{
        "name": "Wireless Charging Pad",
        "category": "Accessories",
        "description": "Fast wireless charger compatible with smartphones and smartwatches.",
        "brand": "Anker",
        "price": 29.99,
        "attributes": {
            "color": "White",
            "compatible_devices": ["iPhone", "Samsung Galaxy", "Apple Watch", "Samsung Galaxy Watch"]
        },
        "tags": ["accessory", "wireless charger"]
    }');

    SELECT * FROM products

SELECT data ->'name' as product_name
from products;

SELECT data ->>'name' as product_name
from products;

SELECT data #>'{attributes}' as attributes 
from products;

SELECT data #>'{attributes,color}' as colors
from products;

SELECT data #>>'{attributes,color}' as colors
from products;

SELECT
  id,
  data ->> 'name' product_name
FROM
  products
WHERE
  data @> '{"category": "Electronics"}';

SELECT
  '{"name": "iPad"}' :: jsonb ||
   '{"price": 799}' :: jsonb
AS product;

SELECT id,data->> 'name' product_name,data ->>'price' price 
from products 
where data ? 'price'

select data->> 'name' product_name,data ->> 'tags' tags 
from products
where data-> 'tags' ?'Apple'

select '{"name":"Abc","age":22}' :: jsonb-'name' result;

SELECT data ->>'price' price 
from products
where data @?'$.price? (@>999)';

 
