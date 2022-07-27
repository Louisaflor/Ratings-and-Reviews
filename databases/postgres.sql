DROP DATABASE IF EXISTS postgres_louisa;
CREATE DATABASE postgres_louisa;

DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS characteristics_review CASCADE;

/**use `postgres-louisa`; */


/* /Review/ api*/

--updated reviews
CREATE TABLE reviews (
  id SERIAL UNIQUE NOT NULL,
  product_id INTEGER,
  rating INTEGER,
  date TEXT,
  summary TEXT,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
);

--removed b/c i feel like we dont need right now
-- CREATE TABLE results (
--   id SERIAL UNIQUE NOT NULL,
--   reviewss_id INTEGER,
--   review_id INTEGER,
--   rating INTEGER,
--   summary TEXT,
--   recommend BOOLEAN NOT NULL,
--   response TEXT,
--   body TEXT NOT NULL,
--   date DATE,
--   reviewer_name TEXT NOT NULL,
--   helpfulness INTEGER,
--   FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
-- );

--good
CREATE TABLE photos (
  id SERIAL UNIQUE NOT NULL,
  reviews_id INTEGER,
  url TEXT,
  UNIQUE (id),
  FOREIGN KEY (reviews_id) REFERENCES reviews(id)
);


/* /Review/meta api*/

--good
CREATE TABLE characteristics (
  id SERIAL UNIQUE NOT NULL,
  product_id INTEGER,
  name TEXT
);

--good
CREATE TABLE characteristics_review (
  id SERIAL UNIQUE NOT NULL,
  characteristic_id INTEGER,
  review_id INTEGER,
  value TEXT,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

/* /Characteristics removed for now... maybe will use to be mroe organized*/
-- CREATE TABLE comfort (
--   id SERIAL UNIQUE NOT NULL,
--   reviewss_id INTEGER,
--   id_character INTEGER,
--   value TEXT,
--   UNIQUE (id_character),
--   FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
-- );

-- CREATE TABLE fit (
--   id SERIAL UNIQUE NOT NULL,
--   reviewss_id INTEGER,
--   id_character INTEGER,
--   value TEXT,
--   UNIQUE (id_character),
--   FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
-- );

-- CREATE TABLE length (
--   id SERIAL UNIQUE NOT NULL,
--   reviewss_id INTEGER,
--   id_character INTEGER,
--   value TEXT,
--   UNIQUE (id_character),
--   FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
-- );

-- CREATE TABLE quality (
--   id SERIAL UNIQUE NOT NULL,
--   reviewss_id INTEGER,
--   id_character INTEGER,
--   value TEXT,
--   UNIQUE (id_character),
--   FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
-- );


-- need to copy the csv data
\COPY reviews FROM './data/reviews.csv' WITH (FORMAT CSV, HEADER);
\COPY photos FROM './data/reviews_photos.csv' WITH (FORMAT CSV, HEADER);
\COPY characteristics FROM './data/characteristics.csv' WITH (FORMAT CSV, HEADER);
\COPY characteristics_review FROM './data/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);