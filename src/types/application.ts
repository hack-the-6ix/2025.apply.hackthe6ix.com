export interface IEmergencyContact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: string;
}

export interface IApplication {
  lastUpdated?: number;
  teamCode?: string;
  emailConsent: boolean;
  phoneNumber: string;
  age: number;
  gender: string;
  ethnicity: string;
  country: string;
  shirtSize: string;
  dietaryRestrictions: string;
  city: string;
  province: string;
  school: string;
  program: string;
  levelOfStudy: string;
  graduationYear: number;
  hackathonsAttended: string;
  resumeFileName: string;
  friendlyResumeFileName: string;
  resumeSharePermission: boolean;
  githubLink: string;
  portfolioLink: string;
  linkedinLink: string;
  creativeResponseEssay: string;
  whyHT6Essay: string;
  oneSentenceEssay: string;
  mlhCOC: boolean;
  mlhEmail: boolean;
  mlhData: boolean;
  howDidYouHearAboutHT6: string[];
  requestedWorkshops: string[];
  emergencyContact: IEmergencyContact;
  avatarBase: number;
  avatarItem: number;
  previousHT6Experience: string[];
}

export type IPartialApplication = Partial<IApplication>;
