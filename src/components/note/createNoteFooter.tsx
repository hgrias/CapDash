import { useSession } from "next-auth/react";
import CreateNoteForm from "./createNoteForm";
import Avatar from "../avatar";
import React from "react";

const CreateNoteFooter = () => {
  // TODO: Determine if this is the best spot to do this?
  // Maybe create own avatar component which determines whether or not to use Initials or Image
  const session = useSession();
  const image = session.data?.user.image?.toString();
  // TODO: See if there is anything i can do to make this cleaner
  let name = "A Z";
  if (session.data?.user.name) {
    name = session.data.user.name.toString();
  }

  return (
    <div className="flex rounded-bl-lg rounded-br-lg bg-gray-50 py-5 px-4">
      <div className="hidden h-12 w-12 sm:block">
        <Avatar name={name} type="USER" imageUri={image} />
      </div>
      <CreateNoteForm />
    </div>
  );
};

export default CreateNoteFooter;
