import { useEffect, useState } from "react";
import VideoGenerator from "./components/VideoGenerator";
import TourPage from "./TourPage";


function App() {
  const [ viewVidGen, setViewVidGen ] = useState<boolean>( true );

  const handleKeyDown = ( e: KeyboardEvent ) => e.key === "q" && setViewVidGen( !viewVidGen );

  useEffect( () => {
    document.addEventListener( "keydown", handleKeyDown );
    return () => document.removeEventListener( "keydown", handleKeyDown );
  }, [ viewVidGen ] );
  return viewVidGen ? (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Suplimax Video Generator</h1>
          <p className="text-lg text-gray-600">Create compelling marketing videos for your energy drink campaigns</p>
        </div>
        <VideoGenerator className="shadow-xl border-0" />
      </div>
    </div>
  ) : (
    <TourPage />
  );
}

export default App;
