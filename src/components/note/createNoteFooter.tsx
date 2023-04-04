import { useSession } from "next-auth/react";
import React from "react";

interface CreateNoteFooterProps {
  imageUri?: String;
}

const CreateNoteFooter = ({ imageUri }: CreateNoteFooterProps) => {
  // TODO: Determine if this is the best spot to do this?
  // Maybe create own avatar component which determines whether or not to use Initials or Image
  const session = useSession();
  const image = session.data?.user.image?.toString();

  return (
    <div className="flex rounded-bl-lg rounded-br-lg bg-slate-50 p-4">
      <div id="userAvatar" className="avatar">
        <div className="h-12 w-12 rounded-full bg-neutral-focus text-neutral-content">
          <img src={image} />
        </div>
      </div>

      <div className="flex h-24 w-full pl-4">
        <textarea
          id="noteContent"
          className="textarea-bordered textarea w-full"
          placeholder="Add a note"
        ></textarea>
      </div>
    </div>
  );
};

export default CreateNoteFooter;
