
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from 'lucide-react';

const healthCategories = [
  "general", "mental health", "heart disease", "diabetes", "cancer"
];

interface NewsItem {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
}

const NewsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Mock news data since we don't have a real API connection
    const mockNews: Record<string, NewsItem[]> = {
      "general": [
        {
          title: "New Study Shows Benefits of Mediterranean Diet for Overall Health",
          description: "Researchers found that following a Mediterranean diet rich in olive oil, nuts, and vegetables can reduce risk factors for heart disease and improve cognitive function.",
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
          source: "Health Journal",
          publishedAt: "2025-05-01"
        },
        {
          title: "CDC Updates COVID-19 Vaccination Guidelines",
          description: "The Centers for Disease Control has released new recommendations for COVID-19 boosters, suggesting annual shots for most adults.",
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZhY2NpbmF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
          source: "Public Health Reports",
          publishedAt: "2025-04-28"
        },
        {
          title: "Sleep Quality Linked to Long-term Cognitive Health",
          description: "A long-term study spanning 25 years found that consistent quality sleep during middle age correlates with better cognitive function later in life.",
          url: "#",
          source: "Neuroscience Today",
          publishedAt: "2025-04-25"
        },
      ],
      "mental health": [
        {
          title: "Mindfulness Practices Show Promise for Anxiety Reduction",
          description: "Clinical trials demonstrate that regular mindfulness meditation can significantly reduce symptoms of generalized anxiety disorder.",
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          source: "Psychology Research",
          publishedAt: "2025-05-02"
        },
        {
          title: "Digital Therapy Apps Gain Recognition from Healthcare Providers",
          description: "Several mental health apps are now being prescribed by doctors as part of treatment plans for depression and anxiety.",
          url: "#",
          source: "Digital Health Review",
          publishedAt: "2025-04-20"
        },
        {
          title: "Workplace Mental Health Programs Show Return on Investment",
          description: "Companies implementing robust mental health support programs report lower turnover rates and higher productivity.",
          url: "#",
          source: "Business Health Magazine",
          publishedAt: "2025-04-15"
        },
      ],
      "heart disease": [
        {
          title: "New Blood Test Can Predict Heart Attack Risk Years in Advance",
          description: "Researchers have developed a blood marker test that can identify patients at risk for heart attacks up to 5 years before symptoms appear.",
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhcnQlMjBoZWFsdGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
          source: "Cardiology Innovations",
          publishedAt: "2025-05-03"
        },
        {
          title: "Plant-Based Diet Shown to Reverse Heart Disease in Some Patients",
          description: "A clinical study found that a strict whole-food, plant-based diet was able to reverse coronary artery disease in 73% of patients after one year.",
          url: "#",
          source: "Nutritional Medicine Journal",
          publishedAt: "2025-04-22"
        },
        {
          title: "Daily Movement More Important Than Intense Exercise for Heart Health",
          description: "Research suggests that consistent daily movement throughout the day may be more beneficial for heart health than periodic intense exercise sessions.",
          url: "#",
          source: "Preventive Cardiology",
          publishedAt: "2025-04-18"
        },
      ],
      "diabetes": [
        {
          title: "Artificial Pancreas Systems Improve Quality of Life for Type 1 Diabetes Patients",
          description: "Advanced closed-loop insulin delivery systems are showing significant improvements in glycemic control and quality of life measures.",
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhYmV0ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
          source: "Endocrinology Updates",
          publishedAt: "2025-05-01"
        },
        {
          title: "Time-Restricted Eating Shows Promise for Type 2 Diabetes Management",
          description: "Studies indicate that limiting food intake to an 8-10 hour window each day can improve insulin sensitivity and help manage type 2 diabetes.",
          url: "#",
          source: "Metabolic Research",
          publishedAt: "2025-04-25"
        },
        {
          title: "Virtual Diabetes Education Programs as Effective as In-Person Training",
          description: "Research demonstrates that virtual diabetes self-management education programs achieve similar outcomes to traditional face-to-face programs.",
          url: "#",
          source: "Telemedicine Journal",
          publishedAt: "2025-04-12"
        },
      ],
      "cancer": [
        {
          title: "Early Detection Blood Test for Multiple Cancers Enters Final Clinical Trials",
          description: "A promising blood test that can detect up to 50 types of cancer before symptoms appear is now in phase III clinical trials.",
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1631563019676-dade0dc91a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FuY2VyJTIwcmVzZWFyY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
          source: "Oncology Research",
          publishedAt: "2025-05-02"
        },
        {
          title: "Immunotherapy Combination Shows Promising Results for Advanced Melanoma",
          description: "A new combination immunotherapy approach has doubled survival rates in patients with advanced melanoma compared to standard treatments.",
          url: "#",
          source: "Clinical Cancer Research",
          publishedAt: "2025-04-27"
        },
        {
          title: "Machine Learning Algorithm Improves Accuracy of Mammogram Readings",
          description: "An AI-based algorithm has been shown to reduce false positives in mammogram screenings by 32% while maintaining detection sensitivity.",
          url: "#",
          source: "Medical Imaging Quarterly",
          publishedAt: "2025-04-19"
        },
      ]
    };
    
    // Simulate API fetch delay
    setTimeout(() => {
      setNews(mockNews[activeCategory] || []);
      setLoading(false);
    }, 800);
  }, [activeCategory]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Health News</h2>
        <p className="text-gray-600">Stay informed with the latest health and medical research</p>
      </div>

      <Tabs 
        value={activeCategory} 
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <div className="mb-4 overflow-x-auto">
          <TabsList className="inline-flex w-auto min-w-full border-b border-gray-200 pb-1 pt-1 overflow-x-auto">
            {healthCategories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="px-4 py-2 capitalize whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <ScrollArea className="h-[450px] pr-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-100 relative">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-3" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  {item.imageUrl && (
                    <div className="h-48 bg-gray-100 relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className={`p-4 ${!item.imageUrl ? 'pt-5' : ''}`}>
                    <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{item.description}</p>
                    <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                      <Badge variant="outline">{item.source}</Badge>
                      <div className="flex items-center">
                        <span className="mr-2">{formatDate(item.publishedAt)}</span>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 flex items-center"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default NewsSection;
