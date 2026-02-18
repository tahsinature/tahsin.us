export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readMoreLabel?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-const-deception",
    title: 'The "const" Deception',
    description:
      "Exploring the difference between assignment and mutation in JavaScript. The `const` keyword is not what it seems — it doesn't make things constant! In this tutorial, we'll dig into the difference between reassignment and mutation, and build a better mental model for how variables work in JavaScript.",
    category: "JavaScript",
    date: "2026-02-10",
  },
  {
    slug: "brand-new-layouts-with-css-subgrid",
    title: "Brand New Layouts with CSS Subgrid",
    description:
      "Subgrid allows us to extend a grid template down the DOM tree, so that deeply-nested elements can participate in the same grid layout. At first glance, I thought this would be a helpful convenience, but it turns out it's so much more. Subgrid unlocks exciting new layout possibilities, stuff we couldn't do until now. ✨",
    category: "CSS",
    date: "2026-01-15",
  },
  {
    slug: "springs-and-bounces-in-native-css",
    title: "Springs and Bounces in Native CSS",
    description:
      "The magic of the linear() timing function. The \"linear()\" timing function is a game-changer: it allows us to model physics-based motion right in vanilla CSS! That said, there are some limitations and quirks to be aware of. I've been experimenting with this API for a while now, and in this post, I'll share all of the tips and tricks I've learned for using it effectively. 🌈",
    category: "CSS",
    date: "2026-01-10",
  },
  {
    slug: "the-big-gotcha-with-starting-style",
    title: "The Big Gotcha With @starting-style",
    description:
      "CSS has been on fire lately, with tons of great new features. @starting-style is an interesting one: it allows us to use CSS transitions for enter animations, something previously reserved for CSS keyframe animations. But is the juice worth the squeeze?",
    category: "CSS",
    date: "2025-12-20",
  },
  {
    slug: "color-shifting-in-css",
    title: "Color Shifting in CSS",
    description:
      "An Exploration of Color Animation Techniques. A little while ago, I was trying to animate an element's background color, so that it cycled through the rainbow. Seems easy, but it turns out, browsers have a surprisingly big limitation when it comes to color processing! In this tutorial, we'll dig into the issue, and I'll share a couple of strategies you can use to work around this limitation.",
    category: "CSS",
    date: "2025-12-01",
  },
  {
    slug: "interactive-guide-to-svg-paths",
    title: "An Interactive Guide to SVG Paths",
    description:
      "SVG gives us many different primitives to work with, but by far the most powerful is the <path> element. Unfortunately, it's also the most inscrutable, with its compact Regex-style syntax. In this tutorial, we'll demystify this infamous element and see some of the cool things we can do with it!",
    category: "SVG",
    date: "2025-11-15",
  },
  {
    slug: "friendly-introduction-to-svg",
    title: "A Friendly Introduction to SVG",
    description:
      "SVGs are one of the most remarkable technologies we have access to on the web. They're first-class citizens, fully addressable with CSS and JavaScript. In this tutorial, I'll cover all of the most important fundamentals, and show you some of the ridiculously-cool things we can do with this massively underrated tool. ✨",
    category: "SVG",
    date: "2025-11-01",
  },
  {
    slug: "partial-keyframes",
    title: "Partial Keyframes",
    description:
      "Creating dynamic, composable CSS keyframe animations. CSS Keyframe animations are so much more powerful than most developers realize. In this tutorial, I'll show you something that completely blew my mind, a technique that makes our keyframe animations so much more reusable and dynamic! 🤯",
    category: "Animation",
    date: "2025-10-15",
  },
  {
    slug: "the-height-enigma",
    title: "The Height Enigma",
    description:
      "Unraveling the mystery of percentage-based heights in CSS. One of the most perplexing and befuddling things in CSS for me, for many years, was the behaviour of percentage-based heights. Sometimes, seemingly at random, setting height: 100% would have no effect at all. When I finally figured out what was going on, it was like a puzzle piece snapping into place; everything made so much more sense! In this post, I'll share the epiphany I had, and we'll explore some solutions.",
    category: "CSS",
    date: "2025-10-01",
  },
  {
    slug: "the-post-developer-era",
    title: "The Post-Developer Era",
    description:
      "When OpenAI released GPT-4 back in March 2023, they kickstarted the AI revolution. The consensus online was that front-end development jobs would be totally eliminated within a year or two. Well, it's been more than two years since then, and I thought it was worth revisiting some of those early predictions, and seeing if we can glean any insights about where things are headed.",
    category: "Career",
    date: "2025-09-15",
  },
  {
    slug: "a-million-little-secrets",
    title: "A Million Little Secrets",
    description:
      "Deconstructing the \"Whimsical Animations\" landing page. I spent the past few weeks packing as many easter eggs as I could into my latest project, and in this blog post, I want to dig into some of the more interesting details! If you're interested in animations/interactions, you'll want to check this one out; I share a bunch of my favourite secrets and tricks. 🫣",
    category: "Animation",
    date: "2025-09-01",
  },
  {
    slug: "container-queries-unleashed",
    title: "Container Queries Unleashed",
    description:
      "Container queries expand the universe of designs that can be implemented, giving us whole new superpowers. Now that container queries are broadly available, I think it's time we start exploring this potential! In this post, I'll share the \"killer pattern\" I can't stop using in my work, and explore what's possible with this new capability.",
    category: "CSS",
    date: "2025-08-15",
  },
];

export const categories = ["CSS", "React", "Animation", "Career", "JavaScript", "SVG", "Next.js", "General"];

export const popularContent = [
  "An Interactive Guide to Flexbox",
  "A Modern CSS Reset",
  "An Interactive Guide to CSS Transitions",
  "How To Center a Div",
  "The End of Front-End Development",
  "An Interactive Guide to CSS Grid",
  "Designing Beautiful Shadows in CSS",
  "Making Sense of React Server Components",
  "Why React Re-Renders",
  "CSS Variables for React Devs",
];
