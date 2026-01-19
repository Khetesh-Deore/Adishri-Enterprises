# Lazy Loading - Quick Reference Guide 🚀

## Quick Usage Examples

### 1. Lazy Load an Image
```jsx
import { LazyImage } from '../views/shared';

<LazyImage 
  src="/product.jpg"
  alt="Product Name"
  className="w-full h-full object-cover"
/>
```

### 2. Lazy Load a Section (Text Content)
```jsx
import { LazySection } from '../views/shared';

<LazySection animation="fadeUp">
  <h2>Your Heading</h2>
  <p>Your content...</p>
</LazySection>
```

### 3. Staggered List Animation
```jsx
import { LazyStaggerContainer, LazyStaggerItem } from '../views/shared';

<LazyStaggerContainer className="grid grid-cols-3 gap-4">
  {items.map(item => (
    <LazyStaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </LazyStaggerItem>
  ))}
</LazyStaggerContainer>
```

---

## Animation Types

### LazySection Animations
- `fadeUp` - Fade from bottom (default)
- `fadeIn` - Simple fade
- `fadeLeft` - Slide from left
- `fadeRight` - Slide from right
- `scale` - Scale up from center

### Example with Different Animations
```jsx
<LazySection animation="fadeLeft">
  <div>Slides from left</div>
</LazySection>

<LazySection animation="fadeRight" delay={0.2}>
  <div>Slides from right with delay</div>
</LazySection>
```

---

## Common Patterns

### Section with Heading
```jsx
<LazySection animation="fadeUp">
  <SectionHeading
    title="Your Title"
    subtitle="Subtitle"
    description="Description"
  />
</LazySection>
```

### Two-Column Layout
```jsx
<div className="grid lg:grid-cols-2 gap-12">
  <LazySection animation="fadeLeft">
    <div>Left content</div>
  </LazySection>
  
  <LazySection animation="fadeRight">
    <div>Right content</div>
  </LazySection>
</div>
```

### Card Grid with Stagger
```jsx
<LazyStaggerContainer className="grid grid-cols-3 gap-6">
  {cards.map(card => (
    <LazyStaggerItem key={card.id}>
      <GlassCard>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </GlassCard>
    </LazyStaggerItem>
  ))}
</LazyStaggerContainer>
```

---

## Configuration Options

### LazyImage Props
```jsx
<LazyImage 
  src="/image.jpg"              // Required
  alt="Description"             // Required
  className="w-full"            // Optional
  placeholderSrc="data:..."     // Optional
  onLoad={() => {}}             // Optional
/>
```

### LazySection Props
```jsx
<LazySection
  animation="fadeUp"      // Animation type
  delay={0}              // Delay in seconds
  threshold={0.1}        // Visibility threshold (0-1)
  className="..."        // CSS classes
>
  {children}
</LazySection>
```

### LazyStaggerContainer Props
```jsx
<LazyStaggerContainer
  staggerDelay={0.1}     // Delay between children
  threshold={0.1}        // Visibility threshold
  className="..."        // CSS classes
>
  {children}
</LazyStaggerContainer>
```

---

## When to Use What

### Use LazyImage for:
- Product images
- Gallery images
- Hero images
- Thumbnails
- Any image that can wait to load

### Use LazySection for:
- Section headings
- Text content blocks
- Forms
- Contact information
- Any content that should animate in

### Use LazyStaggerContainer for:
- Card grids
- Feature lists
- Value propositions
- Industry cards
- Any list that should animate sequentially

---

## Performance Tips

### Do's ✅
- Use LazyImage for all images below the fold
- Keep animation delays short (< 0.5s)
- Use stagger for lists (looks professional)
- Test on slow connections
- Optimize image sizes

### Don'ts ❌
- Don't lazy load above-the-fold content
- Don't overuse animations
- Don't make delays too long
- Don't animate everything
- Don't forget mobile testing

---

## Troubleshooting

### Images not loading?
- Check image path is correct
- Verify image exists
- Check console for errors
- Test fallback image

### Animations not triggering?
- Scroll to element
- Check threshold setting
- Verify element is in viewport
- Check browser support

### Performance issues?
- Reduce number of animations
- Increase threshold
- Optimize images
- Check for console errors

---

## Browser Support
- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+
- ✅ All modern mobile browsers

---

## Quick Test

### Test Lazy Loading
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Img"
4. Reload page
5. Scroll slowly
6. Watch images load on-demand

### Test Animations
1. Scroll slowly through page
2. Watch sections animate in
3. Check timing and smoothness
4. Verify no layout shift

---

## Need Help?

### Documentation
- `LAZY_LOADING_IMPLEMENTATION.md` - Full image lazy loading guide
- `TEXT_LAZY_LOADING_COMPLETE.md` - Full text lazy loading guide
- `COMPLETE_LAZY_LOADING_SUMMARY.md` - Complete overview

### Components Location
- `Adishri-Enterprises/src/views/shared/LazyImage.jsx`
- `Adishri-Enterprises/src/views/shared/LazySection.jsx`
- `Adishri-Enterprises/src/hooks/useLazyLoad.js`

---

**Quick Start:** Import from `../views/shared` and start using! 🚀
