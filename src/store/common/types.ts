export interface IMaintenance {
  isUnderMaintenance: boolean;
  message: string;
  image: string;
}

export interface IIcon {
  icon: string;
  pdfExportIcon: string;
}
export interface ICommonData {
  icons: {
    star: IIcon;
    starUnfilled: IIcon;
  };
}

export type BasicDataType = "links" | "maintenance" | "pwa";

export type ProfileDataType =
  | "profileSections"
  | "links"
  | "download"
  | "skills";

export interface IConfigDataParams {
  type: string;
  ref: string;
  name: string;
}

export interface IConfigData {
  basic: IConfigDataParams[];
  profile: IConfigDataParams[];
}
