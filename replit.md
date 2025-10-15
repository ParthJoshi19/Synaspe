# Quantum-Federated Multimodal RAG System

## Overview
A stunning hackathon demo prototype showcasing a futuristic quantum-federated multimodal RAG (Retrieval-Augmented Generation) system. This interactive frontend demo simulates an intelligent AI system performing multimodal document retrieval and analysis across text, image, audio, and video inputs.

**Status**: Demo Prototype (Frontend-focused with simulated backend interactions)
**Last Updated**: October 15, 2025

## Purpose & Goals
- Create a visually impressive, research-grade AI demo for hackathon presentation
- Simulate quantum-enhanced federated learning with multimodal data processing
- Demonstrate realistic UI/UX for advanced AI systems with animations and visual effects
- Showcase cross-modal document retrieval with confidence scoring and quantum entanglement metrics

## Tech Stack
### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with custom quantum theme
- **Animations**: Framer Motion, custom CSS animations
- **Charts**: Recharts
- **UI Components**: Shadcn/ui (Card, Button, Badge, Tabs, etc.)
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express
- **Storage**: In-memory storage (MemStorage)
- **Validation**: Zod schemas
- **Type Safety**: Shared TypeScript types

## Project Architecture

### Color Scheme (Quantum Theme)
- **Background**: #0A0F1C (deep space blue-black)
- **Primary Accent**: #7A5FFF (quantum purple)
- **Secondary Accent**: #00E0FF (electric cyan)
- **Surface**: #1B263B (dark slate)
- Glowing gradients and quantum visual effects throughout

### Typography
- **Primary**: Inter (UI elements)
- **Secondary**: Poppins (headings)
- **Monospace**: Roboto Mono (console, technical displays)

### Key Pages & Features

#### 1. Login Page (`/`)
- Quantum-themed authentication with animated particle background
- Mock login form (email + password)
- "Authenticating Federated Nodes..." loader animation
- Redirects to dashboard after 2.5s simulation

#### 2. Dashboard (`/dashboard`)
- System overview with stats cards (documents, queries, nodes, confidence)
- Recent activity feed showing multimodal processing
- Performance metrics with progress bars
- Neural Architecture Search, Cross-Modal Alignment, Quantum Optimization visualizations

#### 3. Upload Data (`/upload`)
- Drag-and-drop file upload interface
- Supports PDF, Image, Video, Audio files
- Animated processing stages:
  - Extracting Multimodal Features
  - Federated Embedding in Progress
  - Quantum Similarity Optimization
- Real-time progress tracking with visual feedback

#### 4. Query Engine (`/query`)
- Text input for natural language queries
- Modality toggles (Text, Image, Video, Audio)
- "Execute Quantum Query" button with rotating sphere loader
- Simulates 3-second retrieval process
- Quantum-enhanced similarity tooltip

#### 5. Results (`/results`)
- Tabbed interface (All, Text, Image, Video, Audio)
- Multimodal result cards with:
  - Confidence Score badges
  - Quantum Entanglement (QE) Factor badges
  - Contextual previews (snippets, captions, waveforms)
- Export and re-run query actions
- Link to detailed insights page

#### 6. Cross-Modal Insights (`/explanation`)
- Three tabs:
  - **Semantic Summary**: Key insights with alignment scores
  - **Quantum Similarity Map**: 3D embedding visualization
  - **Privacy Metrics**: Federated security donut chart
- Performance bar chart (78% latency reduction)
- Privacy score breakdown with progress bars

#### 7. Quantum Console (`/console`)
- Terminal-style log viewer with syntax highlighting
- Real-time streaming quantum node logs
- Pause/Resume and export functionality
- System metrics: Active nodes, energy optimization, latency

### Components

#### Core Components
- `quantum-background.tsx` - Animated particle neural network background
- `app-sidebar.tsx` - Navigation sidebar with quantum branding
- `status-bar.tsx` - System status indicators (Intelligence, Engine, Privacy)

#### UI Components (Shadcn)
- Card, Button, Badge, Input, Textarea
- Tabs, Progress, Toast notifications
- Sidebar primitives

### Data Models

#### User
- id, email, password

#### UploadedFile
- id, userId, fileName, fileType, fileSize, status, uploadedAt

#### Query
- id, userId, queryText, modalities (JSON), status, createdAt

#### QueryResult
- id, queryId, modality, content (JSON), confidenceScore, quantumEntanglement

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Mock authentication (2s delay)

#### File Management
- `POST /api/files/upload` - Upload file with simulated processing
- `GET /api/files/:userId` - Get user's uploaded files

#### Query Processing
- `POST /api/query` - Execute query with 3s simulated retrieval
- `GET /api/query/:queryId/results` - Get query results
- `GET /api/queries/:userId` - Get user's query history

#### System
- `GET /api/quantum/logs` - Get quantum node logs

## Design Philosophy

### Visual Excellence
- **Quantum Glow Effects**: Box shadows and text glows using primary/accent colors
- **Particle Animation**: Canvas-based neural network visualization
- **Smooth Transitions**: Framer Motion and CSS animations
- **Gradient Borders**: Purple-to-cyan gradients on important elements
- **Responsive Design**: Mobile-first with breakpoint optimizations

### Simulated Intelligence
- 2-3 second loaders for realistic AI processing feel
- Animated progress bars with stage labels
- Success toasts with quantum node notifications
- Terminal-style logs with realistic system messages
- Confidence scores and quantum entanglement factors (92-99%)

### User Experience
- Clear visual hierarchy with shadcn components
- Consistent spacing and typography
- Accessible color contrast (light text on dark backgrounds)
- Interactive elements with hover states and quantum elevation effects
- Smooth page transitions

## Demo Flow (for Recording)

1. **Login** → Quantum authentication animation → Dashboard
2. **Dashboard** → View system stats and recent activity
3. **Upload** → Drag/drop files → Watch quantum processing stages
4. **Query Engine** → Enter query → Select modalities → Execute
5. **Results** → View multimodal cards → Check confidence scores
6. **Insights** → Explore 3D visualization → Check privacy metrics
7. **Console** → View real-time quantum logs → System metrics
8. **Success** → "Insight Generated Successfully – 99.3% Confidence"

## Development Notes

### Workflow
- `npm run dev` - Starts Express backend + Vite frontend on same port
- Auto-restart on file changes

### Key Files
- `client/src/index.css` - Quantum color scheme and animations
- `shared/schema.ts` - Type definitions and Zod schemas
- `server/storage.ts` - In-memory data storage
- `server/routes.ts` - API endpoints with mock data
- `design_guidelines.md` - Comprehensive design system documentation

### Performance
- In-memory storage for instant responses
- Simulated delays for realistic demo feel
- Optimized animations with CSS transforms
- Lazy-loaded routes with code splitting

## User Preferences
- Futuristic, research-grade aesthetic
- Dark mode quantum theme (purple/cyan)
- Smooth animations and transitions
- Mock data with realistic behavior
- Terminal-style technical displays

## Recent Changes
- **October 15, 2025**: Initial implementation
  - Created quantum color scheme and design system
  - Built all frontend pages with animations
  - Implemented backend API routes with mock data
  - Added particle background and visual effects
  - Integrated sidebar navigation and status bar
  - Created multimodal result displays
  - Added 3D visualization and charts
  - Implemented quantum console with live logs
