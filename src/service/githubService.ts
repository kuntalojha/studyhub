import { GitHubContent } from "../types/experiment";
import { GITHUB_API, GITHUB_RAW, rawUrl, url } from "./config/Config";

export class GitHubService {
  static async listExperiments(): Promise<string[]> {
    try {
      const response = await fetch(GITHUB_API);
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

      const contents: GitHubContent[] = await response.json();

      return contents
        .filter(
          (item: GitHubContent) =>
            item.type === 'dir' && /^Experiment\s+\d+$/i.test(item.name)
        )
        .map((item: GitHubContent) => item.name)
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.match(/\d+/)?.[0] || '0');
          return numA - numB;
        });
    } catch (error) {
      console.error('Failed to list experiments:', error);
      return [];
    }
  }

  static async getExperimentReadme(experimentName: string): Promise<string> {
    const response = await fetch(rawUrl(experimentName));
    if (!response.ok) throw new Error(`Failed to fetch README: ${response.status}`);
    return await response.text();
  }

  static async getProgramCode(experimentName: string): Promise<string> {
    const extensions = ['.c', '.cpp', '.py', '.java', '.js'];
    for (const ext of extensions) {
      const response = await fetch(url(experimentName, ext));
      if (response.ok) return await response.text();
    }
    return '// Program file not found';
  }

  static async getOutput(experimentName: string): Promise<string> {
    const url = `${GITHUB_RAW}/${encodeURIComponent(experimentName)}/output.txt`;
    const response = await fetch(url);
    if (response.ok) return await response.text();
    return 'Output not available';
  }
}