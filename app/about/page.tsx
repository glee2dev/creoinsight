'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Summary Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-primary mb-8">About</h1>
          <div className="text-lg text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Data Scientist and Industrial Designer specializing in the intersection 
              of artificial intelligence and design. With expertise spanning data analytics, 
              machine learning, and industrial design, I bring a unique perspective to 
              solving complex problems in technology and product development.
            </p>
            <p>
              My work focuses on leveraging AI to enhance design processes and user 
              experiences, particularly in automotive and consumer electronics industries. 
              I combine technical proficiency in machine learning with creative design 
              thinking to deliver innovative solutions.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Experience</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-primary">LG Electronics</h3>
              <p className="text-muted-foreground mt-1">Data Scientist • 2023 - Present</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Developed machine learning models for customer behavior prediction and improved customer journey mapping through clustering analysis</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Implemented data-driven solutions for customer experience optimization</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Dream2Real</h3>
              <p className="text-muted-foreground mt-1">AI Consultant • 2022 - 2023</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Led development of synthetic data solutions for computer vision applications</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Designed and implemented inspection algorithms for seafood classification</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Changan European Design Center</h3>
              <p className="text-muted-foreground mt-1">Exterior Designer • 2021 - 2022</p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Contributed to early design development and concept vehicles</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Developed futuristic EV proposals and press-release illustrations</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Education</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-primary">KAIST (South Korea)</h3>
              <p className="text-lg mt-1">Master of Science in Industrial Design</p>
              <p className="text-muted-foreground mt-1">Focus on deep learning for automotive design analysis</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">College for Creative Studies (USA)</h3>
              <p className="text-lg mt-1">Bachelor of Fine Arts in Transportation Design</p>
              <p className="text-muted-foreground mt-1">Projects with Ferrari, Mercedes Benz, and Toyota</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Indiana University (USA)</h3>
              <p className="text-muted-foreground mt-1">Coursework in Journalism and Finance</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Skills & Technologies</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Technical</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'TensorFlow', 'Computer Vision', 'Machine Learning', 'Synthetic Data'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Design</h3>
              <div className="flex flex-wrap gap-2">
                {['CAD Modeling', 'Clay Modeling', 'Scenario-based Design', 'Concept Visualization'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Tableau', 'Adobe Creative Suite', 'Autodesk Alias', 'Blender'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Languages & Awards */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Languages & Awards</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Korean (Native)</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">English (Professional)</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Italian (Elementary)</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Awards & Recognition</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Best Paper Award at HCI Korea</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Finalist in Ferrari Top Design School Challenge</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Recognition in GM and Buick-sponsored competitions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
