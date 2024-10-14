import StartChat from "@/components/forms/start-chat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-2">
          <div className="bg-white rounded-xl h-[400px] w-[200px]"></div>
          <StartChat />
        </div>
      </div>
    </main>
  );
}
