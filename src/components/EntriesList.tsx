"use client";
import { useQuery } from "convex/react";
import * as React from "react";
import { api } from "../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

interface EntriesListProps {}

const EntriesList: React.FC<EntriesListProps> = ({}) => {
  const params = useParams();

  const entries = useQuery(api.chat.getAllEntries, {
    adventureId: params.adventureId as Id<"adventures">,
  });

  return (
    <div className="bg-white rounded-xl h-[450px]  overflow-y-auto p-2">
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
