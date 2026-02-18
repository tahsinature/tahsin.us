/**
 * Code snippets shown in the interactive code terminal.
 *
 * To add a new language:
 *   1. Add an entry to the `snippets` array below.
 *   2. `lang` must be a valid Shiki language identifier
 *      (see https://shiki.style/languages).
 *   3. That's it — syntax highlighting, typing effect, and output
 *      are all handled automatically.
 */

export interface CodeSnippet {
  /** Display name shown on the tag / tab */
  label: string;
  /** Shiki language identifier (e.g. "python", "java", "typescript") */
  lang: string;
  /** Filename shown in the terminal title bar */
  file: string;
  /** The run command displayed before output (e.g. "python hello.py") */
  runCmd: string;
  /** The source code to type out */
  code: string;
  /** Simulated stdout lines shown after execution */
  output: string[];
}

export const snippets: CodeSnippet[] = [
  {
    label: "Python",
    lang: "python",
    file: "hello.py",
    runCmd: "python hello.py",
    code: `skills = ["Python", "AWS", "Docker"]
years = 2026 - 2017

print(f"{years}+ years of coding")
print("Top:", ", ".join(skills))`,
    output: ["9+ years of coding", "Top: Python, AWS, Docker"],
  },
  {
    label: "Java",
    lang: "java",
    file: "Dev.java",
    runCmd: "java Dev.java",
    code: `var tools = List.of("Java", "Spring", "AWS");
for (var t : tools) {
    System.out.println("→ " + t);
}
System.out.println("Ready to build! 🚀");`,
    output: ["→ Java", "→ Spring", "→ AWS", "Ready to build! 🚀"],
  },
  {
    label: "TypeScript",
    lang: "typescript",
    file: "dev.ts",
    runCmd: "tsx dev.ts",
    code: `type Fuel = "music" | "code" | "sleep";
const today: Fuel[] = ["music", "code"];

today.forEach(f =>
  console.log("Powered by: " + f)
);`,
    output: ["Powered by: music", "Powered by: code"],
  },
  {
    label: "JavaScript",
    lang: "javascript",
    file: "hello.js",
    runCmd: "node hello.js",
    code: `const fizzbuzz = (n) =>
  n % 15 === 0 ? "FizzBuzz"
  : n % 3 === 0 ? "Fizz"
  : n % 5 === 0 ? "Buzz" : n;

[3, 5, 15, 7].forEach(n =>
  console.log(fizzbuzz(n))
);`,
    output: ["Fizz", "Buzz", "FizzBuzz", "7"],
  },
  {
    label: "Go",
    lang: "go",
    file: "main.go",
    runCmd: "go run main.go",
    code: `package main
import "fmt"

func main() {
    langs := []string{"Go", "Python", "Java"}
    for _, l := range langs {
        fmt.Printf("❤️ %s\\n", l)
    }
}`,
    output: ["❤️ Go", "❤️ Python", "❤️ Java"],
  },
];

/** Quick lookup by label */
export const snippetsByLabel: Record<string, CodeSnippet> = Object.fromEntries(snippets.map((s) => [s.label, s]));
