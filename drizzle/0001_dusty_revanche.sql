CREATE TABLE IF NOT EXISTS "notifications" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notifications_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"message" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "notifications_email_unique" UNIQUE("email")
);
