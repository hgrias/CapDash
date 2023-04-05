import { useSession } from "next-auth/react";
import Avatar from "../avatar";
import React from "react";

interface CreateNoteFooterProps {
  imageUri?: String;
}

const CreateNoteFooter = ({ imageUri }: CreateNoteFooterProps) => {
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
    <div className="flex flex-1 flex-col rounded-bl-lg rounded-br-lg bg-gray-50 py-5 px-4">
      <div className="flex">
        <div className="hidden h-12 w-12 sm:block">
          <Avatar name={name} type="USER" imageUri={image} />
        </div>
        <div className="flex w-full sm:pl-4">
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
