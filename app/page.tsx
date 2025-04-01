"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "../components/ui/card"
import { Github, Youtube, MessageCircle } from "lucide-react"

export default function ProfilePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedY: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 5 + 1
        this.speedY = Math.random() * 1 + 0.5
        this.color = "#ff9d4d"
        this.alpha = Math.random() * 0.6 + 0.4
      }

      update() {
        this.y += this.speedY
        if (this.y > canvas!.height) {
          this.y = 0
          this.x = Math.random() * canvas!.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.shadowBlur = 15
        ctx.shadowColor = "#ffb980"
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-900 to-amber-800 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <Card className="relative z-10 w-[90%] max-w-3xl bg-gradient-to-br from-orange-800 to-amber-700 border-none shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent pointer-events-none"></div>

        <div className="absolute inset-0 border-2 border-orange-500 opacity-50 rounded-lg shadow-[0_0_15px_rgba(255,165,0,0.5)] pointer-events-none"></div>

        <div className="p-6 md:p-8 flex flex-col items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-orange-400 shadow-[0_0_15px_rgba(255,165,0,0.5)] mb-6">
            <Image
              src="/avatar.jpg"
              alt="Profile Picture"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-orange-100 mb-2 text-center">CheStor</h1>

          <div className="w-full bg-gradient-to-r from-orange-900/50 via-amber-800/50 to-orange-900/50 rounded-lg p-4 my-6 text-orange-100 text-center">
            <p className="text-sm md:text-base">
              True ghoul and python developer
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <SocialLink href="https://t.me/chestor_official" icon={<MessageCircle className="w-5 h-5" />} label="Telegram" />
            <SocialLink href="https://github.com/CheStorrr" icon={<Github className="w-5 h-5" />} label="GitHub" />
          </div>
        </div>
      </Card>
    </div>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-700 to-amber-600 text-orange-100 hover:from-orange-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 group"
      aria-label={label}
    >
      <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
    </Link>
  )
}

