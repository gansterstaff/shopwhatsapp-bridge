
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  content?: React.ReactNode
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onNavHover?: (item: NavItem, index: number) => void
  onNavClick?: (item: NavItem, index: number, event: React.MouseEvent) => void
  activeItem?: string
}

export function TubelightNavbar({ items, className, onNavHover, onNavClick, activeItem }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(activeItem || items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (activeItem) {
      setActiveTab(activeItem);
    }
  }, [activeItem]);

  const handleMouseEnter = (item: NavItem, index: number) => {
    if (onNavHover) {
      onNavHover(item, index);
    }
  };

  const handleClick = (item: NavItem, index: number, event: React.MouseEvent) => {
    setActiveTab(item.name);
    event.preventDefault(); // Prevent default navigation
    
    // Call the parent's onClick handler if provided
    if (onNavClick) {
      onNavClick(item, index, event);
    }
  };

  return (
    <div
      className={cn(
        "z-10",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-3 bg-background/5 backdrop-blur-lg py-1 px-1 rounded-full">
        {items.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <div
              key={item.name}
              onClick={(e) => handleClick(item, index, e)}
              onMouseEnter={() => handleMouseEnter(item, index)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "text-primary",
              )}
            >
              <span className="hidden md:flex items-center">
                <Icon className="mr-1.5 h-4 w-4" />
                {item.name}
              </span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-sm -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
