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
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT NOT NULL,
  summary TEXT,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
);




--good
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  reviews_id INTEGER,
  url TEXT,
  FOREIGN KEY (reviews_id) REFERENCES reviews(id)
);


/* /Review/meta api*/

--good
CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name TEXT
);

--good
CREATE TABLE characteristics_review (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value TEXT,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);




-- need to copy the csv data ETL
\COPY reviews FROM './data/reviews.csv' WITH (FORMAT CSV, HEADER);

\COPY photos FROM './data/reviews_photos.csv' WITH (FORMAT CSV, HEADER);

\COPY characteristics FROM './data/characteristics.csv' WITH (FORMAT CSV, HEADER);

\COPY characteristics_review FROM './data/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);

--need to change the format of the data in the reviews table
ALTER TABLE reviews
ALTER COLUMN date TYPE TIMESTAMP
USING (to_timestamp(date::decimal/1000));

--need to change the id colum in reviews TABLE
ALTER TABLE reviews
RENAME COLUMN id TO review_id;

--creating a sequence
CREATE SEQUENCE reviews_review_id_seq
OWNED BY reviews.review_id;

CREATE SEQUENCE photos_id_seq
OWNED BY photos.id;

CREATE SEQUENCE characteristics_id_seq
OWNED BY characteristics.id;

CREATE SEQUENCE characteristics_review_id_seq
OWNED BY characteristics_review.id;

--have to create set val for all the ids
-- SELECT setval ('"reviews_review_id_seq"', (SELECT MAX(review_id) FROM reviews)+1);
-- SELECT setval ('"photos_id_seq"', (SELECT MAX(id) FROM photos)+1);
-- SELECT setval ('"characteristics_id_seq"', (SELECT MAX(id) FROM characteristics)+1);
-- SELECT setval ('"characteristics_review_id_seq"', (SELECT MAX(id) FROM characteristics_review)+1);


--create my index for the important colums

-- /reviews/
/* table reviews, column product_id */
CREATE INDEX reviews_product_id_index ON reviews(product_id);

/* table reviews, column recommend  */
CREATE INDEX reviews_recommend_index ON reviews(recommend);

/* table photos, column review_id  */
CREATE INDEX photos_review_id_index ON photos(reviews_id);

--put req
/* table reviews, column helpfulness DESC <-- decending order  */
CREATE INDEX reviews_helpfulness_index ON reviews(helpfulness DESC);

--based on sort
/* table reviews, column date DESC <-- decending order  */
CREATE INDEX reviews_date_index ON reviews(date DESC);

-- reviews/meta
/* table characteristics, column product_id, want to select * from characteristics where product_id = <REQ PROVIDED> */
CREATE INDEX characteristics_product_id_index ON characteristics(product_id);

/* table characteristics_review, column charactertistics_id,  */
CREATE INDEX characteristics_review_charactertistics_id_index ON characteristics_review(characteristic_id);

