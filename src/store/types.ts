export interface IProfileData {
  //TODO change to relevant types
  data: {
    [key in ProfileSectionType]: {
      title: string;
      info: InfoType;
      ref?: string;
    };
  };
}

export type InfoType = string | (ISkill | IProject | ILink)[];

export interface ISkill {
  label: string;
  info: string;
}

export interface ILink extends ISkill {
  icon: string;
}

export interface IProject {
  title: string;
  client: string;
  duration: string;
  softwareTech: string;
  description: string;
  responsibilities: string;
}

export type ProfileSectionType =
  | "aboutMe"
  | "details"
  | "skills"
  | "experience"
  | "education"
  | "links";