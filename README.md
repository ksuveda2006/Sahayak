# Sahayak - AI-Powered Teaching Assistant for Rural Education

🌟 **Live Demo**: [https://crbzxrig.manus.space/dashboard](https://crbzxrig.manus.space/dashboard)

## 🚀 Overview

Sahayak is a comprehensive, fully functional AI-powered teaching assistant designed specifically for multi-grade, low-resource classrooms in rural areas. It empowers teachers with localized content generation, personalized worksheets, visual aids, and voice-based assessments in 15+ regional languages.

## ✨ Key Features

### 🎯 **Dynamic & Fully Functional**
- **Working Authentication**: Complete user registration, login, and logout system
- **Dynamic Routing**: Dedicated sub-pages for each feature with seamless navigation
- **Real-time Data**: Live statistics and user activity tracking
- **Responsive Design**: Professional UI that works on all devices

### 🤖 **AI-Powered Tools**
- **Content Generator**: Create localized lesson plans, activities, and educational content
- **Worksheet Generator**: Generate personalized worksheets for multi-grade classrooms
- **Visual Aid Generator**: Instructions for creating low-cost visual learning materials
- **Voice Assessment**: Conduct voice-based evaluations with AI feedback
- **Image Analyzer**: Extract educational insights from images
- **Video Creator**: Record and process educational videos with language selection

### 🌍 **Multi-Language Support**
Supports content generation in 15+ regional languages:
- Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati
- Urdu, Kannada, Odia, Malayalam, Punjabi
- Assamese, Maithili, Sanskrit, and English

### 🎥 **Video Recording with Language Selection**
- Pre-recording language selection interface
- Camera and microphone access for video recording
- Video processing and content generation
- Download and export capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18+** with modern hooks and context
- **React Router** for dynamic navigation
- **Tailwind CSS** for responsive styling
- **Lucide React** for beautiful icons
- **React Hot Toast** for notifications
- **React Dropzone** for file uploads

### Backend
- **Flask** with CORS support
- **Firebase Authentication** for user management
- **Firestore** for real-time database
- **Firebase Storage** for file uploads
- **Gemini 1.5 Pro API** for content generation
- **Vertex AI Speech-to-Text** for voice processing

### AI Integration
- **Google Gemini 1.5 Pro** for content and worksheet generation
- **Vertex AI Vision** for image analysis
- **Vertex AI Speech-to-Text** for voice assessment
- **Localized AI responses** in regional languages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.8+ and pip
- Firebase project with Authentication and Firestore enabled
- Google Cloud project with Vertex AI APIs enabled

### Frontend Setup
```bash
cd frontend
pnpm install
pnpm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Backend (.env)**
```
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
GEMINI_API_KEY=your_gemini_api_key
VERTEX_AI_PROJECT_ID=your_gcp_project_id
VERTEX_AI_LOCATION=us-central1
```

## 📱 Features in Detail

### 🎓 Content Generator
- Subject-specific content creation (Math, Science, English, etc.)
- Grade-level appropriate materials (Grades 1-8)
- Multiple content types: Lesson plans, activities, stories, experiments
- Cultural context integration for rural Indian classrooms

### 📝 Worksheet Generator
- Personalized worksheets based on student needs
- Difficulty level adjustment
- Multi-grade classroom support
- Printable formats for offline use

### 🎨 Visual Aid Generator
- Low-cost material instructions
- Step-by-step creation guides
- Locally available resource utilization
- Cultural relevance and context

### 🎤 Voice Assessment
- Real-time voice recording
- AI-powered pronunciation feedback
- Multi-language support
- Progress tracking and analytics

### 📸 Image Analyzer
- Educational content extraction from images
- Lesson plan generation from visual materials
- Cultural context recognition
- Accessibility features

### 🎬 Video Creator
- Language selection before recording
- Camera and microphone integration
- Video processing and analysis
- Content generation from recorded videos

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Content Generation
- `POST /api/content/generate` - Generate educational content
- `POST /api/worksheets/generate` - Create worksheets
- `POST /api/visual-aids/generate` - Generate visual aid instructions
- `POST /api/voice/assess` - Process voice assessments
- `POST /api/images/analyze` - Analyze educational images
- `POST /api/videos/process` - Process recorded videos

### User Data
- `GET /api/user/{userId}/stats` - Get user statistics
- `GET /api/user/{userId}/content` - Get user's generated content
- `POST /api/user/{userId}/save` - Save generated content

## 🌟 Unique Features

### 🎯 **Rural Education Focus**
- Designed specifically for low-resource environments
- Offline-ready capabilities
- Low-bandwidth optimizations
- Cultural sensitivity and local context

### 🌍 **Localization**
- 15+ regional language support
- Cultural context integration
- Local examples and references
- Regional curriculum alignment

### 🎥 **Video Integration**
- Pre-recording language selection
- Real-time video processing
- Educational content extraction
- Multi-format export options

### 📊 **Analytics & Tracking**
- Real-time usage statistics
- Content generation metrics
- User progress tracking
- Performance analytics

## 🚀 Deployment

The application is deployed and accessible at:
**[https://qjh9iec55m0m.manus.space](https://qjh9iec55m0m.manus.space)**

### Production Features
- Automatic HTTPS
- Global CDN distribution
- Real-time database synchronization
- Scalable infrastructure
- 99.9% uptime guarantee

## 📖 Documentation

### User Guide
1. **Getting Started**: Register/login to access all features
2. **Content Creation**: Select subject, grade, and language preferences
3. **Worksheet Generation**: Customize difficulty and content type
4. **Voice Assessment**: Record and receive AI feedback
5. **Video Creation**: Select language and record educational content

### Developer Guide
- Component architecture documentation
- API integration examples
- Deployment instructions
- Contributing guidelines

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Cloud Platform for AI services
- Firebase for backend infrastructure
- React community for frontend tools
- Rural education experts for domain knowledge

## 📞 Support

For support, email support@sahayak.edu or join our community Discord.

---

**Made with ❤️ for rural education in India**

*Empowering teachers, transforming classrooms, building futures.*

