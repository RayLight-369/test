import type { VideoGenerationRequest, VideoGenerationResponse, ApiResponse } from "../types/video";

// Sample videos and thumbnails (used only for mocking)
const MOCK_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
];

const MOCK_THUMBNAILS = [
  "/placeholder.svg?height=360&width=640&text=Suplimax+Energy+Thumbnail+1",
  "/placeholder.svg?height=360&width=640&text=Suplimax+Energy+Thumbnail+2",
  "/placeholder.svg?height=360&width=640&text=Suplimax+Energy+Thumbnail+3",
];

// Mocks a video generation process (used during development)
export async function generateVideo( request: VideoGenerationRequest ): Promise<VideoGenerationResponse> {
  await new Promise( ( res ) => setTimeout( res, 3000 + Math.random() * 2000 ) );

  if ( Math.random() < 0.1 ) {
    throw new Error( "Video generation service temporarily unavailable" );
  }

  const videoIndex = Math.floor( Math.random() * MOCK_VIDEOS.length );

  return {
    id: `video_${ Date.now() }_${ Math.random().toString( 36 ).substring( 2, 11 ) }`,
    videoUrl: MOCK_VIDEOS[ videoIndex ],
    thumbnailUrl: MOCK_THUMBNAILS[ videoIndex ],
    duration: request.duration,
    resolution: "1920x1080",
    format: "MP4",
    fileSize: `${ Math.floor( request.duration * 0.5 + Math.random() * 2 ) }MB`,
    generatedAt: new Date().toISOString(),
    prompt: generatePrompt( request ),
  };
}

// Constructs a natural language prompt from request data
function generatePrompt( request: VideoGenerationRequest ): string {
  const { productName, keyFeatures, targetAudience, tone, videoStyle, duration } = request;

  let prompt = `Create a ${ duration }-second ${ tone.toLowerCase() } marketing video for ${ productName }. `;
  if ( keyFeatures ) prompt += `Highlight features: ${ keyFeatures }. `;
  if ( targetAudience ) prompt += `Target audience: ${ targetAudience }. `;
  if ( videoStyle ) prompt += `Style: ${ videoStyle }. `;

  prompt += `Include energetic music, dynamic visuals, and strong branding. Emphasize the energy-boosting benefits.`;

  return prompt;
}

// Sends real request to the video generation API
export async function generateVideoWithRealAPI( request: VideoGenerationRequest ): Promise<VideoGenerationResponse> {
  const prompt = generatePrompt( request );

  try {
    const res = await fetch( `${ import.meta.env.VITE_API_BASE_URL }/api/video-generation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ import.meta.env.VITE_VIDEO_API_KEY }`,
      },
      body: JSON.stringify( {
        prompt,
        duration: request.duration,
        style: request.videoStyle,
        resolution: "1920x1080",
        format: "mp4",
      } ),
    } );

    if ( !res.ok ) throw new Error( `API error: ${ res.status }` );

    const data = await res.json();

    return {
      id: data.id,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      duration: data.duration,
      resolution: data.resolution,
      format: data.format,
      fileSize: data.file_size,
      generatedAt: data.created_at,
      prompt,
    };
  } catch ( err ) {
    console.error( "Video generation failed:", err );
    throw new Error( "Unable to generate video at this time." );
  }
}

// Client class to encapsulate API calls
export class VideoGenerationClient {
  private baseUrl: string;
  private apiKey: string;
  constructor ( baseUrl: string, apiKey: string ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async generateVideo( request: VideoGenerationRequest ): Promise<ApiResponse<VideoGenerationResponse>> {
    try {
      const res = await fetch( `${ this.baseUrl }/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ this.apiKey }`,
        },
        body: JSON.stringify( request ),
      } );

      const data = await res.json();

      if ( !res.ok ) {
        return {
          success: false,
          error: {
            message: data.message || "Video generation failed",
            code: data.code || "GENERATION_ERROR",
            details: data.details,
          },
        };
      }

      return { success: true, data };
    } catch ( err ) {
      return {
        success: false,
        error: {
          message: "Network error occurred",
          code: "NETWORK_ERROR",
          details: err,
        },
      };
    }
  }


}
