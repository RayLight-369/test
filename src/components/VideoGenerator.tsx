"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Play, Zap } from "lucide-react";
import type { VideoGenerationRequest, VideoGenerationResponse } from "../types/video";
import { generateVideo } from "../services/videoService";
import VideoPlayer from "./VideoPlayer";
import { cn } from "@/lib/utils";

const VideoGenerator: React.FC<{ className?: string | undefined; }> = ( { className }: { className?: string | undefined; } ) => {
  const [ formData, setFormData ] = useState<VideoGenerationRequest>( {
    productName: "Suplimax",
    keyFeatures: "",
    targetAudience: "",
    tone: "",
    videoStyle: "",
    duration: 30,
  } );

  const [ isGenerating, setIsGenerating ] = useState( false );
  const [ generatedVideo, setGeneratedVideo ] = useState<VideoGenerationResponse | null>( null );
  const [ error, setError ] = useState<string | null>( null );

  const handleInputChange = ( field: keyof VideoGenerationRequest, value: string | number ) => {
    setFormData( ( prev ) => ( { ...prev, [ field ]: value } ) );
  };

  const handleGenerate = async () => {
    if ( !formData.keyFeatures.trim() ) {
      setError( "Please enter key product features" );
      return;
    }

    setIsGenerating( true );
    setError( null );

    try {
      const result = await generateVideo( formData );
      setGeneratedVideo( result );
    } catch ( err ) {
      setError( "Failed to generate video. Please try again." );
      console.error( "Video generation error:", err );
    } finally {
      setIsGenerating( false );
    }
  };

  const handleDownload = () => {
    if ( generatedVideo?.videoUrl ) {
      const link = document.createElement( "a" );
      link.href = generatedVideo.videoUrl;
      link.download = `suplimax-video-${ Date.now() }.mp4`;
      document.body.appendChild( link );
      link.click();
      document.body.removeChild( link );
    }
  };

  return (
    <div className={ "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8" }>
      {/* Input Form */ }
      <Card className={ cn( "h-fit", className ) }>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-500" />
            Video Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={ formData.productName }
              onChange={ ( e ) => handleInputChange( "productName", e.target.value ) }
              placeholder="Suplimax"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyFeatures">Key Product Features *</Label>
            <Textarea
              id="keyFeatures"
              value={ formData.keyFeatures }
              onChange={ ( e ) => handleInputChange( "keyFeatures", e.target.value ) }
              placeholder="e.g., Natural caffeine, Zero sugar, B-vitamins, Electrolytes, Tropical flavor"
              rows={ 3 }
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Select onValueChange={ ( value ) => handleInputChange( "targetAudience", value ) }>
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athletes">Athletes & Fitness Enthusiasts</SelectItem>
                <SelectItem value="students">Students & Professionals</SelectItem>
                <SelectItem value="gamers">Gamers & Streamers</SelectItem>
                <SelectItem value="general">General Active Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Video Tone</Label>
            <Select onValueChange={ ( value ) => handleInputChange( "tone", value ) }>
              <SelectTrigger>
                <SelectValue placeholder="Select video tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="energetic">Energetic & Dynamic</SelectItem>
                <SelectItem value="professional">Professional & Trustworthy</SelectItem>
                <SelectItem value="fun">Fun & Playful</SelectItem>
                <SelectItem value="motivational">Motivational & Inspiring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoStyle">Video Style</Label>
            <Select onValueChange={ ( value ) => handleInputChange( "videoStyle", value ) }>
              <SelectTrigger>
                <SelectValue placeholder="Select video style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="motion-graphics">Motion Graphics</SelectItem>
                <SelectItem value="live-action">Live Action</SelectItem>
                <SelectItem value="animated">2D Animation</SelectItem>
                <SelectItem value="mixed">Mixed Media</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds)</Label>
            <Select onValueChange={ ( value ) => handleInputChange( "duration", Number.parseInt( value ) ) }>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">60 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          { error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{ error }</p>
            </div>
          ) }

          <Button onClick={ handleGenerate } disabled={ isGenerating } className="w-full bg-orange-500 hover:bg-orange-600">
            { isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Generate Video
              </>
            ) }
          </Button>
        </CardContent>
      </Card>

      {/* Video Preview */ }
      <Card className={ className }>
        <CardHeader>
          <CardTitle>Generated Video</CardTitle>
        </CardHeader>
        <CardContent>
          { isGenerating ? (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
                <p className="text-gray-600">Creating your video...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            </div>
          ) : generatedVideo ? (
            <div className="space-y-4">
              <VideoPlayer videoUrl={ generatedVideo.videoUrl } thumbnailUrl={ generatedVideo.thumbnailUrl } />

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Video Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2">{ generatedVideo.duration }s</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Resolution:</span>
                    <span className="ml-2">{ generatedVideo.resolution }</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Format:</span>
                    <span className="ml-2">{ generatedVideo.format }</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Size:</span>
                    <span className="ml-2">{ generatedVideo.fileSize }</span>
                  </div>
                </div>
              </div>

              <Button onClick={ handleDownload } className="w-full bg-green-500 hover:bg-green-600">
                <Download className="mr-2 h-4 w-4" />
                Download Video
              </Button>
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your generated video will appear here</p>
              </div>
            </div>
          ) }
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoGenerator;
