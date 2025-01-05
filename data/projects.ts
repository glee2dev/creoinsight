export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  duration: string;
  role: string;
  category: string;
  technologies: string[];
  tasks: string[];
  images?: {
    src: string;
    alt: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "creoinsight-portfolio",
    title: "CreoInsight Portfolio",
    description: "A modern portfolio and blog platform built with Next.js, featuring dynamic content management, dark mode support, and responsive design.",
    shortDescription: "Modern portfolio and blog platform with dynamic content management",
    duration: "2024",
    role: "Full Stack Developer",
    category: "Web Development",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Markdown",
      "React"
    ],
    tasks: [
      "System Architecture & Component Design",
      "Dynamic Content Management System",
      "Dark Mode Implementation",
      "Performance Optimization",
      "Responsive Layout Development"
    ],
    images: [
      {
        src: "/projects/creoinsight/home.png",
        alt: "CreoInsight Homepage"
      },
      {
        src: "/projects/creoinsight/blog.png",
        alt: "Blog Section"
      },
      {
        src: "/projects/creoinsight/projects.png",
        alt: "Projects Gallery"
      }
    ]
  },
  {
    id: "sentiment-analyzer",
    title: "AI Sentiment Analyzer",
    description: "A machine learning-based sentiment analysis system that processes text data to determine emotional tone and sentiment, with support for multiple languages and real-time analysis.",
    shortDescription: "ML-powered sentiment analysis system with multilingual support",
    duration: "2023",
    role: "ML Engineer",
    category: "Machine Learning",
    technologies: [
      "Python",
      "TensorFlow",
      "BERT",
      "FastAPI",
      "Docker"
    ],
    tasks: [
      "Model Architecture Design",
      "Training Pipeline Development",
      "Multi-language Support Integration",
      "API Development & Documentation",
      "Performance Monitoring System"
    ],
    images: [
      {
        src: "/projects/sentiment-analyzer/dashboard.png",
        alt: "Analysis Dashboard"
      },
      {
        src: "/projects/sentiment-analyzer/results.png",
        alt: "Analysis Results"
      },
      {
        src: "/projects/sentiment-analyzer/metrics.png",
        alt: "Performance Metrics"
      }
    ]
  },
  {
    id: "mobile-fitness-app",
    title: "FitTrack Pro",
    description: "A comprehensive fitness tracking mobile application that helps users monitor workouts, nutrition, and progress with personalized recommendations and social features.",
    shortDescription: "Comprehensive fitness tracking app with personalized recommendations",
    duration: "2023",
    role: "Mobile Developer",
    category: "Mobile Apps",
    technologies: [
      "React Native",
      "TypeScript",
      "Redux",
      "Node.js",
      "MongoDB"
    ],
    tasks: [
      "UI/UX Implementation",
      "State Management Architecture",
      "Real-time Data Synchronization",
      "Social Features Integration",
      "Analytics Dashboard Development"
    ],
    images: [
      {
        src: "/projects/fittrack/home.png",
        alt: "FitTrack Home Screen"
      },
      {
        src: "/projects/fittrack/workout.png",
        alt: "Workout Tracking"
      },
      {
        src: "/projects/fittrack/progress.png",
        alt: "Progress Analytics"
      }
    ]
  }
]
