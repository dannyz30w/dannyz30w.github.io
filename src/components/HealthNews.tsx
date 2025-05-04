
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

interface HealthNewsProps {
  condition: string;
}

// Sample news data to use instead of API
const sampleNewsData = {
  "general": [
    {
      title: "New Research Shows Health Benefits of Mediterranean Diet",
      description: "A large-scale study has found that following a Mediterranean diet can significantly reduce the risk of cardiovascular disease and improve longevity.",
      url: "https://www.healthline.com/nutrition/mediterranean-diet-meal-plan",
      urlToImage: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/Mediterranean-Diet-1296x728-Header.jpg?w=1155&h=1528",
      source: { name: "Healthline" },
      publishedAt: "2025-05-01T14:30:00Z"
    },
    {
      title: "CDC Updates COVID-19 Guidelines for Summer 2025",
      description: "The Centers for Disease Control has released new COVID-19 guidelines for summer activities as new variants continue to emerge.",
      url: "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
      urlToImage: "https://www.cdc.gov/coronavirus/2019-ncov/images/your-health/COVID-treatment-now-available_1200x675.jpg",
      source: { name: "CDC" },
      publishedAt: "2025-04-28T09:15:00Z"
    },
    {
      title: "Study Links Regular Exercise to Improved Mental Health",
      description: "Researchers have found that even moderate physical activity can significantly reduce symptoms of depression and anxiety.",
      url: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise/art-20048389",
      urlToImage: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/11/15/17/35/ds00520_-ds00934_-ds00938_-ds00962_im02313_ww5r236t_jpg.jpg",
      source: { name: "Mayo Clinic" },
      publishedAt: "2025-04-25T11:45:00Z"
    }
  ],
  "diabetes": [
    {
      title: "Breakthrough in Diabetes Treatment: New Insulin Delivery System",
      description: "A revolutionary insulin delivery system could make diabetes management easier and more effective for millions of patients.",
      url: "https://www.diabetes.org/",
      urlToImage: "https://www.diabetes.org/sites/default/files/styles/crop_large/public/2020-06/Healthy%20Living%20Resources_3.jpg",
      source: { name: "American Diabetes Association" },
      publishedAt: "2025-05-03T16:20:00Z"
    },
    {
      title: "Diet Strategies for Managing Type 2 Diabetes",
      description: "Nutritionists recommend these dietary approaches for better blood sugar control in type 2 diabetes patients.",
      url: "https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/diabetes-diet/art-20044295",
      urlToImage: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/11/15/17/39/diabetes-eating-8col.jpg",
      source: { name: "Mayo Clinic" },
      publishedAt: "2025-04-29T10:10:00Z"
    }
  ],
  "heart disease": [
    {
      title: "New Blood Test Could Predict Heart Attack Risk Years in Advance",
      description: "Scientists have developed a blood test that can identify patients at high risk for heart attacks up to five years before they occur.",
      url: "https://www.heart.org/",
      urlToImage: "https://www.heart.org/-/media/Images/News/2022/February-2022/0204NewsBidenHeartMonth_SC.jpg",
      source: { name: "American Heart Association" },
      publishedAt: "2025-05-02T13:40:00Z"
    },
    {
      title: "Heart-Healthy Exercises for All Fitness Levels",
      description: "Cardiologists recommend these exercises to improve heart health regardless of your current fitness level.",
      url: "https://www.mayoclinic.org/diseases-conditions/heart-disease/in-depth/heart-healthy-exercise/art-20046167",
      urlToImage: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/11/15/17/38/ad7_coronaryarterydisease.jpg",
      source: { name: "Mayo Clinic" },
      publishedAt: "2025-04-27T14:25:00Z"
    }
  ],
  "covid-19": [
    {
      title: "Long COVID Research Reveals New Treatment Options",
      description: "Researchers have identified several promising treatments for patients suffering from long-term COVID-19 symptoms.",
      url: "https://www.covid.gov/",
      urlToImage: "https://www.nih.gov/sites/default/files/news-events/research-matters/2021/20210112-covid.jpg",
      source: { name: "COVID.gov" },
      publishedAt: "2025-05-01T09:30:00Z"
    },
    {
      title: "Updated COVID-19 Vaccines Target Latest Variants",
      description: "New booster shots have been developed to provide better protection against emerging COVID-19 variants.",
      url: "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html",
      urlToImage: "https://www.cdc.gov/coronavirus/2019-ncov/images/vaccines/kids/GetVaccinated_600x350.jpg",
      source: { name: "CDC" },
      publishedAt: "2025-04-30T15:50:00Z"
    }
  ],
  "mental health": [
    {
      title: "Digital Therapy Apps Show Promise for Anxiety Treatment",
      description: "New research suggests that certain mental health apps can be as effective as traditional therapy for some anxiety disorders.",
      url: "https://www.nami.org/",
      urlToImage: "https://nami.org/NAMI/media/NAMI-Media/BlogImageArchive/2020/therapy-app-blog.jpg",
      source: { name: "National Alliance on Mental Illness" },
      publishedAt: "2025-05-02T11:15:00Z"
    },
    {
      title: "Workplace Mental Health Programs Gain Popularity",
      description: "More companies are implementing comprehensive mental health support for employees, showing positive results for both wellness and productivity.",
      url: "https://www.mayoclinic.org/diseases-conditions/mental-illness/symptoms-causes/syc-20374968",
      urlToImage: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/11/15/17/35/ds00414_-ds00603_-ds00704_-ds00789_im02356_r7_mentalillnessthu_jpg.jpg",
      source: { name: "Mayo Clinic" },
      publishedAt: "2025-04-26T12:20:00Z"
    }
  ]
};

