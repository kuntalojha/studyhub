export interface Experiment {
  id: string;
  number: number;
  title: string;
  description: string;
  question: string;
  code: string;
  output: string;
  lastUpdated: string;
}

export interface GitHubContent {
  type: string;
  name: string;
  path?: string;
}
