import { useEffect, useRef } from "react"

export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Always force play if paused
    const handlePause = () => video.play()
    video.addEventListener("pause", handlePause)

    // Block context menu
    const blockContextMenu = (e: Event) => e.preventDefault()
    video.addEventListener("contextmenu", blockContextMenu)

    // Block keyboard pause attempts
    const blockKeyboard = (e: KeyboardEvent) => {
      if ([" ", "k"].includes(e.key)) {
        e.preventDefault()
      }
    }
    window.addEventListener("keydown", blockKeyboard)

    return () => {
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("contextmenu", blockContextMenu)
      window.removeEventListener("keydown", blockKeyboard)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="w-full max-w-[400px] h-[500px] md:h-[500px] rounded-2xl shadow-lg object-cover pointer-events-none select-none"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src="/images/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
