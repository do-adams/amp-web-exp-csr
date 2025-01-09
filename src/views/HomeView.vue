<template>
  <div class="landing-page">
    <!-- Language Selector -->
    <header class="fixed top-0 left-0 right-0 px-4 py-4 bg-white border-b">
      <div class="container flex justify-end max-w-6xl mx-auto">
        <LanguageSelector v-model="currentLanguage" />
      </div>
    </header>

    <!-- Hero Section - Good for testing text, button and background changes -->
    <section class="px-4 bg-blue-100 py-28 hero">
      <div class="container max-w-6xl mx-auto">
        <h1 id="main-headline" class="mb-6 text-4xl font-bold text-center">
          {{ currentTranslations.mainHeadline }}
        </h1>
        <p id="hero-description" class="mb-8 text-xl text-center">
          {{ currentTranslations.heroDescription }}
        </p>
        <div class="text-center">
          <button
            id="cta-button"
            class="px-8 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>

    <!-- Feature Grid - Test visibility, content changes -->
    <section class="px-4 py-16 features">
      <div class="container max-w-6xl mx-auto">
        <h2 id="features-title" class="mb-12 text-3xl font-bold text-center">Key Features</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="(feature, index) in features"
            :key="index"
            :id="'feature-card-' + index"
            class="p-6 transition-shadow border rounded-lg feature-card hover:shadow-lg"
          >
            <h3 class="mb-4 text-xl font-semibold">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section - Test content, visibility, and style changes -->
    <section class="px-4 py-16 pricing bg-gray-50">
      <div class="container max-w-6xl mx-auto">
        <h2 id="pricing-title" class="mb-12 text-3xl font-bold text-center">Simple Pricing</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="(plan, index) in pricingPlans"
            :key="index"
            :id="'pricing-card-' + index"
            class="p-6 bg-white border rounded-lg pricing-card"
          >
            <h3 class="mb-4 text-2xl font-bold">{{ plan.name }}</h3>
            <p class="mb-6 text-4xl font-bold">${{ plan.price }}<span class="text-lg">/mo</span></p>
            <ul class="mb-8">
              <li
                v-for="(feature, fIndex) in plan.features"
                :key="fIndex"
                class="flex items-center mb-2"
              >
                <span class="mr-2">✓</span>
                {{ feature }}
              </li>
            </ul>
            <button
              :id="'pricing-button-' + index"
              class="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Choose {{ plan.name }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section - Test form interactions -->
    <section class="px-4 py-16 newsletter">
      <div class="container max-w-6xl mx-auto text-center">
        <h2 id="newsletter-title" class="mb-6 text-3xl font-bold">Stay Updated</h2>
        <p id="newsletter-description" class="mb-8 text-xl">
          Join our newsletter to receive the latest updates
        </p>
        <form @submit.prevent="submitNewsletter" class="max-w-md mx-auto">
          <div class="flex gap-4">
            <input
              id="newsletter-input"
              type="email"
              v-model="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              id="newsletter-button"
              type="submit"
              class="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Testimonials - Test content rotation -->
    <section class="px-4 py-16 testimonials bg-gray-50">
      <div class="container max-w-6xl mx-auto">
        <h2 id="testimonials-title" class="mb-12 text-3xl font-bold text-center">
          What Our Customers Say
        </h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :id="'testimonial-' + index"
            class="p-6 bg-white border rounded-lg"
          >
            <p class="mb-4 text-gray-600">"{{ testimonial.quote }}"</p>
            <div class="flex items-center">
              <div class="ml-4">
                <p class="font-semibold">{{ testimonial.name }}</p>
                <p class="text-gray-500">{{ testimonial.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'

import LanguageSelector from '@/components/LanguageSelector.vue'
import type { Language } from '@/types'

interface Feature {
  title: string
  description: string
}

interface PricingPlan {
  name: string
  price: string
  features: string[]
}

interface Testimonial {
  quote: string
  name: string
  title: string
}

interface Translations {
  mainHeadline: string
  heroDescription: string
}

const translations: Record<Language, Translations> = {
  en: {
    mainHeadline: 'Welcome to Our Product',
    heroDescription: 'Discover amazing features and boost your productivity',
  },
  es: {
    mainHeadline: 'Bienvenido a Nuestro Producto',
    heroDescription: 'Descubre increíbles características y aumenta tu productividad',
  },
}

const email = ref<string>('')

const cookies = useCookies(['locale'])

const currentLanguage = computed<Language>({
  get() {
    return cookies.get('locale') || 'en'
  },
  set(newValue) {
    cookies.set('locale', newValue)
  },
})

const currentTranslations = computed<Translations>(() => translations[currentLanguage.value])

const features: Feature[] = [
  {
    title: 'Easy Integration',
    description: 'Set up in minutes with our simple API and documentation',
  },
  {
    title: 'Powerful Analytics',
    description: 'Get deep insights into your business performance',
  },
  {
    title: 'Expert Support',
    description: '24/7 support from our dedicated team of experts',
  },
]

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '29',
    features: ['Up to 1,000 users', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Pro',
    price: '99',
    features: ['Up to 10,000 users', 'Advanced analytics', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: '299',
    features: ['Unlimited users', 'Custom analytics', 'Dedicated support'],
  },
]

const testimonials: Testimonial[] = [
  {
    quote: 'This product has transformed how we do business. Highly recommended!',
    name: 'Sarah Johnson',
    title: 'CEO at TechCorp',
  },
  {
    quote: "The best solution we've found for our analytics needs.",
    name: 'Mike Williams',
    title: 'Product Manager at StartupX',
  },
]

const submitNewsletter = (): void => {
  // Handle newsletter submission
  console.log('Newsletter subscription for:', email.value)
  email.value = ''
}
</script>
