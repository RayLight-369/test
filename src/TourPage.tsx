"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Sparkles, Home, Camera, Wand2 } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

interface PropertyDetails {
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  features: string;
}

interface TourStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface GeneratedTour {
  videoUrl: string;
  thumbnailUrl?: string;
  duration: string;
  resolution: string;
  format: string;
  fileSize: string;
}

const tourStyles: TourStyle[] = [
  {
    id: "luxury",
    name: "Luxury Showcase",
    description: "Elegant cinematography highlighting premium features and finishes",
    icon: "✨",
  },
  {
    id: "family",
    name: "Family-Friendly",
    description: "Warm, inviting tour focusing on livability and comfort",
    icon: "🏠",
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Clean, architectural focus on design and space",
    icon: "🏗️",
  },
  {
    id: "cinematic",
    name: "Cinematic Drama",
    description: "Hollywood-style production with dramatic lighting and angles",
    icon: "🎬",
  },
];

// Mock video URLs for different tour styles
const mockVideos: Record<string, GeneratedTour> = {
  luxury: {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    duration: "2:45",
    resolution: "4K UHD",
    format: "MP4",
    fileSize: "125 MB",
  },
  family: {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    duration: "2:30",
    resolution: "4K UHD",
    format: "MP4",
    fileSize: "118 MB",
  },
  modern: {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    duration: "2:15",
    resolution: "4K UHD",
    format: "MP4",
    fileSize: "95 MB",
  },
  cinematic: {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    duration: "3:00",
    resolution: "4K UHD",
    format: "MP4",
    fileSize: "142 MB",
  },
};

