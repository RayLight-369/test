# Suplimax Video Generator & Virtual Property Tour

A modern React application featuring two AI-powered video generation tools:
1. **Suplimax Video Generator** - Create compelling marketing videos for energy drink campaigns
2. **Virtual Property Tour Generator** - Transform property listings into cinematic virtual tours using Google Gemini Veo3

## ✨ Features

### Suplimax Video Generator
- 🎬 AI-powered video generation for marketing campaigns
- 🎯 Customizable target audience and tone selection
- 📊 Multiple video styles (Motion Graphics, Live Action, 2D Animation, Mixed Media)
- ⏱️ Flexible duration options (15s, 30s, 60s)
- 📱 Real-time preview and download functionality
- 🔄 Mock API integration for development

### Virtual Property Tour Generator
- 🏠 Property details form with comprehensive inputs
- 🎨 Four distinct tour styles:
  - ✨ Luxury Showcase
  - 🏠 Family-Friendly
  - 🏗️ Modern Minimalist
  - 🎬 Cinematic Drama
- 📹 AI-powered tour generation with Google Gemini Veo3
- 🎯 Progress tracking and real-time updates
- 📱 4K UHD video output with download capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/Raylight-369/test/issues.git

# Navigate to the project directory
cd suplimax-video-generator

# Install dependencies
npm install
# or
yarn install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_VIDEO_API_KEY=your_video_api_key_here

# Development Settings
VITE_ENABLE_MOCK_API=true
```

### Running the Application

```bash
# Start development server
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview
```

## 🎮 Usage

### Switching Between Modes

Press the **`Q`** key to toggle between:
- Suplimax Video Generator
- Virtual Property Tour Generator

### Suplimax Video Generator

1. **Configure Your Video**:
   - Enter product name (default: "Suplimax")
   - Add key product features
   - Select target audience
   - Choose video tone and style
   - Set duration

2. **Generate Video**:
   - Click "Generate Video"
   - Wait for AI processing
   - Preview the generated video
   - Download when ready

### Virtual Property Tour Generator

1. **Enter Property Details**:
   - Property address
   - Price and specifications
   - Square footage, bedrooms, bathrooms
   - Key features description

2. **Select Tour Style**:
   - Choose from 4 professional styles
   - Each optimized for different property types

3. **Generate Tour**:
   - Click "Generate Virtual Tour"
   - Monitor progress in real-time
   - Download 4K UHD video when complete

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **AI Integration**: Google Gemini Veo3 (for property tours)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── VideoGenerator.tsx  # Main video generator component
│   └── VideoPlayer.tsx     # Video player component
├── services/
│   └── videoService.ts     # API service layer
├── types/
│   └── video.ts           # TypeScript type definitions
├── TourPage.tsx           # Property tour generator page
├── App.tsx               # Main application component
└── config.ts             # Application configuration
```

## 🔧 Configuration

### API Settings

The application supports both mock and real API modes:

```typescript
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  VIDEO_API_KEY: import.meta.env.VITE_VIDEO_API_KEY || "",
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === "true",
  MAX_VIDEO_DURATION: 120,
  MIN_VIDEO_DURATION: 10,
  SUPPORTED_FORMATS: ["mp4", "webm", "mov"],
  SUPPORTED_RESOLUTIONS: ["1920x1080", "1280x720", "854x480"],
};
```

### Video Generation Options

| Parameter | Type | Options | Description |
|-----------|------|---------|-------------|
| `productName` | string | Any | Product name for branding |
| `keyFeatures` | string | Any | Product features to highlight |
| `targetAudience` | string | athletes, students, gamers, general | Target market |
| `tone` | string | energetic, professional, fun, motivational | Video tone |
| `videoStyle` | string | motion-graphics, live-action, animated, mixed | Visual style |
| `duration` | number | 15, 30, 60 | Video length in seconds |

## 🎨 UI Components

The application uses a custom component library built with Tailwind CSS:

- **Cards**: Property forms and video previews
- **Buttons**: Interactive elements with loading states
- **Inputs**: Form controls with validation
- **Select**: Dropdown menus for options
- **Progress**: Real-time generation tracking
- **Badges**: Status indicators

## 🚀 API Integration

### Mock API (Development)
- Simulates video generation with random delays
- Returns sample videos for testing
- Configurable through environment variables

### Real API (Production)
- Integrates with external video generation services
- Supports authentication via API keys
- Error handling and retry logic

### Video Generation Client

```typescript
const client = new VideoGenerationClient(baseUrl, apiKey);
const result = await client.generateVideo(request);
```

## 🎯 Features in Detail

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### Performance Optimizations
- Lazy loading for video content
- Optimized bundle size
- Efficient state management

### User Experience
- Real-time progress tracking
- Smooth animations and transitions
- Comprehensive error handling
- Keyboard shortcuts (Q to switch modes)

## 🔮 Future Enhancements

- [ ] User authentication and project saving
- [ ] Advanced video editing capabilities
- [ ] Batch video generation
- [ ] Template library expansion
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


## 🙋‍♂️ Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Raylight-369/test/issues) page
2. Create a new issue with detailed information
3. Contact: [buttrafay980@gmail.com](mailto:buttrafay980@gmail.com)

## 🎉 Acknowledgments

- **Google Gemini Veo3** for AI-powered video generation
- **Tailwind CSS** for styling framework
- **Lucide React** for beautiful icons
- **Vite** for lightning-fast development

---

⭐ **Star this repository if you found it helpful!**