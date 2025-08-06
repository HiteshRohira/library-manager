--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    genre character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.genres ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: books; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(512),
    author character varying(512),
    publisher character varying(512),
    publish_date date,
    pages integer,
    description text,
    image character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: books_genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.books_genres (
    id integer NOT NULL,
    book_id integer,
    genre_id integer
);


--
-- Name: books_genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.books_genres ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.books_genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.books ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    password character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.genres (id, genre, created_at, updated_at) FROM stdin;
1	Comedy	2022-09-23 00:00:00	2022-09-23 00:00:00
2	Sci-Fi	2022-09-23 00:00:00	2022-09-23 00:00:00
3	Horror	2022-09-23 00:00:00	2022-09-23 00:00:00
4	Romance	2022-09-23 00:00:00	2022-09-23 00:00:00
5	Action	2022-09-23 00:00:00	2022-09-23 00:00:00
6	Thriller	2022-09-23 00:00:00	2022-09-23 00:00:00
7	Drama	2022-09-23 00:00:00	2022-09-23 00:00:00
8	Mystery	2022-09-23 00:00:00	2022-09-23 00:00:00
9	Crime	2022-09-23 00:00:00	2022-09-23 00:00:00
10	Animation	2022-09-23 00:00:00	2022-09-23 00:00:00
11	Adventure	2022-09-23 00:00:00	2022-09-23 00:00:00
12	Fantasy	2022-09-23 00:00:00	2022-09-23 00:00:00
13	Superhero	2022-09-23 00:00:00	2022-09-23 00:00:00
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.books (id, title, author, publisher, publish_date, pages, description, image, created_at, updated_at) FROM stdin;
1	Dune	Frank Herbert	Penguin USA	2023-04-19	298	Some book about sand or smthn, idk	https://example.com/dune.jpg	2022-09-23 00:00:00	2022-09-23 00:00:00
2	1984	George Orwell	Secker & Warburg	1949-06-08	328	A dystopian social science fiction novel	https://example.com/1984.jpg	2022-09-23 00:00:00	2022-09-23 00:00:00
3	The Hobbit	J.R.R. Tolkien	Allen & Unwin	1968-01-01	310	A fantasy novel and children's book	https://example.com/hobbit.png	2022-09-23 00:00:00	2022-09-23 00:00:00
4	The Catcher in the Rye	J.D. Salinger	Little, Brown and Company	1951-07-01	277	A story about teenage angst and alienation	https://example.com/catcher.jpg	2022-09-23 00:00:00	2022-09-23 00:00:00
5	Fahrenheit 451	Ray Bradbury	Ballantine Books	1953-08-15	249	A novel about censorship and book burning	https://example.com/fahrenheit451.jpg	2022-09-23 00:00:00	2022-09-23 00:00:00
\.



--
-- Data for Name: books_genres; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.books_genres (id, book_id, genre_id) FROM stdin;
1	1	2
2	1	12
3	2	2
4	2	7
5	2	6
6	3	12
7	3	11
8	4	7
9	5	2
10	5	7
11	5	6
\.



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, first_name, last_name, email, password, created_at, updated_at) FROM stdin;
1	Admin	User	admin@example.com	$2a$14$wVsaPvJnJJsomWArouWCtusem6S/.Gauq/GjOIEHpyh2DAMmso1wy	2022-09-23 00:00:00	2022-09-23 00:00:00
\.


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_id_seq', 13, true);


--
-- Name: books_genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.books_genres_id_seq', 11, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.books_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: books_genres books_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.books_genres
    ADD CONSTRAINT books_genres_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: books_genres books_genres_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.books_genres
    ADD CONSTRAINT books_genres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: books_genres books_genres_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.books_genres
    ADD CONSTRAINT books_genres_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
