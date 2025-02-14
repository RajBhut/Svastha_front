import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Send, ArrowLeft } from "lucide-react";

const QuestionnaireForm = () => {
  const { therapyType } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [is_static_over, setis_static_over] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const an = Object.values(answers);
    if (an.length !== questions[therapyType].length) {
      return;
    }

    let data = questions[therapyType]
      .map((q, index) => `Question: ${q.question}\nAnswer: ${an[index]}`)
      .join("\n\n");

    console.log(data);
    setis_static_over(true);

    try {
      await axios.post(`${CHAT_URL}/questions`, {
        patient_narrative: data,
      });
      navigate("/chat");
    } catch (error) {
      console.error(error);
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                <span className="gradient-text">
                  {therapyType?.charAt(0).toUpperCase() + therapyType?.slice(1)}
                </span>{" "}
                Therapy Assessment
              </h1>

              <p className="text-gray-600 text-center mb-8">
                Help us understand your needs better by answering a few
                questions
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!is_static_over &&
                  questions[therapyType]?.map((q) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
                      />
                    </motion.div>
                  ))}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  disabled={
                    Object.keys(answers).length !==
                    questions[therapyType]?.length
                  }
                >
                  <span>Continue to Chat</span>
                  <Send size={20} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuestionnaireForm;
