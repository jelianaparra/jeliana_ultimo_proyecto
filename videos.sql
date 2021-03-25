-- Table: public.videos

-- DROP TABLE public.videos;

CREATE TABLE public.videos
(
    type character varying(100)[] COLLATE pg_catalog."default",
    src character varying(100)[] COLLATE pg_catalog."default",
    "nombre " character varying(100)[] COLLATE pg_catalog."default",
    id_usuario integer[] NOT NULL,
    uploadtime character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT videos_pkey PRIMARY KEY (id_usuario)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.videos
    OWNER to postgres;
