// BlogSectionInterface.ts
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface BlogPost {
  id: string;
  icon: IconDefinition;
  gradient: string;
  date: string;
  title: string;
  description: string;
}

export interface QuickTip {
  icon: IconDefinition;
  title: string;
  description: string;
}
