<template>
  <section class="category-ticker-section" aria-label="Blog Categories">
    <div class="ticker-wrapper" ref="wrapperRef">
      <div class="ticker-track" ref="trackRef">
        <div
          v-for="(category, i) in repeated"
          :key="`${category._id}-${i}`"
          class="category-slide"
          :class="{ active: selected === category.slug.current }"
          :data-slug="category.slug.current"
        >
          <span class="category-label">{{ category.title }}</span>
          <span class="category-divider" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useStore } from '@nanostores/vue';
import { selectedCategory } from '../store.js';
import { gsap } from 'gsap';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

const REPEAT_COUNT = 5;
const AUTO_SPEED = 0.5;

const props = defineProps<{ categories: Category[] }>();
const selected = useStore(selectedCategory);

const repeated = computed(() =>
  Array.from({ length: REPEAT_COUNT }, () => props.categories).flat()
);

function select(slug: string) {
  selectedCategory.set(slug === selected.value ? 'all' : slug);
}

const wrapperRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

function snapToDevicePixel(value: number) {
  const pixelRatio = window.devicePixelRatio || 1;
  return Math.round(value * pixelRatio) / pixelRatio;
}

onMounted(async () => {
  const wrapper = wrapperRef.value!;
  const track = trackRef.value!;
  if (!wrapper || !track) return;

  await nextTick();

  let loopWidth = track.scrollWidth / REPEAT_COUNT;

  const resizeObserver = new ResizeObserver(() => {
    loopWidth = track.scrollWidth / REPEAT_COUNT;
  });
  resizeObserver.observe(track);

  let x = 0;
  let velocity = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let lastClientX = 0;
  const setTrackX = gsap.quickSetter(track, 'x', 'px');

  function tick() {
    if (loopWidth <= 0) return;

    if (!isDragging) {
      x -= AUTO_SPEED;
      velocity *= 0.92;
      x += velocity;
    }
    if (x <= -loopWidth) x += loopWidth;
    if (x > 0) x -= loopWidth;
    setTrackX(snapToDevicePixel(x));
  }

  gsap.ticker.add(tick);

  function onPointerDown(e: PointerEvent) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartOffset = x;
    lastClientX = e.clientX;
    velocity = 0;
    wrapper.classList.add('dragging');
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;
    velocity = e.clientX - lastClientX;
    lastClientX = e.clientX;
    x = dragStartOffset + (e.clientX - dragStartX);
  }

  function onPointerUp(e: PointerEvent) {
    wrapper.classList.remove('dragging');
    isDragging = false;

    if (Math.abs(e.clientX - dragStartX) < 5) {
      const slide = (e.target as HTMLElement).closest<HTMLElement>('.category-slide');
      const slug = slide?.dataset.slug;
      if (slug) select(slug);
    }
  }

  wrapper.addEventListener('pointerdown', onPointerDown);
  wrapper.addEventListener('pointermove', onPointerMove);
  wrapper.addEventListener('pointerup', onPointerUp);

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    resizeObserver.disconnect();
    wrapper.removeEventListener('pointerdown', onPointerDown);
    wrapper.removeEventListener('pointermove', onPointerMove);
    wrapper.removeEventListener('pointerup', onPointerUp);
  });
});
</script>

<style scoped>
.category-ticker-section {
  margin: 20px 0;
}

.ticker-wrapper {
  cursor: grab;
  overflow: hidden;
  user-select: none;
}

.ticker-wrapper.dragging {
  cursor: grabbing;
}

.ticker-track {
  align-items: center;
  backface-visibility: hidden;
  display: flex;
  gap: 12px;
  transform: translateZ(0);
  width: max-content;
  will-change: transform;
}

.category-slide {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  gap: 12px;
}

.category-label {
  color: var(--color-text-primary);
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  transition: color 0.4s ease;
  white-space: nowrap;
  text-transform: uppercase;
}

.category-label:hover {
  color: var(--color-blue-primary);
}

@media (min-width: 640px) {
  .category-label {
    font-size: 70px;
  }
}

@media (min-width: 700px) {
  .category-label {
    font-size: 76px;
  }
}

@media (min-width: 1024px) {
  .category-divider {
    height: 20px;
    width: 20px;
  }
}

@media (min-width: 1536px) {
  .category-label {
    font-size: 90px;
  }

  .category-ticker-section {
    margin-top: 10px;
  }
}

@media (min-width: 1950px) {
  .category-label {
    font-size: 126px;
  }
}

.category-slide.active .category-label {
  color: var(--color-blue-primary);
}

.category-divider {
  background: var(--color-blue-primary);
  border-radius: 999px;
  display: block;
  flex-shrink: 0;
  height: 14px;
  transform: translateZ(0);
  width: 14px;
}
</style>
