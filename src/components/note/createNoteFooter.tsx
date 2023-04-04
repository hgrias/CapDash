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
    <div className="flex flex-1 flex-col rounded-bl-lg rounded-br-lg bg-slate-50 py-5 px-4">
      <div className="flex">
        <div id="userAvatar" className="avatar h-12 w-12">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-focus text-neutral-content">
            <img
              src={image}
              alt="User Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex w-full pl-4">
          <textarea
            id="noteContent"
            className="textarea-bordered textarea h-28 w-full resize-y"
            placeholder="Add a note"
            style={{ resize: "vertical" }}
          ></textarea>
        </div>
      </div>
      <div className="ml-auto">
        <div className="btn-sm btn mt-3 sm:btn">Add Note</div>
      </div>
    </div>
  );
};

export default CreateNoteFooter;
