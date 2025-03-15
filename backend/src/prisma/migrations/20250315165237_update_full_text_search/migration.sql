DROP INDEX IF EXISTS product_search_idx;

CREATE INDEX product_search_idx ON "Products"
USING GIN (to_tsvector('english', title || ' ' || description));
