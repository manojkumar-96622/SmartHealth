import { motion } from "framer-motion";
import { Sparkles, HeartPulse, Users } from "lucide-react";

export const About = () => {
  const team = [
    { name: "Manojkumar Adepu", title: "Full Stack Developer" },
    { name: "Anu Kumar", title: "Frontend Developer (React & UI Design)" },
    { name: "Rajesh", title: "Backend Developer (Firebase & API)" },
    { name: "Vamshi kumar", title: "AI Model Integrator (TensorFlow.js)" },
    { name: "Vamshi", title: "UI/UX Designer & Documentation Lead" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8F9FA] to-[#E3F2FD] dark:from-[#0D1117] dark:to-[#0A0F1C] text-gray-900 dark:text-gray-100 py-20 px-6">
      {/* Animated Background Glow */}
      <motion.div
        className="absolute -top-20 left-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      ></motion.div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center space-y-4"
        >
          <HeartPulse className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">
            About Our Vision
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            This platform represents our vision for the future of digital health — an AI-driven ecosystem that connects technology, data, and people. With intelligent health scanning, progress tracking, and real-time insights, we’re redefining how individuals take charge of their wellness journey.
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full my-10"
        ></motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center space-y-3 mb-10"
        >
          <Users className="w-10 h-10 text-blue-500 dark:text-cyan-400" />
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-300 dark:to-cyan-200 text-transparent bg-clip-text">
            Meet the Innovators
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A passionate team dedicated to blending technology and wellness.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              className="relative bg-white/80 dark:bg-[#161B22]/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-2xl"></div>
              <motion.div
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white flex items-center justify-center text-2xl font-bold shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                {member.name.charAt(0)}
              </motion.div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            “We didn’t just build an app — we built a vision for healthier, smarter living.”
          </p>
        </motion.div>

        {/* Footer Section */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-10 text-gray-500 dark:text-gray-400 text-sm"
        >
          © {new Date().getFullYear()} Team Smart Health — Built with using React, Tailwind, Framer Motion & Firebase.
        </motion.p>
      </div>
    </div>
  );
};
