'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-primary">About</h1>
        </motion.div>

        {/* About Me - Catchy Hook */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
        >
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="text-2xl font-medium text-foreground">
              I design with data, explore creativity with AI, and build tools that make things easier.
              <span className="block mt-2 text-lg font-normal">Welcome to my digital playground.</span>
            </p>
            <p>
              My work focuses on <span className="text-primary font-medium">merging AI and design</span>—helping creative minds leverage machine learning 
              without needing a PhD in data science. With a background in <span className="text-primary font-medium">automotive design and AI research</span>, 
              I explore ways to enhance creative workflows through technology.
            </p>
          </div>
        </motion.section>

        {/* My Journey */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">My Journey: Designing with AI</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I started my career as an <span className="text-primary font-medium">automotive designer in Italy</span>, working on concept vehicles 
              and pushing the boundaries of futuristic car aesthetics. It was an incredible experience, 
              but I became fascinated with a bigger question:
              <em className="block mt-2 text-foreground">Could AI enhance creativity rather than replace it?</em>
            </p>
            <p>
              That curiosity led me to dive deep into <span className="text-primary font-medium">AI-driven design</span>, shifting from purely visual 
              aesthetics to data-driven insights. Now, I work at the <span className="text-primary font-medium">intersection of AI and creativity</span>, 
              building tools that bridge these two worlds.
            </p>
          </div>
        </motion.section>

        {/* Current Work */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">What I'm Working on Now</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Currently, I'm building an <span className="text-primary font-medium">AI-powered design assistant</span>—a tool that helps designers explore 
              creative variations faster. The goal is simple:
              <em className="block mt-2 text-foreground">make AI a co-designer rather than just a tool.</em>
            </p>
            <p>
              I also write about AI, design, and the lessons I've learned from working across disciplines.
              If you're interested in the intersection of <span className="text-primary font-medium">technology and creativity</span>, you might enjoy my insights.
            </p>

          </div>
        </motion.section>

        {/* Fun Facts */}
        <motion.section 
          className="glass-card rounded-xl p-8 mb-8 animate-in"
          {...fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Fun Facts</h2>
          <ul className="space-y-4">
            {[
              "I once worked as Car Designer and compete in Ferrari Top Design Challenge.",
              "My first AI experiment was turning car sketches into 3D models.",
              "I make a mean Korean BBQ at home. 🔥",
              "This website? Yes, AI generated."
            ].map((fact, index) => (
              <li key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                <span className="text-muted-foreground">{fact}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Connect */}
        <motion.section 
          className="glass-card rounded-xl p-8 animate-in"
          {...fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Let's Connect</h2>
          <div className="space-y-6">
            <div className="grid gap-4">
              <Link 
                href="/blog"
                className="p-4 rounded-lg bg-muted/50 backdrop-blur-sm hover:bg-muted transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary">📚</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Read my blog for insights on AI, design, and creativity
                  </span>
                </div>
              </Link>
              
              <Link 
                href="/projects"
                className="p-4 rounded-lg bg-muted/50 backdrop-blur-sm hover:bg-muted transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary">🛠</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Explore my projects to see what I'm building
                  </span>
                </div>
              </Link>

              <a 
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted/50 backdrop-blur-sm hover:bg-muted transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary">🤝</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Connect with me on LinkedIn
                  </span>
                </div>
              </a>

              <a 
                href="https://glee2dev.github.io/gplee-resume/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted/50 backdrop-blur-sm hover:bg-muted transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary">📄</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    View my resume
                  </span>
                </div>
              </a>
            </div>
          </div>
          
        </motion.section>
      </div>
    </div>
  )
}
