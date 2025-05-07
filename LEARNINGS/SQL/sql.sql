CREATE TABLE "Authors" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP
);

CREATE TABLE "Author_books" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author_id INTEGER NOT NULL,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    CONSTRAINT foreignkey_author FOREIGN KEY (author_id) REFERENCES "Authors"(id) ON DELETE CASCADE
);
INSERT INTO "Authors" (name, "createdAt") VALUES
('Harper Lee', current_timestamp),
('George Orwell', '2025-04-02 11:00:00+05:30'),
('Jane Austen', '2025-04-03 12:00:00+05:30'),
('J.K. Rowling', '2025-04-04 13:00:00+05:30'),
('Mark Twain', current_timestamp),
('Ernest Hemingway', '2025-04-06 15:00:00+05:30'),
('Agatha Christie', '2025-04-07 16:00:00+05:30'),
('Stephen King', '2025-04-08 17:00:00+05:30'),
('Toni Morrison', current_timestamp),
('Gabriel García Márquez', '2025-04-10 19:00:00+05:30');

INSERT INTO "Author_books" (title, author_id, "createdAt", "updatedAt") VALUES
('To Kill a Mockingbird', 1, current_timestamp, current_timestamp),
('Go Set a Watchman', 1, '2025-04-16 10:00:00+05:30', '2025-04-16 10:00:00+05:30'),
('1984', 2, '2025-04-17 10:00:00+05:30', '2025-04-17 10:00:00+05:30'),
('Animal Farm', 2, '2025-04-18 10:00:00+05:30', '2025-04-18 10:00:00+05:30'),
('Pride and Prejudice', 3, '2025-04-19 10:00:00+05:30', '2025-04-19 10:00:00+05:30'),
('Sense and Sensibility', 3, '2025-04-20 10:00:00+05:30', '2025-04-20 10:00:00+05:30'),
('Harry Potter and the Sorcerer''s Stone', 4, '2025-04-21 10:00:00+05:30', '2025-04-21 10:00:00+05:30'),
('Harry Potter and the Chamber of Secrets', 4, '2025-04-22 10:00:00+05:30', '2025-04-22 10:00:00+05:30'),
('The Adventures of Tom Sawyer', 5, '2025-04-23 10:00:00+05:30', current_timestamp),
('Adventures of Huckleberry Finn', 5, '2025-04-24 10:00:00+05:30', '2025-04-24 10:00:00+05:30'),
('The Old Man and the Sea', 6, '2025-04-25 10:00:00+05:30', '2025-04-25 10:00:00+05:30'),
('For Whom the Bell Tolls', 6, '2025-04-26 10:00:00+05:30', '2025-04-26 10:00:00+05:30'),
('Murder on the Orient Express', 7, '2025-04-27 10:00:00+05:30', '2025-04-27 10:00:00+05:30'),
('The ABC Murders', 7, '2025-04-28 10:00:00+05:30', '2025-04-28 10:00:00+05:30'),
('The Shining', 8, '2025-04-29 10:00:00+05:30', '2025-04-29 10:00:00+05:30'),
('It', 8, '2025-04-30 10:00:00+05:30', '2025-04-30 10:00:00+05:30'),
('Beloved', 9, '2025-05-01 10:00:00+05:30', '2025-05-01 10:00:00+05:30'),
('Song of Solomon', 9, current_timestamp, current_timestamp),
('One Hundred Years of Solitude', 10, '2025-05-03 10:00:00+05:30', '2025-05-03 10:00:00+05:30'),
('Love in the Time of Cholera', 10, '2025-05-04 10:00:00+05:30', '2025-05-04 10:00:00+05:30');

select * from "Authors";
select DISTINCT name from "Authors";

update "Author_books"
set "title" =NULL
where id=1;

alter table "Author_books"
RENAME COLUMN "usedby" to "use";

alter TABLE "Author_books"
add COLUMN usedby VARCHAR(255);

select * from "Author_books";

UPDATE "Author_books"
set "usedby"='User1'
where author_id=2;

insert into "Author_books"(title, author_id, "createdAt", "updatedAt") 
VALUES
('Book1', 1, current_timestamp, current_timestamp)


SELECT * from "Author_books"
where Date("createdAt")=current_date;
 
select a.name,b.title from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id;

select a.name,b.title from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id
where "name" like '%Lee';

select a.name,b.title from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id
where "name" like '%Tw%';

