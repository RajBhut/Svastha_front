import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handle_static_send = async () => {
    try {
      const res = await axios.post(`${CHAT_URL}/questions`, {
        patient_narrative: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const an = Object.values(answers);
    if (an.length != questions[therapyType].length) {
      return;
    }
    let data = "";
    for (let x = 0; x < questions[therapyType].length; x++) {
      data +=
        "Question: " +
        questions[therapyType][x].question +
        " Answer: " +
        an[x] +
        "\n";
    }

    console.log(data);
    setis_static_over(true);
  };

  return (
    <div className="min-h-screen bg-[#e5c3b9] p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-thin text-[#1a1a4d] text-center mb-8">
            {therapyType?.charAt(0).toUpperCase() + therapyType?.slice(1)}{" "}
            Therapy Questionnaire
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!is_static_over &&
              questions[therapyType]?.map((q) => (
                <div key={q.id} className="space-y-2">
                  <label className="block text-lg text-[#2d1c3b]">
                    {q.question}
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#66c7c7]"
                    rows="3"
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        [q.id]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#66c7c7] to-[#89e0e0] text-white py-3 rounded-full font-medium"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
