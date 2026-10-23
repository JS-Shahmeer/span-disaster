// Five Neighborhood Preparedness Meetings and Exercises
// NOTE: Detailed step content, team names, and operational instructions
// will be supplied from official SPAN materials.

export const meetings = [
  {
    slug: "first-meeting",
    number: 1,
    title: "The 9-Step Response Plan & Four Response Teams",
    short: "Learn the foundational response plan and team structure.",
    icon: "ListOrdered",
    description: "Introduces the foundational concepts used throughout the neighborhood program: the 9-Step Response Plan and the Four Disaster Response Teams that guide organized action during the first hour.",
    objectives: [
      "Understand the purpose of the 9-Step Response Plan and how it guides action during the first hour.",
      "Learn the Four Disaster Response Teams and their roles.",
      "Understand how households and neighbors work together.",
      "Recognize that team members follow safety procedures and do not replace professional responders.",
    ],
    cta: "Continue to the Table Top Exercise",
    nextSlug: "table-top",
  },
  {
    slug: "table-top",
    number: 2,
    title: "Table Top Exercise",
    short: "Discuss realistic scenarios, problems, and expert solutions.",
    icon: "MessageSquare",
    description: "Participants review a realistic neighborhood disaster scenario, discuss ten problems that may occur, and examine ten corresponding solutions provided by subject matter experts.",
    objectives: [
      "Review a realistic neighborhood disaster scenario.",
      "Discuss ten problems that occur within the scenario.",
      "Examine ten corresponding expert solutions.",
      "Build group decision-making through structured discussion.",
    ],
    cta: "Continue to the Walk-About Exercise",
    nextSlug: "walk-about",
  },
  {
    slug: "walk-about",
    number: 3,
    title: "Walk-About Exercise",
    short: "Walk the neighborhood and identify hazards and resources.",
    icon: "Footprints",
    description: "Participants walk through their neighborhood, identify the locations of gas meters, discuss a scenario or problem associated with each household, and learn how the Four Response Teams would respond.",
    objectives: [
      "Identify the locations of gas meters and utility shut-offs.",
      "Discuss a scenario or problem associated with each household.",
      "Learn how the Four Response Teams would respond.",
      "Build familiarity with the neighborhood environment.",
    ],
    cta: "Continue to Responder 101",
    nextSlug: "responder-101",
  },
  {
    slug: "responder-101",
    number: 4,
    title: "Responder 101 Exercise",
    short: "Practice the first six response steps starting at home.",
    icon: "House",
    description: "Participants start at home, practice the first six steps of the 9-Step Response Plan, and report to the Neighborhood Gathering Site to develop familiarity with the process before a real disaster.",
    objectives: [
      "Practice the first six steps of the 9-Step Response Plan.",
      "Practice reporting to the Neighborhood Gathering Site.",
      "Develop familiarity with the process in a low-pressure setting.",
      "Build confidence through individual practice.",
    ],
    cta: "Continue to the Functional Drill",
    nextSlug: "functional-drill",
  },
  {
    slug: "functional-drill",
    number: 5,
    title: "Functional Drill",
    short: "Apply learning through a realistic simulated response.",
    icon: "Zap",
    description: "Mystery Envelopes introduce unknown aspects of a simulated disaster. Participants use the Neighborhood Supplies Kit and the approved response methodology to work through the scenario as a team.",
    objectives: [
      "Apply the full response methodology in a simulated scenario.",
      "Use the Neighborhood Supplies Kit as part of the exercise.",
      "Work as a team to manage unknown elements introduced by Mystery Envelopes.",
      "Debrief and reinforce learning through practice.",
    ],
    cta: "Explore Resources and Continue Practicing",
    nextSlug: null,
  },
];

export function getMeetingBySlug(slug) {
  return meetings.find((m) => m.slug === slug);
}

export function getAdjacentMeetings(currentSlug) {
  const index = meetings.findIndex((m) => m.slug === currentSlug);
  return {
    prev: index > 0 ? meetings[index - 1] : null,
    next: index < meetings.length - 1 ? meetings[index + 1] : null,
  };
}
