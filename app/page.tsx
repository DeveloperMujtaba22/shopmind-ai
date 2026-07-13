import ChatBox from "./components/ChatBox";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 
                     flex flex-col items-center 
                     justify-center p-4">
      
      {/* Header */}
      

      {/* Chat */}
      <div className="w-full max-w-4xl">
        <ChatBox/>
      </div>

     
    </main>
  );
}