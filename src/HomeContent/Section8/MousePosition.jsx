// filepath: e:\Projects\Boyztrip\boyztrip\src\HomeContent\Section8\MousePosition.jsx
import { useState, useEffect, useRef } from "react";

/**
 * Enhanced cursor position tracker that works with static cursors
 * Uses document.elementFromPoint to actively detect cursor position
 */
const MousePosition = (containerRef) => {
  // Refs for better performance
  const positionRef = useRef({ x: 0, y: 0 });
  const globalPositionRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  
  // State for component updates
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Function to get relative position within container
    const getRelativePosition = (globalX, globalY) => {
      if (!containerRef?.current) return { x: 0, y: 0 };
      
      const rect = containerRef.current.getBoundingClientRect();
      
      return {
        x: globalX - rect.left,
        y: globalY - rect.top
      };
    };
    
    // Track mouse movement globally
    const handleMouseMove = (e) => {
      globalPositionRef.current = { x: e.clientX, y: e.clientY };
      
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate if section is visible
        visibleRef.current = 
          rect.top < window.innerHeight && 
          rect.bottom > 0 && 
          rect.left < window.innerWidth && 
          rect.right > 0;
        
        // Only update position if mouse is within container
        const relPos = getRelativePosition(e.clientX, e.clientY);
        
        if (relPos.x >= 0 && relPos.x <= rect.width && 
            relPos.y >= 0 && relPos.y <= rect.height) {
          positionRef.current = relPos;
          setPosition(relPos);
        }
      }
    };
    
    // Function to detect cursor in section even when not moving
    const detectCursor = () => {
      if (!containerRef?.current || !visibleRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if container is visible in viewport
      if (!(rect.top < window.innerHeight && rect.bottom > 0)) return;
      
      // Strategy 1: Use document.elementFromPoint with current global mouse position
      if (globalPositionRef.current.x && globalPositionRef.current.y) {
        const x = globalPositionRef.current.x;
        const y = globalPositionRef.current.y;
        
        // Check if point is within container bounds
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          // Element at cursor position
          const el = document.elementFromPoint(x, y);
          
          // Check if element is within our container
          if (el && (containerRef.current.contains(el) || containerRef.current === el)) {
            const relPos = getRelativePosition(x, y);
            positionRef.current = relPos;
            setPosition(relPos);
            return;
          }
        }
      }
      
      // Strategy 2: Use most recent mouse position if section just scrolled into view
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        const lastX = globalPositionRef.current.x;
        const lastY = globalPositionRef.current.y;
        
        if (lastX && lastY) {
          // Calculate position relative to container
          const relX = lastX - rect.left;
          const relY = lastY - rect.top;
          
          // Set position if cursor is within boundaries
          if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
            positionRef.current = { x: relX, y: relY };
            setPosition({ x: relX, y: relY });
            return;
          }
        }
      }
      
      // Strategy 3: Fallback to center position if no cursor detected
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      positionRef.current = { x: centerX, y: centerY };
      setPosition({ x: centerX, y: centerY });
    };
    
    // Listen for mouse movements
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Start detection interval for static cursor
    const intervalId = setInterval(detectCursor, 50); // Higher frequency for better tracking
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalId);
    };
  }, [containerRef]);
  
  // Return the position - always valid
  return position;
};

export default MousePosition;
