
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
}

interface HealthNewsProps {
  condition: string;
}

const HealthNews: React.FC<HealthNewsProps> = ({ condition }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Mock news data based on condition
    const mockNewsForCondition = (condition: string): NewsItem[] => {
      // Create varied news items based on the condition
      const conditionName = condition.toLowerCase();
      
      return [
        {
          title: `New Research on ${condition} Treatment Shows Promise`,
          description: `A recent clinical trial for ${condition} has shown significant improvements in patient outcomes using a novel approach combining traditional therapy with emerging medications.`,
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhbCUyMHJlc2VhcmNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
          source: "Medical Research Journal",
          publishedAt: "2025-05-01"
        },
        {
          title: `Lifestyle Modifications That May Help Manage ${condition}`,
          description: `Experts have identified several key lifestyle changes that can significantly impact the progression and symptoms of ${condition}, including dietary adjustments and specific types of physical activity.`,
          url: "#",
          source: "Health & Prevention",
          publishedAt: "2025-04-22"
        },
        {
          title: `Understanding the Genetic Factors Behind ${condition}`,
          description: `A groundbreaking genomic study has identified several key genetic markers associated with ${condition}, potentially opening the door to more personalized treatment approaches and earlier intervention.`,
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXRpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
          source: "Genomics Today",
          publishedAt: "2025-04-15"
        },
        {
          title: `Community Support Programs for ${condition} Patients Show Benefits`,
          description: `A nationwide study of peer support groups for people with ${condition} has demonstrated measurable improvements in quality of life metrics and treatment adherence.`,
          url: "#",
          source: "Community Health Initiative",
          publishedAt: "2025-04-08"
        },
        {
          title: `Tech Innovation: New App Helps Monitor ${condition} Symptoms`,
          description: `A smartphone application designed specifically for ${condition} patients has been shown to improve symptom tracking and communication with healthcare providers, leading to better management outcomes.`,
          url: "#",
          imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
          source: "Digital Health News",
          publishedAt: "2025-04-03"
        }
      ];
    };
    
    // Simulate API fetch delay
    setTimeout(() => {
      setNews(mockNewsForCondition(condition));
      setLoading(false);
    }, 800);
  }, [condition]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <ScrollArea className="h-[450px]">
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3 h-32 bg-gray-100 relative">
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
      ) : (
        <div className="space-y-6">
          {news.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {item.imageUrl && (
                    <div className="md:w-1/3 h-32 bg-gray-100 relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className={item.imageUrl ? "md:w-2/3" : "w-full"}>
                    <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default HealthNews;
