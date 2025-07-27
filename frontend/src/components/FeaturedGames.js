import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Play, Users, Trophy } from 'lucide-react';

const FeaturedGames = () => {
  const featuredGames = [
    {
      id: 1,
      title: "Spider-Man 2",
      platform: "PlayStation 5",
      category: "Action Adventure",
      rating: 4.9,
      players: "1 Player",
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxQbGF5U3RhdGlvbnxlbnwwfHx8fDE3NTI4Mjk1MTB8MA&ixlib=rb-4.1.0&q=85",
      isNew: true,
      isPopular: false
    },
    {
      id: 2,
      title: "Halo Infinite",
      platform: "Xbox Series X",
      category: "First Person Shooter",
      rating: 4.7,
      players: "1-16 Players",
      image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxYYm94fGVufDB8fHx8MTc1MjgyOTUxN3ww&ixlib=rb-4.1.0&q=85",
      isNew: false,
      isPopular: true
    },
    {
      id: 3,
      title: "Beat Saber",
      platform: "VR Gaming",
      category: "Rhythm VR",
      rating: 4.8,
      players: "1 Player",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxWUiUyMGhlYWRzZXR8ZW58MHx8fHwxNzUyODI5NTY0fDA&ixlib=rb-4.1.0&q=85",
      isNew: false,
      isPopular: true
    },
    {
      id: 4,
      title: "Settlers of Catan",
      platform: "Board Games",
      category: "Strategy",
      rating: 4.6,
      players: "3-4 Players",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxib2FyZCUyMGdhbWVzfGVufDB8fHx8MTc1MjgyODg4NXww&ixlib=rb-4.1.0&q=85",
      isNew: false,
      isPopular: false
    }
  ];

  return (
    <section id="games" className="py-20 px-4 bg-gaming-darker relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gaming-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gaming-accent/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gaming-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-gaming-accent/20 mb-6">
            <Trophy className="w-5 h-5 text-gaming-accent" />
            <span className="text-gaming-accent font-semibold text-sm tracking-wider uppercase">
              Featured Games
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gaming-text mb-4 animate-fade-in-up">
            Most Popular
            <span className="block text-gaming-accent neon-text">Gaming Experiences</span>
          </h2>
          
          <p className="text-lg text-gaming-text-secondary max-w-2xl mx-auto animate-fade-in-up delay-200">
            Discover the latest and most popular games across all platforms. From AAA console titles to immersive VR experiences and classic board games.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game, index) => (
            <Card 
              key={game.id}
              className={`gaming-card group cursor-pointer animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Game Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img 
                    src={game.image}
                    alt={game.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-gaming-accent hover:bg-gaming-accent-hover text-gaming-dark font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                        <Play className="w-4 h-4 inline mr-2" />
                        Play Now
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {game.isNew && (
                      <span className="bg-gaming-accent text-gaming-dark text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {game.isPopular && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gaming-dark/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-semibold">{game.rating}</span>
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-bold text-gaming-text group-hover:text-gaming-accent transition-colors duration-200">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gaming-accent font-medium">{game.platform}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gaming-text-secondary">
                    <span>{game.category}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{game.players}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="gaming-btn hover:shadow-gaming-glow-strong">
            <Trophy className="w-4 h-4 inline mr-2" />
            View All Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;