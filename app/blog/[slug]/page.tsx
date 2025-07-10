"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  image: string
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Mock blog post data - in a real app, this would come from an API
    const mockPost: BlogPost = {
      id: params.slug as string,
      title: "The Future of Lead Generation: AI-Powered Strategies for 2024",
      content: `
        <p>Lead generation has evolved dramatically over the past decade, and we're now entering an era where artificial intelligence is revolutionizing how businesses identify, engage, and convert potential customers.</p>
        
        <h2>The Current State of Lead Generation</h2>
        <p>Traditional lead generation methods are becoming less effective as consumers become more sophisticated and selective about the content they engage with. Cold calling, mass email campaigns, and generic advertising are yielding diminishing returns.</p>
        
        <h2>AI-Powered Solutions</h2>
        <p>Artificial intelligence is transforming lead generation through:</p>
        <ul>
          <li><strong>Predictive Analytics:</strong> AI can analyze vast amounts of data to predict which prospects are most likely to convert.</li>
          <li><strong>Personalization at Scale:</strong> Machine learning algorithms can create personalized content and messaging for thousands of prospects simultaneously.</li>
          <li><strong>Behavioral Analysis:</strong> AI tools can track and analyze prospect behavior across multiple touchpoints to identify buying signals.</li>
          <li><strong>Automated Qualification:</strong> Intelligent systems can automatically score and qualify leads based on predefined criteria.</li>
        </ul>
        
        <h2>Implementation Strategies</h2>
        <p>To successfully implement AI-powered lead generation:</p>
        <ol>
          <li>Start with clean, organized data</li>
          <li>Define clear qualification criteria</li>
          <li>Choose the right AI tools for your industry</li>
          <li>Train your team on new technologies</li>
          <li>Continuously monitor and optimize performance</li>
        </ol>
        
        <h2>Looking Ahead</h2>
        <p>The future of lead generation will be increasingly automated, personalized, and data-driven. Companies that embrace these technologies now will have a significant competitive advantage in the years to come.</p>
      `,
      excerpt:
        "Discover how artificial intelligence is transforming lead generation and what strategies will dominate in 2024.",
      author: "Sarah Johnson",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      category: "Strategy",
      tags: ["AI", "Lead Generation", "Marketing", "Technology"],
      image: "/images/blog-ai-lead-generation.jpg",
    }

    const mockRelatedPosts: BlogPost[] = [
      {
        id: "data-driven-marketing",
        title: "Data-Driven Marketing: Best Practices for 2024",
        content: "",
        excerpt: "Learn how to leverage data analytics to improve your marketing ROI and customer acquisition.",
        author: "Mike Chen",
        publishedAt: "2024-01-10",
        readTime: "6 min read",
        category: "Analytics",
        tags: ["Data", "Marketing", "Analytics"],
        image: "/images/blog-data-marketing.jpg",
      },
      {
        id: "b2b-sales-automation",
        title: "B2B Sales Automation: Tools and Techniques",
        content: "",
        excerpt: "Explore the latest tools and techniques for automating your B2B sales process.",
        author: "Lisa Rodriguez",
        publishedAt: "2024-01-05",
        readTime: "7 min read",
        category: "Sales",
        tags: ["B2B", "Sales", "Automation"],
        image: "/images/blog-sales-automation.jpg",
      },
    ]

    setPost(mockPost)
    setRelatedPosts(mockRelatedPosts)
    setIsLoading(false)
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3c3679] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-[#3c3679] hover:bg-[#2d2a5f] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="text-[#3c3679] hover:bg-[#3c3679] hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-[#3c3679] text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            <div className="flex items-center space-x-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
              <Image src="/placeholder.svg?height=400&width=800" alt={post.title} fill className="object-cover" />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=200&width=400"
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="mb-3">
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {relatedPost.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{relatedPost.title}</h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{relatedPost.author}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>

                    <Link href={`/blog/${relatedPost.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-[#3c3679] text-[#3c3679] hover:bg-[#3c3679] hover:text-white bg-transparent"
                      >
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
