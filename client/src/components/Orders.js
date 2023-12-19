import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const studySuggestions = {
    mathematics: {
      progress: [
        "Explore the World of Matrices: Matrices are an exciting topic! Dive into this area to strengthen your skills and solve quizzes for reinforcement.",
        "Unleash the Power of Complex Numbers: Spend extra time exploring complex numbers to enhance your mathematical toolkit.",
      ],
      areasToExplore: [
        "Discover the World of Sound Waves: Sound waves are captivating! Spend extra time understanding them and consider conducting simple experiments for a hands-on approach.",
        "Dig Deeper into Acids and Bases: Focus on the properties of acids, bases, and salts to uncover new insights.",
      ],
    },
    science: {
      progress: [
        "Exceptional Understanding of Forces: Your grasp of forces and pressure is impressive. Try relating these concepts to real-life scenarios to deepen your understanding.",
        "Exemplary Knowledge of Chemical Reactions: You've shown great understanding. Dive deeper into chemical reactions and explore their applications for a richer experience.",
      ],
      areasToExplore: [
        "Discover the World of Sound Waves: Sound waves are captivating! Spend extra time understanding them and consider conducting simple experiments for a hands-on approach.",
        "Dig Deeper into Acids and Bases: Focus on the properties of acids, bases, and salts to uncover new insights.",
      ],
    },
    englishLanguageArts: {
      progress: [
        "Analytical Skills in Literature: Your ability to analyze literature is excellent. Continue discussing themes and characters with peers to enrich your insights.",
        "Spot-On Grammar Usage: Your grammar skills are impressive. Challenge yourself with more complex sentence structures to showcase your language prowess.",
      ],
      areasToExplore: [
        "Fine-Tune Tenses Usage: Pay extra attention to tenses in sentences. Practice through writing exercises to refine your language skills.",
        "Enhance Comprehension Skills: Work on reading comprehension. Focus on understanding the context and drawing inferences to elevate your comprehension skills.",
      ],
    },
    socialStudies: {
      progress: [
        "Expertise in Indian History: Your knowledge of Indian history is commendable. Explore lesser-known facts about different dynasties to become a history enthusiast.",
        "Geography Enthusiast: Continue exploring physical features. Dive into the geography of neighboring countries to expand your geographical knowledge.",
      ],
      areasToExplore: [
        "Dig Deeper into Ancient History: While strong in medieval history, explore ancient Indian history for a comprehensive view of our rich heritage.",
        "Detailed Study of Climate Zones: Focus on a detailed study of climate and vegetation zones. Understand their impact on regions for a holistic understanding.",
      ],
    },
    generalStudyHabits: [
      "Master Time Management: Fine-tune your study timetable. Ensure adequate time for all subjects, including revision, to enhance your efficiency.",
      "Refine Note-Taking Skills: Work on organizing notes systematically. Create a system that works best for quick revision to boost your study habits.",
      "Experiment with New Study Techniques: Explore different study techniques to find what suits your learning style best. It's an exciting journey of self-discovery!",
    ],
  };
  
  function getRandomStudySuggestion() {
    // Choose a random category (e.g., mathematics, science, etc.)
    const categories = Object.keys(studySuggestions);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
    // Choose a random progress or areaToExplore suggestion within the selected category
    const suggestionsInCategory = studySuggestions[randomCategory];
    const randomSuggestionType = Math.random() < 0.5 ? "progress" : "areasToExplore";
    const suggestions = suggestionsInCategory[randomSuggestionType];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  
    return randomSuggestion;
  }
  React.useEffect(()=>{
    const randomStudySuggestion = getRandomStudySuggestion();
console.log(randomStudySuggestion);
  },[])
  return (
   <>

   
   </>
  );
}
