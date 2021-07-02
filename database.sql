-- log of sql queries used to make and populate table

--add database name: save_koala 

-- query to make table
CREATE TABLE koalaList (
    "id" serial PRIMARY KEY,
    "name" varchar(80) NOT NULL,
    "gender" varchar(30),
    "age" int,
    "ready_to_transfer" boolean,
    "notes" varchar(250) 
);

-- query to populate table
INSERT INTO koalaList ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Scotty', 'M', 4, 'TRUE', 'Born in Guatemala'),
('Jean', 'F', 5, 'TRUE', 'Allergic to lots of lava'),
('Ororo', 'F', 7, 'FALSE', 'Loves listening to Paula Abdul'),
('Logan', 'M', 15, 'FALSE','Loves the sauna'),
('Charlie', 'M', 9, 'TRUE', 'Favorite band is Nirvana'),
('Betsy', 'F', 4, 'TRUE', 'Has a pet iguana');  
