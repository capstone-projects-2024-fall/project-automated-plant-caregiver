import './about.css';
import plantImage1 from './plantImage1.png';
import plantImage2 from './plantImage2.png';
import productDesignImage from './sampleDesign.png';

function About() {
   return (
      <div className="about-page">
         {/* Side Navigation Menu */}
         <aside className="side-navigation">
            <h4>Quick Links</h4>
            <a href="#about">🌱 About</a>
            <a href="#overview">📋 Project Overview</a>
            <a href="#goals">🎯 Project Goals</a>
            <a href="#features">✨ Key Features</a>
            <a href="#system">🛠️ System Overview</a>
            <a href="#requirements">📝 Functional Requirements</a>
            <a href="#non-functional">🔍 Non-functional Requirements</a>
            <a href="#design">💡 Conceptual Design</a>
            <a href="#example-design">🎨 Example Design</a>
         </aside>

         {/* Main Content */}
         <main className="about-container">
            <section id="about">
               <h2>🌱 About Plant Parent 🌱</h2>
               <p>
                  Plant Parent is an innovative IoT-based automated plant care project designed to help users manage the health and growth of their indoor plants effortlessly. Through real-time monitoring and intelligent adjustments for watering, lighting, and climate control, Plant Parent ensures plants thrive without constant user intervention.
               </p>
            </section>

            <section id="overview">
               <h3>📋 Project Overview</h3>
               <p>
                  The Plant Parent system uses sensors to track soil moisture, light levels, and temperature, adjusting plant care based on these readings. A mobile app or web interface enables users to manage their plants remotely, providing real-time updates and personalized care recommendations.
               </p>
            </section>

            <section id="goals">
               <h3>🎯 Project Goals</h3>
               <ul>
                  <li>Automate daily plant care tasks like watering and lighting.</li>
                  <li>Monitor plant health through real-time sensor data.</li>
                  <li>Provide a convenient interface for plant care scheduling and remote management.</li>
                  <li>Enhance user experience with AI-driven personalized plant care advice.</li>
               </ul>
            </section>

            <section id="features">
               <h3>✨ Key Features</h3>
               <ul>
                  <li>
                     <strong>AI Chatbot Assistance:</strong> Users can upload plant photos or provide descriptions, and the AI will identify the plant type and offer care suggestions.
                  </li>
                  <li>
                     <strong>Remote Control & Real-time Alerts:</strong> Users can control moisture, light, humidity, and temperature remotely. Receive notifications for water levels, sensor issues, and recommended adjustments.
                  </li>
                  <li>
                     <strong>Predictive Care with Machine Learning:</strong> By analyzing sensor data over time, the system can predict plant needs and make proactive adjustments.
                  </li>
               </ul>
            </section>

            <section id="system">
               <h3>🛠️ System Overview</h3>
               <p>
                  The Plant Parent system includes an embedded microcontroller connected to sensors (moisture, light, temperature) and actuators (water pump, lights). The microcontroller processes sensor data and manages plant care automatically.
               </p>
            </section>

            <section id="requirements">
               <h3>📝 Functional Requirements</h3>
               <ul>
                  <li>Plant holder with embedded hardware for automated care.</li>
                  <li>Remote access via a web page for device control and monitoring.</li>
                  <li>Automated control of watering, lighting, and climate settings based on sensor data.</li>
                  <li>User registration and login with cloud data storage for multi-device access.</li>
                  <li>AI Chatbot for plant identification, care recommendations, and user assistance.</li>
               </ul>
            </section>

            <section id="non-functional">
               <h3>🔍 Non-functional Requirements</h3>
               <ul>
                  <li>User-friendly interface with tutorial and accessibility features for non-technical users.</li>
                  <li>Notifications for sensor wear, water levels, and sunlight conditions.</li>
                  <li>Regular recommendations to update care settings based on plant growth cycles.</li>
               </ul>
            </section>

            <section id="design">
               <h3>💡 Conceptual Design</h3>
               <p>
                  The system comprises a microcontroller connected to various sensors and actuators, programmed using Python. A mobile app, developed with Flutter or React Native, interacts with a cloud-hosted backend, providing a seamless experience for users to monitor and manage their plants.
               </p>
            </section>

            <section id="example-design">
               <h3>🎨 Example Design of Product</h3>
               <img src={productDesignImage} alt="Example design of Plant Parent" className="plant-photo" />
               <div className="wow-section">
                  <h4>Let's take our plants from struggling to thriving!</h4>
                  <div className="plant-images">
                     <img src={plantImage1} alt="Struggling plant" className="plant-photo" />
                     <span className="arrow">➡️</span>
                     <img src={plantImage2} alt="Flourishing plant" className="plant-photo" />
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
}

export default About;