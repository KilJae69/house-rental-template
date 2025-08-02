# Mobile Viewport Height Fix

## Problem

On mobile devices (Firefox and Chrome), the hero section was experiencing janky scrolling behavior when the browser's address bar appeared/disappeared. This was caused by using `h-[100svh]` which tries to fit the 100vh screen, causing layout shifts.

## Solution

Implemented a robust viewport height management system using:

### 1. Custom Hook (`useLockViewportHeight`)

- Dynamically calculates and sets the `--vh` CSS variable
- Handles mobile browser viewport changes during scroll
- Uses `requestAnimationFrame` for smooth updates
- Includes scroll event listener for responsive updates
- Polls every 250ms for mobile browsers that change viewport on scroll

### 2. CSS Implementation

- Added `.h-screen-mobile` class that uses `calc(var(--vh, 1vh) * 100)`
- Includes fallback to `100vh` for older browsers
- Mobile-specific media query for better performance

### 3. Component Updates

- Updated `HeroSection` to use `h-screen-mobile` instead of `h-[100svh]`
- Integrated `useLockViewportHeight` hook in `InnerLayout`

## Benefits

- ✅ Eliminates janky scrolling on mobile browsers
- ✅ Smooth viewport height transitions
- ✅ Works across all modern browsers
- ✅ Handles address bar show/hide gracefully
- ✅ Maintains performance with optimized updates

## Files Modified

- `lib/hooks/useLockViewportHeight.ts` - Enhanced hook with scroll handling
- `components/InnerLayout.tsx` - Added hook integration
- `components/sections/HeroSection.tsx` - Updated height class
- `app/globals.css` - Added mobile viewport height styles

## Testing

Test on mobile devices:

1. Open the site in Chrome/Firefox mobile
2. Scroll up and down to trigger address bar changes
3. Verify smooth scrolling without layout shifts
4. Check orientation changes work correctly
