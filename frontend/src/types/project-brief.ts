export interface Milestone {
  id: string;
  name: string;
  targetDate: string;
  description: string;
}

export interface ProjectBriefData {

  projectName: string;
  preparedBy: "Client" | "Freelancer";
  projectType: string;
  projectGoal: string;
  targetAudience: string;


  requirements: string[];


  deliverables: string[];


  designPreferences: string;
  references: string[];
  likes: string;
  dislikes: string;


  startDate: string;
  deliveryDate: string;
  milestones: Milestone[];


  includedRevisions: string;
  communicationMethod: string;
  contactPerson: string;
  communicationNotes: string;


  estimatedBudget: string;
  currency: string;


  additionalNotes: string;
}
