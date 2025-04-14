--create table 
CREATE TABLE STUDENT (
    id INTEGER primary key,
    name VARCHAR(50) not null,
    age INTEGER,
    email VARCHAR(100),
    dob DATE,
    city VARCHAR(50),
    gender VARCHAR(10),
)

--insert values into table
INSERT INTO STUDENT (
  id, name, age, email, dob, city, gender) 
  VALUES(1, 'Swetha', 20, 'swetha@gmail.com', '2003-05-10', 'Ooty', 'Female'),
    (2, 'Emma Johnson', 19, 'emma.j@example.com', '2004-08-22', 'Los Angeles', 'Female'),
    (3, 'Michael Chen', 21, 'michael.chen@example.com', '2002-03-10', 'Chicago', 'Male'),    
    (4, 'Sarah Davis', 22, 'sarah.davis@example.com', '2001-11-30', 'Houston', 'Female'),
    (5, 'David Patel', 20, 'david.p@example.com', '2003-07-04', 'Miami', 'Male'),
    (6, 'Lisa Brown', 19, 'lisa.brown@example.com', '2004-01-25', 'Seattle', 'Female'),
    (7, 'James Wilson', 23, 'james.w@example.com', '2000-09-12', 'Boston', 'Male'),
    (8, 'Olivia Taylor', 21, 'olivia.t@example.com', '2002-06-18', 'San Francisco', 'Female'),
    (9, 'William Lee', 20, 'will.lee@example.com', '2003-12-05', 'Austin', 'Male'),
    (10, 'Sophia Martinez', 22, 'sophia.m@example.com', '2001-04-09', 'Denver', 'Female');


CREATE TABLE PROJECTS (
    student_id INT,
    project_id INT not null,
    project_name VARCHAR(50) unique and not null,
    sdate DATE,
    edate DATE,
    PRIMARY KEY (student_id, project_id), 
    FOREIGN KEY (student_id) REFERENCES STUDENT(id)
);

INSERT INTO PROJECTS (student_id, project_id, project_name, sdate, edate) VALUES
(1, 101, 'Database Design', '2025-01-10', '2025-03-15'),
(2, 102, 'Web Development', '2025-02-01', '2025-04-30'),
(3, 201, 'Machine Learning', '2025-01-15', '2025-05-20'),
(4, 301, 'Data Analysis', '2025-03-01', '2025-06-10'),
(5, 401, 'Mobile App', '2025-02-10', '2025-07-15'),
(6, 501, 'Cloud Computing', '2025-01-20', '2025-04-25'),
(7, 601, 'Cybersecurity', '2025-03-05', '2025-05-30'),
(8, 701, 'AI Research', '2025-02-15', '2025-06-20'),
(9, 801, 'Game Development', '2025-01-25', '2025-05-10'),
(10, 901, 'Blockchain', '2025-03-10', '2025-07-01');

ALTER TABLE PROJECTS ADD COLUMN student_id int;

UPDATE STUDENT SET student_id = 
    CASE project_id
        WHEN 101 THEN 1
        WHEN 102 THEN 2
        WHEN 201 THEN 3
        WHEN 301 THEN 4
        WHEN 401 THEN 5
        WHEN 501 THEN 6
        WHEN 601 THEN 7
        WHEN 701 THEN 8
        WHEN 801 THEN 9
        WHEN 901 THEN 10
    END;

--view table
select * from STUDENT;

--modifying table
Alter table STUDENT ADD dept VARCHAR(50);
Alter table STUDENT
ADD Primary key (id);

--updating values
Update STUDENT set email='swethabellan@gmail.com' where id=1;

-- Truncate table STUDENT;

--delete record
delete from STUDENT where id=10;

--aggregate functions:
--count
select count(*) from student;

--sum
select sum(age) from student;

--average
select avg(age) from student;
select avg(age::decimal) from student;
select avg(age::float) from student;
select round(avg(age)) from student;
select round(avg(age::decimal),2) from student;

--minimum
select min(age) from student;

select min(dob) from student;

--maximum
select max(age) from student;

--primary key
Alter table STUDENT 
Drop Primary key;

Alter table student
ADD primary key (id);


--inner join:
select s.id,s.name,p.project_id,p.project_name
from student s
inner join PROJECTS p
on s.id=p.student_id;

--left join
select s.id,s.name,p.project_id,p.project_name
from student s
left join PROJECTS p
on s.id=p.student_id
order by s.id,p.project_id

--cross jpin
SELECT s.id, s.name, p.project_id, p.project_name
FROM STUDENT s
CROSS JOIN PROJECTS p
ORDER BY s.id, p.project_id
LIMIT 5;

--self join
SELECT s1.id AS id1, s1.name AS name1, s2.id AS id2, s1.city
FROM STUDENT s1
INNER JOIN STUDENT s2
ON s1.city = s2.city
AND s1.id = s2.id
ORDER BY s1.city;

