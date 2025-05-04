
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
      // Using free NewsAPI
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}+health+medical&language=en&pageSize=10&sortBy=publishedAt&apiKey=bb3a36bf011e47789d15c7012fe9dfc5`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'error') {
        toast({
          title: "Error fetching news",
          description: data.message || "Failed to load news articles",
          variant: "destructive"
        });
        setNews([]);
        setError("Failed to load news articles. Please try again later.");
      } else if (data.articles && data.articles.length > 0) {
        setNews(data.articles);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      toast({
        title: "Error",
        description: "Failed to load news articles. Please try again later.",
        variant: "destructive"
      });
      setError("Failed to load news articles. Please try again later.");
      setNews([]);
    } finally {
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
      
      <ScrollArea className="h-[500px] pr-4">
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
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.length > 0 ? news.map((item, index) => (
              <Card key={index} className="overflow-hidden border-medical-light hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.urlToImage && (
                      <div className="md:w-1/3 h-40 bg-gray-100 relative rounded-md overflow-hidden">
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
                      <h3 className="font-heading font-semibold text-lg mb-2 text-medical-text">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                        <Badge variant="outline" className="bg-medical-light bg-opacity-30 text-medical-text border-0">{item.source.name}</Badge>
                        <div className="flex items-center space-x-3">
                          <span className="mr-2">{formatDate(item.publishedAt)}</span>
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-medical-text text-white px-3 py-1 rounded hover:bg-medical-dark transition-colors"
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
                <p className="text-gray-500">No news found for "{condition}". Try a different search term.</p>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Enter a health topic above to search for relevant news.</p>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default HealthNews;
