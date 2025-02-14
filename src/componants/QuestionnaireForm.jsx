import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Send, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";

const QuestionnaireForm = () => {
  const { therapyType } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [isStaticOver, setIsStaticOver] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [followUpAnswers, setFollowUpAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const CHAT_URL = import.meta.env.VITE_CHAT_API_URL;

  const questions = {
    individual: [
      { id: 1, question: "What brings you to therapy today?" },
      { id: 2, question: "Have you been to therapy before?" },
      {
        id: 3,
        question: "Are you currently experiencing anxiety or depression?",
      },
      { id: 4, question: "What are your goals for therapy?" },
    ],
    child: [
      { id: 1, question: "What concerns do you have about your child?" },
      {
        id: 2,
        question: "Has your child experienced any recent life changes?",
      },
      { id: 3, question: "How is your child doing in school?" },
      { id: 4, question: "What are your goals for your child's therapy?" },
    ],
    couple: [
      { id: 1, question: "How long have you been together?" },
      { id: 2, question: "What are the main issues you'd like to address?" },
      { id: 3, question: "Have you tried couples therapy before?" },
      { id: 4, question: "What are your goals for couples therapy?" },
    ],
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    const an = Object.values(answers);
    if (an.length !== questions[therapyType].length) {
      return;
    }

    let data = questions[therapyType]
      .map((q, index) => `Question: ${q.question}\nAnswer: ${an[index]}`)
      .join("\n\n");

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://83f7-35-230-33-203.ngrok-free.app/diagnose/questions`,
        {
          patient_narrative: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (JSON.parse(response.data)?.["Clarifying Questions"]) {
        const clarifyingQuestions = Array.isArray(
          JSON.parse(response.data)["Clarifying Questions"]
        )
          ? JSON.parse(response.data)["Clarifying Questions"]
          : [JSON.parse(response.data)["Clarifying Questions"]];

        setFollowUpQuestions(clarifyingQuestions);
        setIsStaticOver(true);
      } else {
        // If no follow-up questions, proceed to chat
        await submitToChat(data);
        navigate("/chat");
      }
    } catch (error) {
      setError("Failed to process your responses. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitToChat = async (data) => {
    try {
      await axios.post(
        `https://83f7-35-230-33-203.ngrok-free.app/diagnose/diagnosis`,
        {
          patient_narrative: data,
        }
      );
    } catch (error) {
      throw new Error("Failed to submit to chat");
    }
  };

  const handleFollowUpSubmit = async (e) => {
    e.preventDefault();

    if (!followUpAnswers[followUpQuestions[currentQuestionIndex]]) {
      setError("Please provide an answer before continuing");
      return;
    }

    if (currentQuestionIndex < followUpQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setError(null);
    } else {
      setIsLoading(true);
      setError(null);

      const allAnswers = {
        initialResponses: questions[therapyType]
          .map((q, index) => `${q.question}: ${Object.values(answers)[index]}`)
          .join("\n"),
        followUpResponses: Object.entries(followUpAnswers)
          .map(([question, answer]) => `${question}: ${answer}`)
          .join("\n"),
      };

      try {
        await submitToChat(JSON.stringify(allAnswers));
        navigate("/chat");
      } catch (error) {
        setError("Failed to submit responses. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <motion.button
                whileHover={{ x: -5 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </motion.button>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </motion.div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                <span className="gradient-text">
                  {therapyType?.charAt(0).toUpperCase() + therapyType?.slice(1)}
                </span>{" "}
                Therapy Assessment
              </h1>

              <p className="text-gray-600 text-center mb-8">
                {!isStaticOver
                  ? "Help us understand your needs better by answering a few questions"
                  : "Please answer these additional questions to help us better understand your situation"}
              </p>

              {!isStaticOver ? (
                <form onSubmit={handleInitialSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {questions[therapyType]?.map((q) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: q.id * 0.1 }}
                        className="space-y-2"
                      >
                        <label className="block text-lg text-gray-700 font-medium">
                          {q.question}
                        </label>
                        <textarea
                          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white/50"
                          rows="3"
                          placeholder="Your answer..."
                          onChange={(e) =>
                            setAnswers({
                              ...answers,
                              [q.id]: e.target.value,
                            })
                          }
                          required
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                    disabled={
                      Object.keys(answers).length !==
                        questions[therapyType]?.length || isLoading
                    }
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <span>Continue</span>
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <form onSubmit={handleFollowUpSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <label className="block text-lg text-gray-700 font-medium">
                          {followUpQuestions[currentQuestionIndex]}
                        </label>
                        <textarea
                          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white/50"
                          rows="3"
                          placeholder="Your answer..."
                          onChange={(e) =>
                            setFollowUpAnswers({
                              ...followUpAnswers,
                              [followUpQuestions[currentQuestionIndex]]:
                                e.target.value,
                            })
                          }
                          value={
                            followUpAnswers[
                              followUpQuestions[currentQuestionIndex]
                            ] || ""
                          }
                          required
                        />
                      </motion.div>
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <span>
                            {currentQuestionIndex < followUpQuestions.length - 1
                              ? "Next Question"
                              : "Complete Assessment"}
                          </span>
                          <Send size={20} />
                        </>
                      )}
                    </motion.button>

                    <div className="flex justify-center gap-2 mt-4">
                      {followUpQuestions.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentQuestionIndex
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuestionnaireForm;
