CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX product_search_idx ON "Product"
USING GIN (to_tsvector('english', title|| ' ' || description));