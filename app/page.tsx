import ChatBox from "./components/ChatBox";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 
                     flex flex-col items-center 
                     justify-center p-4">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          🛒 ShopMind AI
        </h1>
        <p className="text-gray-400">
          Your intelligent shopping assistant — 
          powered by OpenAI
        </p>
      </div>

      {/* Chat */}
      <div className="w-full max-w-2xl">
        <ChatBox/>
      </div>

      {/* Footer */}
      <p className="text-gray-600 text-sm mt-6">
        Built with Next.js + OpenAI by Mujtaba Rasheed
      </p>

    </main>
  );
}