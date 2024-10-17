import StartChat from "@/components/forms/start-chat";
import EntriesList from "@/components/EntriesList";
import LastEntries from "@/components/LastEntries";

interface AdventurePageProps {}

export default function AdventurePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 container mx-auto">
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="flex flex-col gap-2 w-full">
            <EntriesList />
            <StartChat />
          </div>
        </div>
        <LastEntries />
      </div>
    </main>
  );
}