update "Books_name"
set "book_title"='Think and grow rich'
where id=3;

select * from "Author_books"
order by title asc;

select * from "Authors" as a
inner join "Books_name" as b on a.id=b.author_id
where DATE(a."createdAt")= current_date - INTERVAL '1 day';

SELECT a.name, count(b.id) AS book_count
FROM "Authors" a
LEFT JOIN "Books_name" b ON a.id = b.author_id
WHERE a.name = 'Mark Twain'
group by a.name;

-- ORDER BY a.name;

select a.name,count(b.id) as book_count
from "Authors" a
inner join "Books_name" b on a.id=b.author_id
where a.name like '%Lee'
group by a.name;


select a.name,b.book_title from "Authors" as a
inner join "Books_name" as b on a.id=b.author_id
offset 1
limit 3;

-- select * from "Authors";
-- select * from "Author_books"
-- order by "id" asc;

-- alter table "Authors" 
-- add "bookstore" varchar(25)  not null;



select * from "Authors";


select * from "Authors"
where "id" in (1,3,5);

select * from "Author_books"
order by "author_id","title";


select * from "Authors"
where "id" between 1 and 5;

select * from "Authors"
where "name" like '%a%' or "name" like '%h%';

select distinct a.name,b.title as book_title
from "Author_books" b
join "Authors" a on b.author_id = a.id
order by b.title, a.name;

select distinct a.name
from  "Authors" a
order by  a.name;

SELECT id, firstname, lastname
FROM employee
WHERE firstname IN (
    SELECT firstname
    FROM employee
    GROUP BY firstname
    HAVING COUNT(*) > 1
)
ORDER BY firstname, lastname;

SELECT firstname, COUNT(*) AS name_count
FROM employee
GROUP BY firstname
HAVING COUNT(*) > 1
ORDER BY name_count DESC; 


select * from "Author_books"
where "title" like '%and%';


SELECT * from "Author_books"
where Date("createdAt") =CURRENT_DATE - INTERVAL '1 DAY';


SELECT * FROM "Author_books"
where Date("createdAt") BETWEEN '2025-05-01' AND '2025-05-05';

select * from "Author_books"
where Date("createdAt") ='2025-05-01';



SELECT * FROM "Author_books"
WHERE TIME("createdAt") BETWEEN '14:00:00' AND '15:00:00';

SELECT * FROM "Author_books"
WHERE CAST("createdAt" AS date) = '2025-05-06';

SELECT * FROM "Books_name"
WHERE EXTRACT(HOUR FROM "createdAt") = EXTRACT(HOUR FROM CURRENT_TIME);


SELECT a.name ,b.author_id,count(b.title) from "Author_books" as b 
inner join "Authors" a on a.id=b.author_id
GROUP BY b."author_id",a.name
order by a.name
limit 8;


alter table "Author_books"
rename to "Books_name";

alter table "Books_name"
rename column "title" to "book_title";

select * from "Books_name";

SELECT 
    -- EXTRACT(HOUR FROM "createdAt") AS hour_of_day,
    COUNT(*) AS book_count
FROM "Books_name"
WHERE DATE("createdAt") = CURRENT_DATE - INTERVAL '1 day'
-- GROUP BY EXTRACT(HOUR FROM "createdAt")
-- ORDER BY hour_of_day;


  SELECT  distinct first_name
  FROM Customers
  where first_name in(select first_name from Customers
                      group by first_name
                      having count(*) >1)

-- SELECT * FROM "Author_books" WHERE TIME("createdAt") = CURRENT_TIME;
create Table users(
    user_id int PRIMARY KEY NOT NUll,
    user_name varchar(255),
    book_id int ,
    CONSTRAINT foreignkey_book FOREIGN KEY (book_id) REFERENCES "Authors"(id) ON DELETE CASCADE
);

insert into users (user_id,user_name,book_id)
 values (2,'user2',4),
(3,'user3',2);

select * from users;


SELECT a.name, count(b.book_title) from "Authors" a
INNER JOIN "Books_name" b
on a.id = b.author_id
GROUP BY a.name
having a.name='Agatha Christie'




SELECT table1.column1, table2.column2
FROM table_name table1
JOIN table_name table2 ON table1.column = table2.column;
SELECT emp.employee_name AS employee, mng.employee_name AS manager
FROM Employees emp
JOIN Employees mng ON emp.manager_id = mng.employee_id