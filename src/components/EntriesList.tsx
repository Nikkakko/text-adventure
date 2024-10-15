"use cliient";
import { useQuery } from "convex/react";
import * as React from "react";
import { api } from "../../convex/_generated/api";

interface EntriesListProps {}

const EntriesList: React.FC<EntriesListProps> = ({}) => {
  const entries = useQuery(api.chat.getAllEntries);
  return (
    <div className="bg-white rounded-xl h-[300px] w-[300px] overflow-y-auto p-2">
      {entries?.map(entry => (
        <div key={entry._id} className="flex flex-col gap-2  text-black mt-2">
          <div className="text-sm font-bold">{entry.input}</div>
          <div className="text-xs">{entry.response}</div>
        </div>
      ))}
    </div>
  );
};

export default EntriesList;
