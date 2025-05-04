
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { medicalConditions } from "@/data/medicalData";

interface HealthTopicsProps {
  onSelectTopic: (topic: string) => void;
}

const HealthTopics: React.FC<HealthTopicsProps> = ({ onSelectTopic }) => {
  // Group medical conditions by category
  const groupedConditions = {
    "Heart & Circulation": [
      "Hypertension (High Blood Pressure)",
      "Hyperlipidemia (High Cholesterol)",
      "Coronary Artery Disease",
      "Atrial Fibrillation",
      "Heart Failure",
      "Deep Vein Thrombosis",
    ],
    "Respiratory": [
      "Asthma",
      "COPD (Chronic Obstructive Pulmonary Disease)",
      "Emphysema",
      "Bronchitis",
      "Pneumonia",
    ],
    "Mental Health": [
      "Depression",
      "Anxiety Disorder",
      "Bipolar Disorder",
      "PTSD (Post-Traumatic Stress Disorder)",
      "Schizophrenia",
      "Insomnia",
    ],
    "Digestive": [
      "GERD (Gastroesophageal Reflux Disease)",
      "Peptic Ulcer Disease",
      "Irritable Bowel Syndrome",
      "Crohn's Disease",
      "Ulcerative Colitis",
      "Cirrhosis",
    ],
    "Endocrine": [
      "Type 1 Diabetes",
      "Type 2 Diabetes",
      "Hypothyroidism",
      "Hyperthyroidism",
      "Polycystic Ovary Syndrome",
    ],
    "Musculoskeletal": [
      "Osteoarthritis",
      "Rheumatoid Arthritis",
      "Osteoporosis",
      "Fibromyalgia",
      "Gout",
    ],
  };

  // Colors for categories
  const categoryColors: Record<string, string> = {
    "Heart & Circulation": "from-red-100 to-red-50 text-red-800",
    "Respiratory": "from-blue-100 to-blue-50 text-blue-800",
    "Mental Health": "from-purple-100 to-purple-50 text-purple-800", 
    "Digestive": "from-amber-100 to-amber-50 text-amber-800",
    "Endocrine": "from-green-100 to-green-50 text-green-800",
    "Musculoskeletal": "from-orange-100 to-orange-50 text-orange-800",
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedConditions).map(([category, conditions]) => (
        <Card key={category} className={`p-4 bg-gradient-to-r ${categoryColors[category] || "from-gray-100 to-gray-50"}`}>
          <h3 className={`text-lg font-bold mb-3 ${categoryColors[category]?.split(" ").pop() || "text-gray-800"}`}>{category}</h3>
          <div className="flex flex-wrap gap-2">
            {conditions.map((condition, index) => (
              <Badge
                key={index}
                className="cursor-pointer bg-white hover:bg-opacity-80 transition-all"
                onClick={() => onSelectTopic(condition)}
              >
                {condition}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HealthTopics;
