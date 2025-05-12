"use client";

import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  // Added quality multiplier prop with default value of 2
  qualityMultiplier?: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const ICON_SIZE = 40;
const SPHERE_RADIUS = ICON_SIZE * 3;
const CAMERA_DISTANCE = SPHERE_RADIUS * 2;
const SCALE_DIVISOR = SPHERE_RADIUS * 1.5;
const SVG_BASE = 100;
const svgScale = ICON_SIZE / SVG_BASE;

export function IconCloud({ icons, images, qualityMultiplier = 2 }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  
  // Get device pixel ratio for high DPI screens
  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  
  // Quality scaling factor (combine device pixel ratio with quality multiplier)
  const qualityScale = devicePixelRatio * qualityMultiplier;

  // Create icon canvases once when icons/images change
  useEffect(() => {
    if (!icons && !images) return;

    const items = icons || images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);

    const newIconCanvases = items.map((item, index) => {
      // Create high-resolution canvas for each icon
      const offscreen = document.createElement("canvas");
      const highResSize = ICON_SIZE * qualityScale;
      offscreen.width = highResSize;
      offscreen.height = highResSize;
      const offCtx = offscreen.getContext("2d", { alpha: true });

      if (offCtx) {
        // Enable image smoothing for better quality
        offCtx.imageSmoothingEnabled = true;
        offCtx.imageSmoothingQuality = "high";
        
        if (images) {
          // Handle image URLs directly
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index] as string;
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

            // Create circular clipping path at high resolution
            offCtx.beginPath();
            offCtx.arc(highResSize/2, highResSize/2, highResSize/2, 0, Math.PI * 2);
            offCtx.closePath();
            offCtx.clip();

            // Draw the image at high resolution
            offCtx.drawImage(img, 0, 0, highResSize, highResSize);

            imagesLoadedRef.current[index] = true;
          };
        } else {
          // Handle SVG icons with high-resolution scaling
          const scaleFactor = svgScale * qualityScale;
          offCtx.scale(scaleFactor, scaleFactor);
          const svgString = renderToString(item as React.ReactElement);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, SVG_BASE, SVG_BASE);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images, qualityScale]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const newIcons: Icon[] = [];
    const numIcons = items.length || 20;

    // Fibonacci sphere parameters
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * SPHERE_RADIUS,
        y: y * SPHERE_RADIUS,
        z: z * SPHERE_RADIUS,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);

  // Configure high DPI canvas on mount and resize
  useEffect(() => {
    const setupCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Set display size
      canvas.style.width = `500px`;
      canvas.style.height = `500px`;
      
      // Set actual size in memory (scaled up for higher resolution)
      canvas.width = 500 * qualityScale;
      canvas.height = 500 * qualityScale;
      
      // Get context and scale all drawing operations
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(qualityScale, qualityScale);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
    };
    
    setupCanvas();
    
    // Optional: Handle window resize
    const handleResize = () => {
      setupCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [qualityScale]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      // Use 500 instead of canvas.width to match the CSS display size
      const screenX = 500 / 2 + rotatedX;
      const screenY = 500 / 2 + rotatedY;

      const scale = (rotatedZ + CAMERA_DISTANCE) / SCALE_DIVISOR;
      const radius = (ICON_SIZE/2) * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    });

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = () => {
      // Clear with proper scaled dimensions
      ctx.clearRect(0, 0, 500, 500);

      // Use 500 for center calculations to match CSS display size
      const centerX = 500 / 2;
      const centerY = 500 / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / 500) * speed,
          y: rotationRef.current.y + (dx / 500) * speed,
        };
      }

      // Sort icons by z-index for correct layering (deeper icons should be drawn first)
      const sortedIcons = [...iconPositions].map(icon => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;
        
        return {
          ...icon,
          rotatedX,
          rotatedY,
          rotatedZ
        };
      }).sort((a, b) => a.rotatedZ - b.rotatedZ);

      sortedIcons.forEach((icon) => {
        const scale = (icon.rotatedZ + CAMERA_DISTANCE) / SCALE_DIVISOR;
        const opacity = Math.max(0.2, Math.min(1, (icon.rotatedZ + CAMERA_DISTANCE) / SCALE_DIVISOR));

        ctx.save();
        ctx.translate(
          centerX + icon.rotatedX,
          centerY + icon.rotatedY
        );
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (icons || images) {
          // Only try to render icons/images if they exist
          const index = icon.id;
          if (
            iconCanvasesRef.current[index] &&
            imagesLoadedRef.current[index]
          ) {
            // Draw high-res icon with proper centering and scaling
            ctx.drawImage(
              iconCanvasesRef.current[index], 
              -ICON_SIZE/2, 
              -ICON_SIZE/2, 
              ICON_SIZE, 
              ICON_SIZE
            );
          }
        } else {
          // Show numbered circles if no icons/images are provided
          ctx.beginPath();
          ctx.arc(0, 0, ICON_SIZE/2, 0, Math.PI * 2);
          ctx.fillStyle = "#4444ff";
          ctx.fill();
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "16px Arial";
          ctx.fillText(`${icon.id + 1}`, 0, 0);
        }

        ctx.restore();
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '500px', height: '500px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-lg"
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  );
}