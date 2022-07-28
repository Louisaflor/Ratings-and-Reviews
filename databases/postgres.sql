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




-- need to copy the csv data ETL
\COPY reviews FROM './data/reviews.csv' WITH (FORMAT CSV, HEADER);

\COPY photos FROM './data/reviews_photos.csv' WITH (FORMAT CSV, HEADER);

\COPY characteristics FROM './data/characteristics.csv' WITH (FORMAT CSV, HEADER);

\COPY characteristics_review FROM './data/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);

--need to change the format of the data in the reviews table
ALTER TABLE review
ALTER COLUMN review_date TYPE TIMESTAMP
USING (to_timestamp(review_date::decimal/1000));

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

