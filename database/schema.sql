set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

-- CREATE TABLE "barber" (
--	"barberId" serial NOT NULL,
--	"username" TEXT NOT NULL,
--	"password" TEXT NOT NULL,
--	CONSTRAINT "barber_pk" PRIMARY KEY ("barberId")
-- ) WITH (
--  OIDS=FALSE
-- );

CREATE TABLE "posts" (
	"postId" serial NOT NULL,
	-- "barberId" int NOT NULL,
	"name" TEXT NOT NULL,
	"phoneNumber" TEXT NOT NULL,
	"barberName" TEXT NOT NULL,
	"isCompleted" BOOLEAN NOT NULL DEFAULT 'false',
	"createdAt" timestamptz(6) NOT NULL DEFAULT now(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("barberId") REFERENCES "barber"("barberId");
