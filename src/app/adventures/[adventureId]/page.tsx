import StartChat from "@/components/forms/start-chat";
import EntriesList from "@/components/EntriesList";

interface AdventurePageProps {}

export default function AdventurePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="flex flex-col gap-2">
            <EntriesList />
            <StartChat />
          </div>
        </div>
      </div>
    </main>
  );
}
