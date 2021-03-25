-- Table: public.usuarios

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios
(
    id_usuarios integer NOT NULL DEFAULT nextval('usuarios_id_usuarios_seq'::regclass),
    usuario character varying(50) COLLATE pg_catalog."default",
    nombre character varying(50) COLLATE pg_catalog."default",
    apellido character varying(50) COLLATE pg_catalog."default",
    correo character varying(80) COLLATE pg_catalog."default",
    telefono character varying(20) COLLATE pg_catalog."default",
    pass character varying COLLATE pg_catalog."default",
    edad character varying COLLATE pg_catalog."default",
    ubicacion character varying COLLATE pg_catalog."default",
    "genero " character varying COLLATE pg_catalog."default",
    CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuarios)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.usuarios
    OWNER to postgres;
