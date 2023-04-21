create type "public"."InteractionMethod" as enum ('meeting', 'email', 'phone', 'text', 'hearing', 'testify');

create type "public"."LegislatorRole" as enum ('Sen', 'Rep');

create sequence "public"."Interaction_id_seq";

create sequence "public"."Note_id_seq";

create sequence "public"."Tag_id_seq";

alter type "public"."Party" rename to "Party__old_version_to_be_dropped";

create type "public"."Party" as enum ('D', 'R', 'I', 'G', 'L', 'N');

alter type "public"."State" rename to "State__old_version_to_be_dropped";

create type "public"."State" as enum ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

create table "public"."Account" (
    "id" text not null,
    "userId" text not null,
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text
);


create table "public"."Interaction" (
    "createdBy" text not null,
    "legislatorId" text not null,
    "content" text not null,
    "sessionId" integer not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "actionNeeded" boolean not null default false,
    "organizationId" text not null,
    "noteId" integer,
    "id" integer not null default nextval('"Interaction_id_seq"'::regclass),
    "method" "InteractionMethod" not null
);


create table "public"."LegislativeSession" (
    "id" integer not null,
    "active" boolean not null default false,
    "state" "State" not null,
    "archived" boolean not null default false,
    "sessionName" text,
    "sessionTag" text,
    "sessionTitle" text,
    "sineDie" boolean not null default false,
    "special" boolean not null default false,
    "yearEnd" integer not null,
    "yearStart" integer not null,
    "legislatorId" text,
    "organizationId" text
);


create table "public"."Legislator" (
    "id" text not null,
    "firstName" text not null,
    "lastName" text not null,
    "state" "State" not null,
    "party" "Party" not null,
    "district" text not null,
    "imageUri" text,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "currentSessionId" integer not null,
    "organizationId" text not null,
    "legiscanId" integer,
    "personHash" text,
    "role" "LegislatorRole" not null,
    "capitolAddress" text,
    "capitolOfficeNumber" text,
    "capitolWebsiteUrl" text,
    "chamberWebsiteUrl" text,
    "districtAddress" text,
    "email" text,
    "nickName" text,
    "phone" text,
    "websiteUrl" text
);


create table "public"."Note" (
    "id" integer not null default nextval('"Note_id_seq"'::regclass),
    "content" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "createdBy" text not null,
    "legislatorId" text not null,
    "parentNoteId" integer
);


create table "public"."Organization" (
    "id" text not null,
    "name" text not null,
    "slug" text not null,
    "websiteUrl" text,
    "imageUri" text
);


create table "public"."Session" (
    "id" text not null,
    "sessionToken" text not null,
    "userId" text not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."Staffer" (
    "id" text not null,
    "name" text not null,
    "email" text not null,
    "phone" text not null,
    "position" text not null default 'Staffer'::text,
    "legislatorId" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP
);


create table "public"."Tag" (
    "id" integer not null default nextval('"Tag_id_seq"'::regclass),
    "name" text not null,
    "organizationId" text not null
);


create table "public"."User" (
    "id" text not null,
    "name" text not null,
    "email" text not null,
    "emailVerified" timestamp(3) without time zone,
    "image" text,
    "organizationId" text
);


create table "public"."VerificationToken" (
    "identifier" text not null,
    "token" text not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."_InteractionTags" (
    "A" integer not null,
    "B" integer not null
);


create table "public"."_NoteTags" (
    "A" integer not null,
    "B" integer not null
);


create table "public"."_prisma_migrations" (
    "id" character varying(36) not null,
    "checksum" character varying(64) not null,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) not null,
    "logs" text,
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone not null default now(),
    "applied_steps_count" integer not null default 0
);


drop type "public"."Party__old_version_to_be_dropped";

drop type "public"."State__old_version_to_be_dropped";

alter sequence "public"."Interaction_id_seq" owned by "public"."Interaction"."id";

alter sequence "public"."Note_id_seq" owned by "public"."Note"."id";

alter sequence "public"."Tag_id_seq" owned by "public"."Tag"."id";

drop type "public"."Chamber";

drop type "public"."InteractionType";

drop type "public"."LegislativeSessionType";

CREATE UNIQUE INDEX "Account_pkey" ON public."Account" USING btree (id);

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");

CREATE INDEX "Interaction_organizationId_idx" ON public."Interaction" USING btree ("organizationId");

CREATE UNIQUE INDEX "Interaction_pkey" ON public."Interaction" USING btree (id);

CREATE UNIQUE INDEX "LegislativeSession_id_state_organizationId_key" ON public."LegislativeSession" USING btree (id, state, "organizationId");

CREATE UNIQUE INDEX "LegislativeSession_pkey" ON public."LegislativeSession" USING btree (id);

CREATE INDEX "Legislator_organizationId_idx" ON public."Legislator" USING btree ("organizationId");

CREATE UNIQUE INDEX "Legislator_pkey" ON public."Legislator" USING btree (id);

CREATE UNIQUE INDEX "Legislator_role_state_district_organizationId_key" ON public."Legislator" USING btree (role, state, district, "organizationId");

CREATE UNIQUE INDEX "Note_pkey" ON public."Note" USING btree (id);

CREATE UNIQUE INDEX "Organization_pkey" ON public."Organization" USING btree (id);

CREATE UNIQUE INDEX "Organization_slug_key" ON public."Organization" USING btree (slug);

CREATE UNIQUE INDEX "Session_pkey" ON public."Session" USING btree (id);

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");

CREATE UNIQUE INDEX "Staffer_pkey" ON public."Staffer" USING btree (id);

CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);

