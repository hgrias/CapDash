import { type NextPage } from "next";
import { Header } from "~/components/header";
import NewLegislatorForm from "~/components/legislator/newLegislatorForm";

const CreateLegislatorPage: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        <NewLegislatorForm />
      </div>
    </>
  );
};

export default CreateLegislatorPage;
