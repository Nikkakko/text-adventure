"use client";
import { useQuery } from "convex/react";
import * as React from "react";
import { api } from "../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";
import Image from "next/image";
import { HeartIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface LastEntriesProps {}

const LastEntries: React.FC<LastEntriesProps> = ({}) => {
  const params = useParams();

  const entries = useQuery(api.chat.getAllEntries, {
    adventureId: params.adventureId as Id<"adventures">,
  });
  const items = useQuery(api.inventory.getAllItems);
  const lastEntry = entries && entries[entries.length - 1];
  console.log(items, "items");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <>
          {lastEntry && lastEntry.imageUrl ? (
            <div className="relative h-[300px] w-full aspect-auto ">
              <Image
                alt="last entry image"
                src={lastEntry.imageUrl}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            // <Loader2 size={64} className="animate-spin" />
            <Skeleton className="h-[300px] w-full aspect-auto" />
          )}
        </>

        <div className="flex-grow grid grid-cols-3 h-fit gap-2">
          {new Array(lastEntry?.health).fill("").map((_, idx) => {
            return (
              <div key={idx} className="flex justify-center">
                <HeartIcon size={32} className={cn("text-destructive")} />
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {lastEntry?.inventory.map((itemName, idx) => {
            const item = items?.find(item => item.itemName === itemName);

            return (
              <div key={idx}>
                {item && item.imageUrl ? (
                  <div className="flex flex-col text-center text-xl">
                    <div className="relative h-[100px] rounded-xl border-gray-500 borde w-[100px] overflow-hidden">
                      <Image
                        className="object-cover"
                        src={
                          items?.find(item => item.itemName === itemName)
                            ?.imageUrl || ""
                        }
                        alt={itemName}
                      />
                    </div>

                    {itemName}
                  </div>
                ) : (
                  <div className="text-xl flex flex-col items-center">
                    <Loader2 size={32} className="animate-spin" />
                    {itemName}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LastEntries;
