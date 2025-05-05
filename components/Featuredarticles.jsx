'use client';
import { motion } from "framer-motion";
import { useArticles } from "@/context/ArticleContext";

const cards = [
  { title: "Right to Constitutional Remedies (Article 32)", content: "This article, termed the heart and soul of the Constitution by Dr. B.R. Ambedkar, empowers citizens to approach the Supreme Court directly for the enforcement of fundamental rights. It ensures that rights are not merely paper declarations but can be actively protected through legal remedies like writs (habeas corpus, mandamus, etc.)." },
  { title: " Protection in Respect of Conviction for Offences (Article 20)", content: "This article protects individuals against arbitrary and retrospective criminal laws. It prohibits double jeopardy (being tried twice for the same offense), self-incrimination, and retrospective criminal legislation, reinforcing the idea of fair justice.." },
  { title: "Equality Before Law (Article 14)", content: "Ensures that every individual is treated equally before the law and prohibits discrimination by the State. It is the foundation of the Indian legal system’s commitment to equal justice and is invoked in many landmark judgments related to gender, caste, and class discrimination." },
  { title: "Right to Education (Article 21A)", content: "Introduced by the 86th Amendment, this article mandates free and compulsory education for children aged 6 to 14 years. It recognizes education as a fundamental right and lays the groundwork for a literate and empowered society." },
  { title: "Directive Principles of State Policy (Part IV, Article 36–51)", content: "These are non-justiciable principles aimed at guiding the State in governance. They cover social and economic rights, such as the promotion of welfare, equitable distribution of resources, and improvement of public health, bridging the gap between law and justice." },
];

export default function Home() {
    const {articles}=useArticles();
    console.log(articles)
  return (
    <main className="min-h-screen bg-orange-100 flex items-center justify-center overflow-hidden mt-16">
      <div className="relative w-full">
      <div className="flex justify-center items-center my-10">
      <h1 className="text-5xl font-bold text-center text-orange-800">
     Featured Articles
    </h1>
   </div>

        <motion.div
          className="flex  flex-wrap w-max space-x-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...cards, ...cards].map((card, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-orange-200 p-6 rounded-2xl shadow-lg h-75 w-100"
            >
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-black-100 text-sm">{card.content}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
