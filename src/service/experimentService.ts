// src/service/experimentService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GitHubService } from './githubService';
import { Experiment } from '../types/experiment';

const CACHE_KEY = '@dslab_experiments_cache';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

interface CacheEntry {
  data: Experiment[];
  timestamp: number;
}

export class ExperimentService {
  // ─── Public API ────────────────────────────────────────────────────────────

  static async getAllExperiments(): Promise<Experiment[]> {
    try {
      const cached = await this.readCache();
      if (cached) return cached;

      const folders = await GitHubService.listExperiments();
      if (folders.length === 0) return [];

      const experiments: Experiment[] = [];

      for (const folder of folders) {
        try {
          const number = parseInt(folder.match(/\d+/)?.[0] || '0');
          const readme = await GitHubService.getExperimentReadme(folder);
          const parsed = this.parseReadme(readme);

          experiments.push({
            id: `exp${number}`,
            number,
            title: parsed.title || `Experiment ${number.toString().padStart(2, '0')}`,
            question: parsed.question,
            description: parsed.description,
            code: parsed.code,
            output: parsed.output,
            lastUpdated: new Date().toISOString(),
          });
        } catch (err) {
          console.error(`Failed to load ${folder}:`, err);
        }
      }

      await this.writeCache(experiments);
      return experiments;
    } catch (err) {
      console.error('getAllExperiments error:', err);
      return (await this.readCache(true)) ?? [];
    }
  }

  static async getExperimentById(id: string): Promise<Experiment | null> {
    const all = await this.getAllExperiments();
    return all.find((e) => e.id === id) ?? null;
  }

  // ─── README parser ─────────────────────────────────────────────────────────
  //
  // Expected README structure (markdown):
  //
  //   ## Experiment N:
  //   ### Question / ### Quuestion
  //   - **Write a program ...**
  //   ### Program
  //   ```c
  //   <code>
  //   ```
  //   ### Output:
  //   ```
  //   <output>
  //   ```

  private static parseReadme(raw: string): {
    title: string;
    question: string;
    description: string;
    code: string;
    output: string;
  } {
    const lines = raw.split('\n');

    let title = '';
    let question = '';
    let code = '';
    let output = '';

    type Section = 'none' | 'question' | 'code' | 'output';
    let section: Section = 'none';
    let inCodeFence = false;
    let codeLang = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // ── Detect section headings ──────────────────────────────────────────
      if (/^#{1,3}\s+Experiment\s+\d+/i.test(trimmed)) {
        title = trimmed.replace(/^#+\s*/, '');
        section = 'none';
        continue;
      }
      if (/^#{1,4}\s+(qu+estion|problem statement)/i.test(trimmed)) {
        section = 'question';
        inCodeFence = false;
        continue;
      }
      if (/^#{1,4}\s+(program|solution|code)/i.test(trimmed)) {
        section = 'code';
        inCodeFence = false;
        continue;
      }
      if (/^#{1,4}\s+output/i.test(trimmed)) {
        section = 'output';
        inCodeFence = false;
        continue;
      }

      // ── Code fence handling ──────────────────────────────────────────────
      if (trimmed.startsWith('```')) {
        if (!inCodeFence) {
          inCodeFence = true;
          codeLang = trimmed.slice(3).trim();
        } else {
          inCodeFence = false;
          codeLang = '';
        }
        continue; // never include the fence markers
      }

      // ── Accumulate content ───────────────────────────────────────────────
      if (section === 'question') {
        // strip markdown bold/list markers for cleaner display
        const clean = trimmed.replace(/^\s*[-*]\s*/, '').replace(/\*\*/g, '');
        if (clean) question += clean + '\n';
      } else if (section === 'code') {
        // only capture lines inside a code fence
        if (inCodeFence) code += line + '\n';
      } else if (section === 'output') {
        // capture lines inside a code fence, or plain lines
        if (inCodeFence || (!trimmed.startsWith('#') && trimmed)) {
          output += line + '\n';
        }
      }
    }

    const q = question.trim();
    return {
      title,
      question: q || 'Question not available',
      description: q || 'No description',
      code: code.trim() || '// Code not found',
      output: output.trim() || 'Output not available',
    };
  }

  // ─── Cache helpers ──────────────────────────────────────────────────────────

  private static async readCache(ignoreExpiry = false): Promise<Experiment[] | null> {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const entry: CacheEntry = JSON.parse(raw);
      if (!ignoreExpiry && Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
      return entry.data;
    } catch {
      return null;
    }
  }

  private static async writeCache(data: Experiment[]): Promise<void> {
    try {
      const entry: CacheEntry = { data, timestamp: Date.now() };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch (err) {
      console.error('Cache write failed:', err);
    }
  }
}