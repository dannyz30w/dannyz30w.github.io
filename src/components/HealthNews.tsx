
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

  useEffect(() => {
    if (!condition || condition.trim() === '') return;
    
    fetchRealNews(condition);
  }, [condition]);

  const fetchRealNews = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // We're using the GNews API as an example - in a real app, you would use your own API key
      // Free public endpoint with limited results for demo purposes
      const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}+health+medical&lang=en&max=10&apikey=9603c17cfae1069a0bea54f3d4148fa0`);
      const data = await response.json();
      
      if (data.errors) {
        setError('Failed to load news articles. Please try again later.');
        setNews([]);
      } else if (data.articles && data.articles.length > 0) {
        setNews(data.articles.map((article: any) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.image,
          source: {
            name: article.source?.name || 'Unknown Source'
          },
          publishedAt: article.publishedAt
        })));
      } else {
        // If no results found for the specific query
        setNews([]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news articles. Please try again later.');
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
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.length > 0 ? news.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.urlToImage && (
                      <div className="md:w-1/3 h-32 bg-gray-100 relative">
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
                      <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                        <Badge variant="outline">{item.source.name}</Badge>
                        <div className="flex items-center">
                          <span className="mr-2">{formatDate(item.publishedAt)}</span>
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 flex items-center"
                          >
                            <ExternalLink className="h-4 w-4" />
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
