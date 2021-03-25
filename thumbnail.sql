-- Table: public.thumbnails

-- DROP TABLE public.thumbnails;

CREATE TABLE public.thumbnails
(
    id_usuario integer[] NOT NULL,
    nombre character varying(100) COLLATE pg_catalog."default",
    type character varying(100) COLLATE pg_catalog."default",
    src character varying(100) COLLATE pg_catalog."default",
    uploadtime character varying(100)[] COLLATE pg_catalog."default",
    CONSTRAINT thumbnails_pkey PRIMARY KEY (id_usuario)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.thumbnails
    OWNER to postgres;