CREATE UNIQUE INDEX "Tag_pkey" ON public."Tag" USING btree (id);

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);

CREATE INDEX "User_organizationId_idx" ON public."User" USING btree ("organizationId");

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);

CREATE UNIQUE INDEX "_InteractionTags_AB_unique" ON public."_InteractionTags" USING btree ("A", "B");

CREATE INDEX "_InteractionTags_B_index" ON public."_InteractionTags" USING btree ("B");

CREATE UNIQUE INDEX "_NoteTags_AB_unique" ON public."_NoteTags" USING btree ("A", "B");

CREATE INDEX "_NoteTags_B_index" ON public."_NoteTags" USING btree ("B");

CREATE UNIQUE INDEX _prisma_migrations_pkey ON public._prisma_migrations USING btree (id);

alter table "public"."Account" add constraint "Account_pkey" PRIMARY KEY using index "Account_pkey";

alter table "public"."Interaction" add constraint "Interaction_pkey" PRIMARY KEY using index "Interaction_pkey";

alter table "public"."LegislativeSession" add constraint "LegislativeSession_pkey" PRIMARY KEY using index "LegislativeSession_pkey";

alter table "public"."Legislator" add constraint "Legislator_pkey" PRIMARY KEY using index "Legislator_pkey";

alter table "public"."Note" add constraint "Note_pkey" PRIMARY KEY using index "Note_pkey";

alter table "public"."Organization" add constraint "Organization_pkey" PRIMARY KEY using index "Organization_pkey";

alter table "public"."Session" add constraint "Session_pkey" PRIMARY KEY using index "Session_pkey";

alter table "public"."Staffer" add constraint "Staffer_pkey" PRIMARY KEY using index "Staffer_pkey";

alter table "public"."Tag" add constraint "Tag_pkey" PRIMARY KEY using index "Tag_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."_prisma_migrations" add constraint "_prisma_migrations_pkey" PRIMARY KEY using index "_prisma_migrations_pkey";

alter table "public"."Account" add constraint "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Account" validate constraint "Account_userId_fkey";

alter table "public"."Interaction" add constraint "Interaction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Interaction" validate constraint "Interaction_createdBy_fkey";

alter table "public"."Interaction" add constraint "Interaction_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Interaction" validate constraint "Interaction_legislatorId_fkey";

alter table "public"."Interaction" add constraint "Interaction_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Interaction" validate constraint "Interaction_noteId_fkey";

alter table "public"."Interaction" add constraint "Interaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Interaction" validate constraint "Interaction_organizationId_fkey";

alter table "public"."LegislativeSession" add constraint "LegislativeSession_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."LegislativeSession" validate constraint "LegislativeSession_legislatorId_fkey";

alter table "public"."LegislativeSession" add constraint "LegislativeSession_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."LegislativeSession" validate constraint "LegislativeSession_organizationId_fkey";

alter table "public"."Legislator" add constraint "Legislator_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Legislator" validate constraint "Legislator_organizationId_fkey";

alter table "public"."Note" add constraint "Note_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Note" validate constraint "Note_createdBy_fkey";

alter table "public"."Note" add constraint "Note_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Note" validate constraint "Note_legislatorId_fkey";

alter table "public"."Note" add constraint "Note_parentNoteId_fkey" FOREIGN KEY ("parentNoteId") REFERENCES "Note"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Note" validate constraint "Note_parentNoteId_fkey";

alter table "public"."Session" add constraint "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Session" validate constraint "Session_userId_fkey";

alter table "public"."Staffer" add constraint "Staffer_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Staffer" validate constraint "Staffer_legislatorId_fkey";

alter table "public"."Tag" add constraint "Tag_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Tag" validate constraint "Tag_organizationId_fkey";

alter table "public"."User" add constraint "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."User" validate constraint "User_organizationId_fkey";

alter table "public"."_InteractionTags" add constraint "_InteractionTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Interaction"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."_InteractionTags" validate constraint "_InteractionTags_A_fkey";

alter table "public"."_InteractionTags" add constraint "_InteractionTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."_InteractionTags" validate constraint "_InteractionTags_B_fkey";

alter table "public"."_NoteTags" add constraint "_NoteTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Note"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."_NoteTags" validate constraint "_NoteTags_A_fkey";

alter table "public"."_NoteTags" add constraint "_NoteTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."_NoteTags" validate constraint "_NoteTags_B_fkey";



