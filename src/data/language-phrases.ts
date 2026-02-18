/**
 * Language phrases for the interactive language card.
 * Each language has multiple phrases with native text, transliteration, and English translation.
 */

export interface LanguagePhrase {
  /** The phrase in its native script */
  native: string;
  /** Romanized pronunciation guide */
  pronunciation: string;
  /** English translation */
  english: string;
  /** Context or usage note */
  context?: string;
}

export interface LanguageData {
  /** Display label (native script name) */
  label: string;
  /** English name of the language */
  englishName: string;
  /** ISO/BCP 47 hint or script name */
  script: string;
  /** Native greeting used as intro */
  greeting: string;
  /** Fun facts about the language */
  facts: string[];
  /** Number of speakers (approximate) */
  speakers: string;
  /** Accent color for this language (hex) */
  color: string;
  /** Flag emoji */
  flag: string;
  /** Phrases to cycle through */
  phrases: LanguagePhrase[];
}

export const languages: LanguageData[] = [
  {
    label: "বাংলা",
    englishName: "Bengali",
    script: "Bengali script",
    greeting: "হ্যালো!",
    speakers: "~300 million",
    color: "#00a651",
    flag: "🇧🇩",
    facts: [
      "Bengali is the 7th most spoken language in the world.",
      "The Bengali alphabet has 50 letters — 11 vowels and 39 consonants.",
      "International Mother Language Day (Feb 21) honors the Bengali language movement.",
    ],
    phrases: [
      {
        native: "আমি সফটওয়্যার তৈরি করতে ভালোবাসি।",
        pronunciation: "Ami software toiri korte bhalobashi.",
        english: "I love building software.",
        context: "A simple declaration of passion",
      },
      {
        native: "কোড হলো কবিতার মতো — প্রতিটি লাইনের অর্থ আছে।",
        pronunciation: "Code holo kobitar moto — protiti liner ortho achhe.",
        english: "Code is like poetry — every line has meaning.",
        context: "A poetic comparison",
      },
      {
        native: "প্রতিদিন কিছু নতুন শেখা, এটাই আমার লক্ষ্য।",
        pronunciation: "Protidin kichhu notun shekha, etai amar lokkho.",
        english: "Learning something new every day — that's my goal.",
        context: "A daily mantra",
      },
    ],
  },
  {
    label: "English",
    englishName: "English",
    script: "Latin script",
    greeting: "Hello!",
    speakers: "~1.5 billion",
    color: "#4fc3f7",
    flag: "🌍",
    facts: ["English borrows words from over 350 languages.", "The most common letter in English is 'e'.", '"Set" has the most definitions of any English word — over 430.'],
    phrases: [
      {
        native: "The best code is the one you never have to debug.",
        pronunciation: "—",
        english: "The best code is the one you never have to debug.",
        context: "Every developer's dream",
      },
      {
        native: "First, solve the problem. Then, write the code.",
        pronunciation: "—",
        english: "First, solve the problem. Then, write the code.",
        context: "Wise engineering advice",
      },
      {
        native: "Ship it, learn from it, iterate on it.",
        pronunciation: "—",
        english: "Ship it, learn from it, iterate on it.",
        context: "The startup philosophy",
      },
    ],
  },
  {
    label: "Bahasa",
    englishName: "Indonesian",
    script: "Latin script",
    greeting: "Halo!",
    speakers: "~200 million",
    color: "#ff5252",
    flag: "🇮🇩",
    facts: [
      "Indonesian has no verb conjugation — the same form is used for all tenses.",
      "It uses a simple SVO sentence structure, making it one of the easiest Asian languages to learn.",
      'The word "orangutan" comes from Indonesian: orang (person) + hutan (forest).',
    ],
    phrases: [
      {
        native: "Saya suka membangun perangkat lunak.",
        pronunciation: "Sah-yah soo-kah mem-bah-noon peh-rahng-kaht loo-nahk.",
        english: "I love building software.",
        context: "A simple declaration",
      },
      {
        native: "Belajar tidak pernah berhenti, setiap hari ada hal baru.",
        pronunciation: "Beh-lah-jar tee-dahk per-nah ber-hen-tee, seh-tee-ahp hah-ree ah-dah hahl bah-roo.",
        english: "Learning never stops, every day brings something new.",
        context: "The lifelong learner's motto",
      },
      {
        native: "Kode yang baik seperti cerita yang bagus — mudah dipahami.",
        pronunciation: "Koh-deh yahng bye-ik seh-per-tee cheh-ree-tah yahng bah-goos — moo-dah dee-pah-hah-mee.",
        english: "Good code is like a good story — easy to understand.",
        context: "A developer's analogy",
      },
    ],
  },
  {
    label: "Ruáingga",
    englishName: "Rohingya",
    script: "Latin / Arabic / Hanifi Rohingya",
    greeting: "Assalamu Alaikum!",
    speakers: "~2 million",
    color: "#ffd644",
    flag: "🌏",
    facts: [
      "Rohingya recently got its own Unicode script — Hanifi Rohingya — in 2018.",
      "It's an Indo-Aryan language closely related to Chittagonian Bengali.",
      "Despite challenges, the Rohingya community preserves their language through oral tradition and digital efforts.",
    ],
    phrases: [
      {
        native: "Tuáñar hola fañsil sobi soman.",
        pronunciation: "Too-ahn-yar ho-la fahn-sil so-bee so-mahn.",
        english: "All human beings are born equal.",
        context: "A universal truth",
      },
      {
        native: "Sikká okkol din notún jínis.",
        pronunciation: "Seek-kah ok-kol deen no-toon jee-nis.",
        english: "Learn new things every day.",
        context: "An encouragement to grow",
      },
      {
        native: "Zubán amáar identity — amáar gorob.",
        pronunciation: "Zoo-bahn ah-maar identity — ah-maar go-rob.",
        english: "Language is my identity — my pride.",
        context: "The heart of linguistic heritage",
      },
    ],
  },
];

/** Quick lookup by label */
export const languagesByLabel: Record<string, LanguageData> = Object.fromEntries(languages.map((l) => [l.label, l]));
