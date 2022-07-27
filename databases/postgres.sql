DROP DATABASE IF EXISTS postgres_louisa;
CREATE DATABASE postgres_louisa;


/**use `postgres-louisa`; */


/* /Review/ api*/
CREATE TABLE reviews (
  id SERIAL UNIQUE NOT NULL,
  product INTEGER,
  page INTEGER,
  count INTEGER,
  UNIQUE(product)
);

CREATE TABLE results (
  id SERIAL UNIQUE NOT NULL,
  reviewss_id INTEGER,
  review_id INTEGER,
  rating INTEGER,
  summary TEXT,
  recommend BOOLEAN NOT NULL,
  response TEXT,
  body TEXT NOT NULL,
  date DATE,
  reviewer_name TEXT NOT NULL,
  helpfulness INTEGER,
  FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
);

CREATE TABLE photos (
  id SERIAL UNIQUE NOT NULL,
  results_id INTEGER,
  photo_id INTEGER,
  url TEXT,
  UNIQUE (photo_id),
  FOREIGN KEY (results_id) REFERENCES results(id)
);


/* /Review/meta api*/

CREATE TABLE ratings (
  id SERIAL UNIQUE NOT NULL,
  reviewss_id INTEGER,
  one INTEGER,
  two INTEGER,
  three INTEGER,
  four INTEGER,
  five INTEGER,
  FOREIGN KEY (reviewss_id) REFERENCES reviews(product)

);

CREATE TABLE recommend (
  id SERIAL UNIQUE NOT NULL,
  reviewss_id INTEGER,
  trues BOOLEAN,
  falses BOOLEAN,
  FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
);

/* /Characteristics*/
CREATE TABLE comfort (
  id SERIAL UNIQUE NOT NULL,
  reviewss_id INTEGER,
  id_character INTEGER,
  value TEXT,
  UNIQUE (id_character),
  FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
);

CREATE TABLE fit (
  id SERIAL UNIQUE NOT NULL,
  reviewss_id INTEGER,
  id_character INTEGER,
  value TEXT,
  UNIQUE (id_character),
  FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
);

CREATE TABLE length (
  id SERIAL UNIQUE NOT NULL,
  reviewss_id INTEGER,
  id_character INTEGER,
  value TEXT,
  UNIQUE (id_character),
  FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
);

CREATE TABLE quality (
  id SERIAL UNIQUE NOT NULL,
  reviewss_id INTEGER,
  id_character INTEGER,
  value TEXT,
  UNIQUE (id_character),
  FOREIGN KEY (reviewss_id) REFERENCES reviews(product)
);

