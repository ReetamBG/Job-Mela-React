import { ArrowRight } from "lucide-react";

// Mock Card components for demo
import React from "react";

const Card = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`rounded-lg border ${className}`}>{children}</div>
);

const CardContent = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={className}>{children}</div>
);

interface DashboardCardProps {
    title: string;
    subtitle: string;
    count: string;
    image: string;
    color?: string;
}

export default function DashboardCard({
    title,
    subtitle,
    count,
    image,
}: DashboardCardProps) {
    return (
        <>
            <style>{`
                :root {
                    --primary: 34 197 94;
                    --primary-dark: 21 128 61;
                    --primary-light: 74 222 128;
                }
                
                .dashboard-card {
                    background: linear-gradient(135deg, 
                        rgba(15, 23, 42, 0.95) 0%, 
                        rgba(30, 41, 59, 0.9) 50%, 
                        rgba(15, 23, 42, 0.95) 100%);
                    border: 1px solid rgba(148, 163, 184, 0.1);
                    backdrop-filter: blur(12px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .dashboard-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 
                        0 25px 50px -12px rgba(0, 0, 0, 0.5),
                        0 0 40px rgba(var(--primary), 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    border-color: rgba(var(--primary), 0.3);
                }
                
                .count-badge {
                    background: linear-gradient(135deg, 
                        rgb(var(--primary)) 0%, 
                        rgb(var(--primary-dark)) 100%);
                    box-shadow: 
                        0 4px 15px rgba(var(--primary), 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }
                
                .dashboard-card:hover .count-badge {
                    box-shadow: 
                        0 6px 20px rgba(var(--primary), 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                }
                
                .image-container {
                    background: linear-gradient(135deg, 
                        rgba(var(--primary), 0.1) 0%, 
                        rgba(var(--primary), 0.05) 100%);
                    border: 1px solid rgba(var(--primary), 0.2);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .image-container::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, 
                        transparent 30%, 
                        rgba(var(--primary), 0.1) 50%, 
                        transparent 70%);
                    transition: transform 0.6s ease;
                    transform: translateX(-100%) translateY(-100%) rotate(45deg);
                }
                
                .dashboard-card:hover .image-container::before {
                    transform: translateX(100%) translateY(100%) rotate(45deg);
                }
                
                .dashboard-card:hover .image-container {
                    border-color: rgba(var(--primary), 0.4);
                    box-shadow: 
                        0 8px 25px rgba(var(--primary), 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    transform: scale(1.05) rotate(2deg);
                }
                
                .arrow-icon {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    color: rgb(var(--primary));
                    filter: drop-shadow(0 0 4px rgba(var(--primary), 0.3));
                }
                
                .dashboard-card:hover .arrow-icon {
                    transform: translateX(6px) scale(1.1);
                    color: rgb(var(--primary-light));
                    filter: drop-shadow(0 0 8px rgba(var(--primary), 0.5));
                }
                
                .card-overlay {
                    background: linear-gradient(135deg, 
                        rgba(var(--primary), 0.03) 0%, 
                        rgba(var(--primary), 0.01) 100%);
                    transition: opacity 0.3s ease;
                }
                
                .dashboard-card:hover .card-overlay {
                    opacity: 1;
                }
                
                .title-text {
                    color: #f1f5f9;
                    transition: all 0.3s ease;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                .dashboard-card:hover .title-text {
                    color: #ffffff;
                    text-shadow: 0 0 10px rgba(var(--primary), 0.3);
                }
                
                .subtitle-text {
                    color: #94a3b8;
                    transition: color 0.3s ease;
                }
                
                .dashboard-card:hover .subtitle-text {
                    color: #cbd5e1;
                }
                
                .glow-effect {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        rgb(var(--primary)) 50%, 
                        transparent 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .dashboard-card:hover .glow-effect {
                    opacity: 0.6;
                }
                
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                
                .pulse-animation {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
            `}</style>

            <Card className="dashboard-card relative overflow-hidden group cursor-pointer border-0 rounded-2xl max-w-7xl">
                <div className="glow-effect"></div>
                <CardContent className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-4 flex-1">
                            <div className="space-y-2">
                                <h3 className="title-text text-xl font-bold tracking-tight">
                                    {title}
                                </h3>
                                <p className="subtitle-text text-sm font-medium leading-relaxed">
                                    {subtitle}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="count-badge px-4 py-2 rounded-xl text-white text-sm font-bold tracking-wide">
                                    {count}
                                </div>
                                <div className="flex items-center space-x-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                                        View Details
                                    </span>
                                    <ArrowRight className="arrow-icon h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        <div className="ml-6">
                            <div className="image-container w-28 h-28 rounded-2xl p-4 flex items-center justify-center">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzE2YTM0YSIvPgo8cGF0aCBkPSJNMjQgMjRIMTZWNDBIMjRWMjRaTTQ4IDI0SDQwVjQwSDQ4VjI0WiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced overlay with subtle animation */}
                    <div className="card-overlay absolute inset-0 opacity-0 pointer-events-none" />

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-400 pulse-animation opacity-60"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-green-300 pulse-animation opacity-40" style={{ animationDelay: '1s' }}></div>
                </CardContent>
            </Card>
        </>
    );
}

