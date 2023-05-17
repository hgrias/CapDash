import { Note as NoteComponent } from "~/components/note/note";
import { type Interaction } from "@prisma/client";
import type { RouterOutputs } from "~/utils/api";
import { Header } from "~/components/header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Error from "next/error";
import Head from "next/head";

// Get types from router outputs
type notesType = RouterOutputs["tag"]["getNotes"];

const TagPage: NextPage = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [tagName, setTagName] = useState<string>("");
  const [notes, setNotes] = useState<notesType>([]);

  const tagId = useRouter().query.id as string;
  const { status } = useSession();

  const { data: tagData, error: tagError } = api.tag.get.useQuery(
    {
      tagId: parseInt(tagId),
    },
    {
      enabled: !!tagId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: noteData, error: notesError } = api.tag.getNotes.useQuery(
    {
      tagId: parseInt(tagId),
    },
    {
      enabled: !!tagId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: interactionData, error: interactionError } =
    api.tag.getInteractions.useQuery(
      {
        tagId: parseInt(tagId),
      },
      {
        enabled: !!tagId,
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    if (tagData) {
      setTagName(tagData.name);
    }
    if (noteData) {
      setNotes(noteData);
    }
    if (interactionData) {
      setInteractions(interactionData);
    }
  }, [tagData, noteData, interactionData]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  if (tagError) {
    return <Error statusCode={404} title="Tag Not Found" />;
  }

  return (
    <>
      <Head>
        <title>CapDash | {tagName}</title>
        <meta name="CapDash" content="Organization Tag Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="w-full p-4">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-center text-3xl font-bold">{tagName}</h1>
          </div>
          <div>
            {notes
              ? notes.map((note) => (
                  <NoteComponent
                    key={note.id}
                    noteId={note.id}
                    content={note.content}
                    creatorName={note.user.name}
                    creatorImage={note.user.image}
                    createdAt={note.createdAt}
                    creatorId={note.user.id}
                    tags={note.tags}
                  />
                ))
              : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default TagPage;