export default function TourPage() {
  const [ propertyDetails, setPropertyDetails ] = useState<PropertyDetails>( {
    address: "12012 Crest Ct, Beverly Hills, CA 90210",
    price: "$10,183,985",
    bedrooms: 5,
    bathrooms: 6.5,
    squareFootage: 6100,
    features:
      "Luxury estate, three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location",
  } );

  const [ selectedStyle, setSelectedStyle ] = useState<string>( "" );
  const [ isGenerating, setIsGenerating ] = useState( false );
  const [ generatedTour, setGeneratedTour ] = useState<GeneratedTour | null>( null );
  const [ generationProgress, setGenerationProgress ] = useState( 0 );

  const handleGenerate = async () => {
    if ( !selectedStyle ) return;

    setIsGenerating( true );
    setGenerationProgress( 0 );
    setGeneratedTour( null );

    // Simulate video generation progress
    const progressInterval = setInterval( () => {
      setGenerationProgress( ( prev ) => {
        if ( prev >= 100 ) {
          clearInterval( progressInterval );
          setIsGenerating( false );
          // Set the mock video based on selected style
          setGeneratedTour( mockVideos[ selectedStyle ] || mockVideos.luxury );
          return 100;
        }
        return prev + Math.random() * 12 + 3; // Slightly faster progress
      } );
    }, 400 );
  };

  const handleDownload = () => {
    if ( generatedTour?.videoUrl ) {
      const link = document.createElement( "a" );
      link.href = generatedTour.videoUrl;
      link.download = `property-tour-${ propertyDetails.address.replace( /[^a-zA-Z0-9]/g, "-" ) }.mp4`;
      document.body.appendChild( link );
      link.click();
      document.body.removeChild( link );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900">
      {/* Decorative grid background */ }
      <div
        className="absolute inset-0 opacity-20"
        style={ {
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        } }
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-slate-200">Powered by Google Gemini Veo3</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-4">
            Virtual Property Tour Generator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Transform property listings into cinematic virtual tours with AI-powered video generation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Property Details Form */ }
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Home className="w-5 h-5 text-slate-400" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-200">
                  Address
                </Label>
                <Input
                  id="address"
                  value={ propertyDetails.address }
                  onChange={ ( e ) => setPropertyDetails( ( prev ) => ( { ...prev, address: e.target.value } ) ) }
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-slate-200">
                    Price
                  </Label>
                  <Input
                    id="price"
                    value={ propertyDetails.price }
                    onChange={ ( e ) => setPropertyDetails( ( prev ) => ( { ...prev, price: e.target.value } ) ) }
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sqft" className="text-slate-200">
                    Square Footage
                  </Label>
                  <Input
                    id="sqft"
                    type="number"
                    value={ propertyDetails.squareFootage }
                    onChange={ ( e ) =>
                      setPropertyDetails( ( prev ) => ( { ...prev, squareFootage: Number.parseInt( e.target.value ) } ) )
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms" className="text-slate-200">
                    Bedrooms
                  </Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={ propertyDetails.bedrooms }
                    onChange={ ( e ) =>
                      setPropertyDetails( ( prev ) => ( { ...prev, bedrooms: Number.parseInt( e.target.value ) } ) )
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms" className="text-slate-200">
                    Bathrooms
                  </Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    step="0.5"
                    value={ propertyDetails.bathrooms }
                    onChange={ ( e ) =>
                      setPropertyDetails( ( prev ) => ( { ...prev, bathrooms: Number.parseFloat( e.target.value ) } ) )
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features" className="text-slate-200">
                  Key Features
                </Label>
                <Textarea
                  id="features"
                  value={ propertyDetails.features }
                  onChange={ ( e ) => setPropertyDetails( ( prev ) => ( { ...prev, features: e.target.value } ) ) }
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 min-h-[100px]"
                  placeholder="Describe the key features and highlights of the property..."
                />
              </div>

              {/* Tour Style Selection */ }
              <div className="space-y-4">
                <Label className="text-slate-200">Tour Style</Label>
                <div className="grid grid-cols-1 gap-3">
                  { tourStyles.map( ( style ) => (
                    <div
                      key={ style.id }
                      className={ `p-4 rounded-lg border cursor-pointer transition-all duration-200 ${ selectedStyle === style.id
                        ? "bg-slate-500/20 border-slate-400 shadow-lg shadow-slate-500/20"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                        }` }
                      onClick={ () => setSelectedStyle( style.id ) }
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{ style.icon }</span>
                        <div>
                          <h3 className="font-semibold text-white">{ style.name }</h3>
                          <p className="text-sm text-slate-300">{ style.description }</p>
                        </div>
                      </div>
                    </div>
                  ) ) }
                </div>
              </div>

              <Button
                onClick={ handleGenerate }
                disabled={ !selectedStyle || isGenerating }
                className="w-full bg-gradient-to-r from-slate-600 to-pink-600 hover:from-slate-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                { isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 animate-spin" />
                    Generating Tour... { Math.round( generationProgress ) }%
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Generate Virtual Tour
                  </div>
                ) }
              </Button>
            </CardContent>
          </Card>

          {/* Video Preview */ }
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Play className="w-5 h-5 text-slate-400" />
                Generated Tour
              </CardTitle>
            </CardHeader>
            <CardContent>
              { isGenerating ? (
                <div className="aspect-video bg-gradient-to-br from-slate-900/20 to-pink-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-medium">Generating your virtual tour...</p>
                    <div className="w-64 bg-white/10 rounded-full h-2 mt-4">
                      <div
                        className="bg-gradient-to-r from-slate-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={ { width: `${ generationProgress }%` } }
                      ></div>
                    </div>
                    <p className="text-sm text-slate-300 mt-2">{ Math.round( generationProgress ) }% complete</p>
                  </div>
                </div>
              ) : generatedTour ? (
                <div className="space-y-4">
                  <VideoPlayer videoUrl={ generatedTour.videoUrl } thumbnailUrl={ generatedTour.thumbnailUrl } />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                        ✓ Generated
                      </Badge>
                      <span className="text-sm text-slate-300">
                        { tourStyles.find( ( s ) => s.id === selectedStyle )?.name } Style
                      </span>
                    </div>
                    <Button
                      onClick={ handleDownload }
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-2">Tour Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Duration:</span>
                        <span className="text-white ml-2">{ generatedTour.duration }</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Resolution:</span>
                        <span className="text-white ml-2">{ generatedTour.resolution }</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Style:</span>
                        <span className="text-white ml-2">{ tourStyles.find( ( s ) => s.id === selectedStyle )?.name }</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Format:</span>
                        <span className="text-white ml-2">{ generatedTour.format }</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/20 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 font-medium">Your virtual tour will appear here</p>
                    <p className="text-sm text-slate-400 mt-2">Select a tour style and click generate to begin</p>
                  </div>
                </div>
              ) }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
