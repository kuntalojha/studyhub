export const GITHUB_API = 'https://api.github.com/repos/kuntalojha/DSLAB/contents';
export const GITHUB_RAW = 'https://raw.githubusercontent.com/kuntalojha/DSLAB/main';

export const rawUrl = (experimentName: string): string => `${GITHUB_RAW}/${encodeURIComponent(experimentName)}/README.md`;
export const url = (experimentName:string, ext:string):string => `${GITHUB_RAW}/${encodeURIComponent(experimentName)}/program${ext}`;