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

select * from "Author_books";

select a.name,b.title from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id;

select a.name,b.title from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id
where "name" like '%Lee';

select a.name,b.title from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id
where "name" like '%Tw%';

update "Author_books"
set "title"='Think and grow rich'
where id=3;

select * from "Author_books"
order by title asc;

select * from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id
where DATE(a."createdAt")= current_date;

SELECT a.name, count(b.id) AS book_count
FROM "Authors" a
LEFT JOIN "Author_books" b ON a.id = b.author_id
WHERE a.name = 'Mark Twain'
GROUP BY a.name;
-- ORDER BY a.name;

select a.name,count(b.id) as book_count
from "Authors" a
inner join "Author_books" b on a.id=b.author_id
where a.name like '%Lee'
group by a.name;


select a.name,b.title from "Authors" as a
inner join "Author_books" as b on a.id=b.author_id
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


