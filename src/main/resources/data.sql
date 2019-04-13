/* CREATE TEST CATEGORIES */

INSERT INTO category (id, name) VALUES (1, 'YOGA');
INSERT INTO category (id, name) VALUES (2, 'MEDITATION');
INSERT INTO category (id, name) VALUES (3, 'ART');

/* CREATE TEST SUBCATEGORIES */
INSERT INTO sub_category (id, name, category_id) VALUES (1, 'MATS', 1);
INSERT INTO sub_category (id, name, category_id) VALUES (2, 'BLOCKS', 1);
INSERT INTO sub_category (id, name, category_id) VALUES (3, 'BOLSTERS', 1);
INSERT INTO sub_category (id, name, category_id) VALUES (4, 'CUSHIONS', 2);
INSERT INTO sub_category (id, name, category_id) VALUES (5, 'GONGS', 2);
INSERT INTO sub_category (id, name, category_id) VALUES (6, 'INCENSE', 2);
INSERT INTO sub_category (id, name, category_id) VALUES (7, 'SCULPTURES', 3);
INSERT INTO sub_category (id, name, category_id) VALUES (8, 'PAINTINGS', 3);


/* CREATE TEST PRODUCTS */
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (1, 'Pink yoga mat', 'test-products/yoga-mat-1.jpg', 199, 'Yoga mat', 1);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (2, 'Two yoga mats', 'test-products/yoga-mat-2.jpg', 399, 'Yoga mat', 1);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (3, 'Nice yoga mat Nice yoga mat Nice yoga mat Nice yoga mat', 'test-products/yoga-mat-3.jpg', 199, 'Yoga mat', 1);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (4, 'Very nice yoga mat', 'test-products/yoga-mat-4.jpg', 299, 'Yoga mat', 1);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (5, 'Comfy yoga bolster', 'test-products/yoga-bolster-1.png', 399, 'Yoga bolster', 3);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (6, 'Comfier yoga bolster', 'test-products/yoga-bolster-1.jpg', 499, 'Yoga bolster', 3);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (7, 'Two yoga blocks', 'test-products/yoga-block-1.jpg', 359, 'Yoga blocks', 2);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (8, 'Blue yoga block', 'test-products/yoga-block-2.jpg', 299, 'Yoga block', 2);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (9, 'Grey yoga block', 'test-products/yoga-block-3.jpg', 199, 'Yoga block', 2);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (10, 'Premium yoga block', 'test-products/yoga-block-4.jpg', 299, 'Yoga block', 2);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (11, 'Pink meditation cushion', 'test-products/meditation-1.jpg', 659, 'Cushion', 4);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (12, 'Blue meditation cushion', 'test-products/meditation-2.jpg', 659, 'Cushion', 4);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (13, 'Meditation gong', 'test-products/meditation-gong-1.jpg', 179, 'Gong', 5);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (14, 'Meditation gong', 'test-products/meditation-gong-2.jpg', 259, 'Gong', 5);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (15, 'Meditation gong', 'test-products/meditation-gong-3.jpg', 299, 'Gong', 5);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (16, 'Incense 1', 'test-products/incense-1.jpg', 299, 'Incense', 6);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (17, 'Incense 2', 'test-products/incense-2.jpg', 299, 'Incense', 6);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (18, 'Incense 3', 'test-products/incense-3.jpg', 299, 'Incense', 6);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (19, 'Beads 1', 'test-products/beads-1.jpg', 299, 'Beads', 6);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (20, 'Beads 2', 'test-products/beads-2.jpg', 299, 'Beads', 6);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (21, 'Beads 3', 'test-products/beads-3.jpg', 299, 'Beads', 6);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (22, 'Buddha 1', 'test-products/buddha-1.jpg', 299, 'Buddha', 7);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (23, 'Buddha 2', 'test-products/buddha-2.jpg', 299, 'Buddha', 7);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (24, 'Buddha 3', 'test-products/buddha-3.jpg', 299, 'Buddha', 7);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (25, 'Buddha Painting 1', 'test-products/buddha-painting-1.jpg', 299, 'Buddha painting', 8);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (26, 'Buddha Painting 2', 'test-products/buddha-painting-2.jpg', 299, 'Buddha painting', 8);
INSERT INTO product (id, description, imageurl, price, title, sub_category) VALUES (27, 'Buddha Painting 3', 'test-products/buddha-painting-3.jpg', 299, 'Buddha painting', 8);














