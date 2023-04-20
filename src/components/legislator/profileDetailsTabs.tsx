import React, { useState } from "react";
import LegislatorInformation from "./legislatorInformation";
import { useProfileContext } from "../profileContext";
import StafferInformation from "./stafferInformation";

interface profileDetailsTabsProps {
  committees?: []; // TODO: Add committees model
}

const ProfileDetailsTabs = ({}: profileDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("legislatorInfo");

  const { legislator, staffers } = useProfileContext();
  if (!legislator) {
    return null;
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "legislatorInfo":
        return <LegislatorInformation />;
      case "stafferInfo":
        if (staffers.length) {
          return <StafferInformation staffers={staffers} />;
        } else {
          return (
            <div className="w-full rounded-lg bg-white shadow-lg">
              No staffers found. Add them here!
            </div>
          );
        }
      case "committees":
        return (
          <div className="h-32 w-full rounded-lg bg-white p-4 shadow-lg">
            No committees found. Add them here!
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabs">
      <a
        className={`tab-lifted tab border-none sm:tab-lg ${
          activeTab === "legislatorInfo" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("legislatorInfo")}
      >
        Information
      </a>
      <a
        className={`tab-lifted tab border-none sm:tab-lg ${
          activeTab === "stafferInfo" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("stafferInfo")}
      >
        Staffers
      </a>
      <a
        className={`tab-lifted tab border-none sm:tab-lg ${
          activeTab === "committees" ? "tab-active" : ""
        }`}
        onClick={() => handleTabClick("committees")}
      >
        Committees
      </a>
      {renderTabContent()}
    </div>
  );
};

export default ProfileDetailsTabs;
