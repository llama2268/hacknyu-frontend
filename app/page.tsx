"use client";

import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import Image from "next/image"

export default function Home() {
  return (
    <main className="scroll-smooth">
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
        <div className="text-2xl font-bold text-white">Fridge</div>
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              href="#features"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="#how-it-works"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              href="#testimonials"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
        <Link
          className="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
          href="/login"
        >
          Log In
        </Link>
      </nav>

      <section
        className="relative flex items-center justify-center w-full h-screen text-center"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 container mx-auto px-4">
          <p className="mb-4 text-xl font-medium uppercase tracking-wider text-gray-300 animate-fadeIn delay-200">
            Revolutionize Your Meal Prep
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white animate-fadeIn delay-400">
            Your AI-Powered <br /> Meal Prep Assistant
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-2xl text-gray-200 animate-fadeIn delay-600">
            Achieve your fitness goals with personalized meal plans based on your available
            ingredients, dietary needs, and cooking skills.
          </p>
          <div className="mt-8 flex justify-center gap-6 animate-fadeIn delay-800">
            <Link
              className={buttonStyles({
                color: "primary",
                radius: "full",
                size: "lg",
                variant: "shadow",
              })}
              href="/login"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={title({
              class: "text-center text-4xl font-semibold text-gray-800",
            })}
          >
            Key Features
          </h2>
          <p
            className={subtitle({
              class: "mt-4 text-center text-lg text-gray-600",
            })}
          >
            Advanced features to make healthy cooking effortless.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Personalized Meal Plan
          </h2>
          <div className="flex flex-col items-center">
            <Image
              src="/card1.jpg"
              alt="Personalized Meal Plan"
              width={800}
              height={500}
              className="rounded-lg shadow-lg"
            /></div>
              <p className="mt-3 text-gray-600">
                Tailor-made schedules that align with your goals and available ingredients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Smart Ingredient Management
              </h2>
              <div className="flex flex-col items-center">
            <Image
              src="/card2.jpg"
              alt="Personalized Meal Plan"
              width={800}
              height={500}
              className="rounded-lg shadow-lg"
            /></div>
              <p className="mt-3 text-gray-600">
                Optimize your groceries and reduce waste through intelligent recommendations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Community & Sharing
              </h2>
              <div className="flex flex-col items-center">
            <Image
              src="/card3.jpg"
              alt="Personalized Meal Plan"
              width={800}
              height={500}
              className="rounded-lg shadow-lg"
            /></div>
              <p className="mt-3 text-gray-600">
                Discover, save, and share recipes with a community passionate about healthy
                living.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={title({
              class: "text-center text-4xl font-semibold text-gray-800",
            })}
          >
            How It Works
          </h2>
          <p
            className={subtitle({
              class: "mt-4 text-center text-lg text-gray-600",
            })}
          >
            A few simple steps to a healthier lifestyle.
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-700">
                Step 1: Set Your Goals
              </h3>
              <p className="mt-3 text-gray-600">
                Define your fitness objectives and dietary preferences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-700">
                Step 2: Input Your Ingredients
              </h3>
              <p className="mt-3 text-gray-600">
                Tell us what you have in your kitchen; we’ll create the perfect plan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-700">
                Step 3: Enjoy Your Meals
              </h3>
              <p className="mt-3 text-gray-600">
                Get a tailor-made recipe schedule and start cooking!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2
            className={title({
              class: "text-center text-4xl font-semibold text-gray-800",
            })}
          >
            Testimonials
          </h2>
          <p
            className={subtitle({
              class: "mt-4 text-center text-lg text-gray-600",
            })}
          >
            Hear what our users have to say.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-600 italic">
                "Fridge has transformed my meal prep! The personalized plans take the guesswork out of healthy eating."
              </p>
              <p className="mt-4 font-bold text-gray-700">- Alex</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-600 italic">
                "I love the smart ingredient management. It’s like having a personal nutrition coach in my kitchen."
              </p>
              <p className="mt-4 font-bold text-gray-700">- Jamie</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-600 italic">
                "A game changer for busy professionals. Quick, healthy, and delicious meal plans at my fingertips."
              </p>
              <p className="mt-4 font-bold text-gray-700">- Taylor</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="get-started" className="py-16 bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className={title({ class: "text-3xl md:text-5xl font-bold" })}>
            Ready to transform your meal prep?
          </h2>
          <p className={subtitle({ class: "mt-4 text-lg md:text-2xl" })}>
            Join Fridge today and revolutionize the way you eat!
          </p>
          <div className="mt-8">
            <Link
              className={buttonStyles({
                color: "primary",
                radius: "full",
                size: "lg",
                variant: "shadow",
              })}
              href="/login"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