const HealthNews: React.FC<HealthNewsProps> = ({ condition }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!condition || condition.trim() === '') return;
    
    fetchNews(condition);
  }, [condition]);

  const fetchNews = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Instead of fetching from the API, we'll use our sample data
      setTimeout(() => {
        const normalizedQuery = query.toLowerCase();
        
        // Try to match with specific condition data
        for (const [key, articles] of Object.entries(sampleNewsData)) {
          if (normalizedQuery.includes(key)) {
            setNews(articles);
            setLoading(false);
            return;
          }
        }
        
        // If no specific match found, return general health news
        setNews(sampleNewsData.general);
        setLoading(false);
      }, 800); // Simulate loading time
    } catch (err) {
      console.error('Error fetching news:', err);
      toast({
        title: "Error",
        description: "Failed to load news articles. Please try again later.",
        variant: "destructive"
      });
      setError("Failed to load news articles. Please try again later.");
      setNews([]);
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {condition && <h3 className="text-xl font-medium">Results for: "{condition}"</h3>}
      
      <ScrollArea className="h-[500px] pr-4 overflow-hidden">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 animate-pulse">
                <div className="md:w-1/3 h-32 bg-gray-100 dark:bg-gray-800 relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="md:w-2/3">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.length > 0 ? news.map((item, index) => (
              <Card key={index} className="overflow-hidden border-medical-light hover:shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.urlToImage && (
                      <div className="md:w-1/3 h-40 bg-gray-100 dark:bg-gray-700 relative rounded-md overflow-hidden">
                        <img 
                          src={item.urlToImage} 
                          alt={item.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className={item.urlToImage ? "md:w-2/3" : "w-full"}>
                      <h3 className="font-heading font-semibold text-lg mb-2 text-medical-text dark:text-blue-300">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <Badge variant="outline" className="bg-medical-light bg-opacity-30 text-medical-text dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 border-0">{item.source.name}</Badge>
                        <div className="flex items-center space-x-3">
                          <span className="mr-2">{formatDate(item.publishedAt)}</span>
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-medical-text text-white dark:bg-blue-700 px-3 py-1 rounded hover:bg-medical-dark dark:hover:bg-blue-600 transition-colors"
                          >
                            <span>Read</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : condition ? (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No news found for "{condition}". Try a different search term.</p>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">Enter a health topic above to search for relevant news.</p>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default HealthNews;
