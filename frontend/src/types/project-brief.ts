export interface Milestone {
  id: string;
  name: string;
  targetDate: string;
  description: string;
}

export interface ProjectBriefData {
  // Step 1: Basics
  projectName: string;
  preparedBy: "Client" | "Freelancer";
  projectType: string;
  projectGoal: string;
  targetAudience: string;

  // Step 2: Requirements
  requirements: string[];

  // Step 3: Deliverables
  deliverables: string[];

  // Step 4: Design / Style / References
  designPreferences: string;
  references: string[];
  likes: string;
  dislikes: string;

  // Step 5: Timeline
  startDate: string;
  deliveryDate: string;
  milestones: Milestone[];

  // Step 6: Revisions & Communication
  includedRevisions: string;
  communicationMethod: string;
  contactPerson: string;
  communicationNotes: string;

  // Step 7: Budget
  estimatedBudget: string;
  currency: string;

  // Step 8: Final Questions
  additionalNotes: string;
}
