---
name: 3d-stack-selection
description: Elegir e implementar 3D en la web (Spline, React Three Fiber, Three.js vanilla, Babylon.js), incluyendo 3D guiado por scroll, estados de carga, compresión de modelos GLTF y anti-patrones de rendimiento/mobile. Usar cuando se vaya a agregar 3D, escenas, modelos, WebGL o animaciones 3D al proyecto, o cuando se pregunte qué librería 3D conviene.
---

## 3D Stack Selection

### Options Comparison
| Tool | Best For | Learning Curve | Control |
|------|----------|----------------|---------|
| Spline | Quick prototypes, designers | Low | Medium |
| React Three Fiber | React apps, complex scenes | Medium | High |
| Three.js vanilla | Max control, non-React | High | Maximum |
| Babylon.js | Games, heavy 3D | High | Maximum |

### Decision Tree
<!-- TODO: el texto original llegó cortado en este punto; completar con el árbol de decisión original. -->

## Scroll-Driven 3D

3D that responds to scroll.

**When to use**: When integrating 3D with scroll.

### R3F + Scroll Controls
```jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';

function RotatingModel() {
  const scroll = useScroll();
  const ref = useRef();

  useFrame(() => {
    // Rotate based on scroll position
    ref.current.rotation.y = scroll.offset * Math.PI * 2;
  });

  return <mesh ref={ref}>...</mesh>;
}

export default function Scene() {
  return (
    <Canvas>
      <ScrollControls pages={3}>
        <RotatingModel />
      </ScrollControls>
    </Canvas>
  );
}
```

### GSAP + Three.js (ScrollTrigger)
```js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: '.section',
    scrub: true,
  },
  z: 5,
  y: 2,
});
```

## Loading State

### R3F Suspense + progress
```jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useProgress, Html } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}%</Html>;
}

export default function Scene() {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
```

## Model Optimization

### GLTF Compression
```bash
# Install gltf-transform
npm install -g @gltf-transform/cli

# Compress model
gltf-transform optimize input.glb output.glb \
  --compress draco \
  --texture-compress webp
```

## Anti-Patterns

### ❌ 3D For 3D's Sake

**Why bad**: Slows down the site. Confuses users. Battery drain on mobile. Doesn't help conversion.

**Instead**: 3D should serve a purpose.
- Product visualization = good.
- Random floating shapes = probably not.
- Ask: would an image work?

### ❌ Desktop-Only 3D

**Why bad**: Most traffic is mobile. Kills battery. Crashes on low-end devices. Frustrated users.

**Instead**:
- Test on real mobile devices.
- Reduce quality on mobile.
- Provide static fallback.
- Consider disabling 3D on low-end.

### ❌ No Loading State

**Why bad**: Users think it's broken. High bounce rate. 3D takes time to load. Bad first impression.

**Instead**:
- Loading progress indicator.
- Skeleton/placeholder.
- Load 3D after page is interactive.
- Optimize model size.

## Related Skills

Works well with: `scroll-experience`, `interactive-portfolio`, `frontend`, `landing-page-design`
