import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Initial Requirements",
    icon: "ClipboardList",
    bullets: [
      "Understanding your needs: We begin by listening intently to your vision, goals, and target audience. Through in-depth discussions and collaborative workshops, we define the core functionalities and user experience.",
      "Mapping the roadmap: We create a detailed project roadmap outlining key milestones, timelines, and resources.",
    ],
  },
  {
    number: 2,
    title: "Design",
    icon: "PenTool",
    bullets: [
      "Bringing your vision to life: We present you with a functional prototype. This interactive demo allows you to visualize the product and provide feedback before development begins.",
      "Refine and iterate: Your feedback is gold. We incorporate your suggestions to refine the prototype until it perfectly aligns with your vision.",
    ],
  },
  {
    number: 3,
    title: "Development, Testing & Debugging",
    icon: "Code2",
    bullets: [
      "Agile and collaborative: We leverage the power of Scrum. Continuous progress with frequent deliveries and feedback opportunities.",
      "Quality at every step: Our dedicated QA team rigorously tests and debugs every feature — from unit testing to integration testing.",
    ],
  },
  {
    number: 4,
    title: "UAT Phase",
    icon: "FlaskConical",
    bullets: [
      "Get your hands on it: We provide a beta version for thorough testing in your real-world environment.",
      "Identify any potential issues and provide final feedback before launch.",
    ],
  },
  {
    number: 5,
    title: "Iterative Enhancements",
    icon: "RefreshCw",
    bullets: [
      "Continuous improvement: Based on your feedback, we refine the software further.",
      "This iterative approach ensures your software evolves alongside your needs.",
    ],
  },
  {
    number: 6,
    title: "Production Release",
    icon: "Rocket",
    bullets: [
      "Ready for the world: We launch your software with meticulous attention to detail, ensuring a seamless rollout and a positive user experience.",
    ],
  },
  {
    number: 7,
    title: "Support & Maintenance",
    icon: "Headphones",
    bullets: [
      "Always there for you: Our commitment doesn't end at launch.",
      "We provide ongoing support and maintenance, ensuring your software remains bug-free and up-to-date.",
    ],
  },
];
