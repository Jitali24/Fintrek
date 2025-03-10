import { motion } from 'framer-motion';
import { ArrowRight, PiggyBank, TrendingUp, Shield } from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4 py-16">
      <motion.div 
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
          Smart Finance Management with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Fintrek
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-12">
          Take control of your finances with our intuitive expense tracking and analytics platform
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 transition-transform duration-200 hover:scale-[1.02]">
            <PiggyBank className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Save Money</h3>
            <p className="text-gray-400">Track expenses and discover saving opportunities</p>
          </div>

          <div className="p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 transition-transform duration-200 hover:scale-[1.02]">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Track Growth</h3>
            <p className="text-gray-400">Visualize your financial progress over time</p>
          </div>

          <div className="p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 transition-transform duration-200 hover:scale-[1.02]">
            <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Stay Secure</h3>
            <p className="text-gray-400">Your financial data is always protected</p>
          </div>
        </div>

        <motion.button
          onClick={onGetStarted}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Get Started Now</span>
          <ArrowRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </div>
  );
}