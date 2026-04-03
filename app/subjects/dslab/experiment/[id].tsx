// app/subjects/dslab/experiment/[id].tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  Alert,
  StatusBar,
  Animated,
  Clipboard,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ExperimentService } from '../../../../src/service/experimentService';
import { Experiment } from '../../../../src/types/experiment';
import { useTheme } from '../../../../src/utils/theme/ThemeProvider';
import { Header } from '../../../page_layout/Header';

type TabType = 'question' | 'code' | 'output';

const TAB_CONFIG: { key: TabType; label: string; icon: string }[] = [
  { key: 'question', label: 'Question', icon: '📋' },
  { key: 'code',     label: 'Code',     icon: '💻' },
  { key: 'output',   label: 'Output',   icon: '📊' },
];

export default function ExperimentDetailScreen() {
  const { theme, isDark } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('question');
  const [copied, setCopied] = useState(false);

  const indicatorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => { loadExperiment(); }, [id]);

  const loadExperiment = async () => {
    try {
      const exp = await ExperimentService.getExperimentById(id);
      setExperiment(exp);
    } catch {
      Alert.alert('Error', 'Failed to load experiment details');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab: TabType) => {
    const idx = TAB_CONFIG.findIndex((t) => t.key === tab);
    Animated.spring(indicatorAnim, {
      toValue: idx,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
    setActiveTab(tab);
  };

  const handleShare = async () => {
    if (!experiment) return;
    try {
      await Share.share({
        title: experiment.title,
        message: `${experiment.title}\n\nQuestion:\n${experiment.question}\n\nCode:\n${experiment.code}`,
      });
    } catch {
      Alert.alert('Error', 'Failed to share');
    }
  };

  const handleCopy = () => {
    if (!experiment) return;
    Clipboard.setString(experiment.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Loading experiment…
        </Text>
      </View>
    );
  }

  if (!experiment) {
    return (
      <View style={[styles.center, { backgroundColor: theme.bg }]}>
        <Text style={styles.notFoundIcon}>🔍</Text>
        <Text style={[styles.notFoundText, { color: theme.textMuted }]}>
          Experiment not found
        </Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.goBack}>
          <Text style={styles.goBackText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Tab bar background ────────────────────────────────────────────────────
  const tabBarBg = isDark ? '#1A1F35' : '#FFFFFF';
  const tabBarBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(79,142,247,0.10)';

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      {/* Background gradient — mirrors dashboard */}
      <LinearGradient
        colors={theme.bgGradient as any}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative orbs */}
      <View style={[styles.bgOrb, { top: -60, right: -80, backgroundColor: theme.bgOrb1 }]} />
      <View style={[styles.bgOrb, { bottom: 120, left: -60, width: 180, height: 180, backgroundColor: theme.bgOrb2 }]} />

      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <Header onLogout={() => router.replace('/auth_screen/login')} />
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={[styles.backIcon, { color: theme.textPrimary }]}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={[styles.headerTitle, { color: theme.textPrimary }]} numberOfLines={2}>
                {experiment.title}
              </Text>
            </View>
            <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
              <Text style={styles.shareIcon}>📤</Text>  
            </TouchableOpacity>
          </View>

        {/* ── TAB BAR ─────────────────────────────────────────────────────── */}
        <View style={[
          styles.tabBar,
          {
            backgroundColor: tabBarBg,
            borderColor: tabBarBorder,
            borderWidth: 1,
          },
        ]}>
          {TAB_CONFIG.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => switchTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabLabel,
                { color: theme.textMuted },
                activeTab === tab.key && styles.tabLabelActive,
              ]}>
                {tab.icon} {tab.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Sliding underline */}
          <Animated.View
            style={[
              styles.tabIndicator,
              {
                transform: [
                  {
                    translateX: indicatorAnim.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: ['0%', '100%', '200%'],
                    }) as any,
                  },
                ],
              },
            ]}
          />
        </View>

        {/* ── CONTENT ─────────────────────────────────────────────────────── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── QUESTION TAB ──────────────────────────────────────────────── */}
          {activeTab === 'question' && (
            <View>
              <SectionHeader icon="🎯" title="Problem Statement" isDark={isDark} textPrimary={theme.textPrimary} />
              <View style={[
                styles.questionCard,
                {
                  backgroundColor: isDark ? '#1A1F35' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(79,142,247,0.10)',
                  borderWidth: 1,
                  shadowColor: isDark ? '#000' : '#667eea',
                },
              ]}>
                <Text style={[styles.questionText, { color: theme.textPrimary }]}>
                  {experiment.question}
                </Text>
              </View>
            </View>
          )}

          {/* ── CODE TAB ──────────────────────────────────────────────────── */}
          {activeTab === 'code' && (
            <View>
              <View style={styles.codeHeaderRow}>
                <SectionHeader icon="💻" title="Solution" isDark={isDark} textPrimary={theme.textPrimary} />
                <TouchableOpacity
                  onPress={handleCopy}
                  style={[styles.copyBtn, copied && styles.copyBtnDone]}
                >
                  <Text style={styles.copyBtnText}>{copied ? '✅ Copied!' : '📋 Copy'}</Text>
                </TouchableOpacity>
              </View>

              {/* Language chip */}
              <View style={[
                styles.langChip,
                {
                  backgroundColor: isDark ? '#1A1F35' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,122,204,0.15)',
                  borderWidth: 1,
                },
              ]}>
                <Text style={styles.langDot}>●</Text>
                <Text style={[styles.langText, { color: theme.textSecondary }]}>C Language</Text>
              </View>

              {/* Code block */}
              <View style={[styles.codeBlock, { backgroundColor: isDark ? '#12131F' : '#1e1e2e' }]}>
                <View style={styles.windowDots}>
                  <View style={[styles.dot, { backgroundColor: '#ff5f57' }]} />
                  <View style={[styles.dot, { backgroundColor: '#febc2e' }]} />
                  <View style={[styles.dot, { backgroundColor: '#28c840' }]} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Text style={styles.codeText}>{experiment.code}</Text>
                </ScrollView>
              </View>
            </View>
          )}

          {/* ── OUTPUT TAB ────────────────────────────────────────────────── */}
          {activeTab === 'output' && (
            <View>
              <SectionHeader icon="📊" title="Program Output" isDark={isDark} textPrimary={theme.textPrimary} />
              <View style={[styles.terminalBlock, { backgroundColor: isDark ? '#12131F' : '#1e1e2e' }]}>
                {/* Terminal header bar */}
                <View style={[styles.terminalBar, { backgroundColor: isDark ? '#1A1D2E' : '#2a2a3e' }]}>
                  <View style={styles.windowDots}>
                    <View style={[styles.dot, { backgroundColor: '#ff5f57' }]} />
                    <View style={[styles.dot, { backgroundColor: '#febc2e' }]} />
                    <View style={[styles.dot, { backgroundColor: '#28c840' }]} />
                  </View>
                  <Text style={styles.terminalBarTitle}>bash — output</Text>
                </View>
                {/* Prompt line */}
                <View style={styles.terminalPrompt}>
                  <Text style={styles.terminalPromptText}>$ ./program</Text>
                </View>
                {/* Output lines */}
                <Text style={styles.outputText}>{experiment.output}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionHeader({
  icon, title, isDark, textPrimary,
}: {
  icon: string; title: string; isDark: boolean; textPrimary: string;
}) {
  return (
    <View style={sh.row}>
      <View style={[sh.iconBox, { backgroundColor: isDark ? 'rgba(102,126,234,0.20)' : '#667eea18' }]}>
        <Text style={sh.icon}>{icon}</Text>
      </View>
      <Text style={[sh.title, { color: textPrimary }]}>{title}</Text>
    </View>
  );
}

const sh = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: { fontSize: 18 },
  title: { fontSize: 18, fontWeight: '800' },
});

function StatBadge({
  icon, label, value, isDark, theme,
}: {
  icon: string; label: string; value: string; isDark: boolean; theme: any;
}) {
  return (
    <View style={[
      sb.card,
      {
        backgroundColor: isDark ? '#1A1F35' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(79,142,247,0.10)',
        borderWidth: 1,
        shadowColor: isDark ? '#000' : '#667eea',
      },
    ]}>
      <Text style={sb.icon}>{icon}</Text>
      <Text style={[sb.label, { color: theme.textMuted }]}>{label}</Text>
      <Text style={[sb.value, { color: theme.textPrimary }]}>{value}</Text>
    </View>
  );
}

const sb = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: { fontSize: 22, marginBottom: 4 },
  label: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  value: { fontSize: 14, fontWeight: '800', marginTop: 2 },
});

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  } catch {
    return '—';
  }
}

// ── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 14, fontSize: 15 },
  notFoundIcon: { fontSize: 52, marginBottom: 12 },
  notFoundText: { fontSize: 17, marginBottom: 20 },
  bgOrb: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  goBack: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  goBackText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // Header
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { padding: 6, marginRight: 6 },
  backIcon: { fontSize: 26, color: '#fff', fontWeight: '600' },
  headerCenter: { flex: 1, alignItems: 'center' },
  expBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 6,
  },
  expBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#fff', textAlign: 'center' },
  shareBtn: { padding: 6, marginLeft: 6 },
  shareIcon: { fontSize: 22 },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 4,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#667eea',
    fontWeight: '800',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: `${100 / 3}%`,
    height: 3,
    backgroundColor: '#667eea',
    borderRadius: 3,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Question
  questionCard: {
    borderRadius: 18,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  questionText: { fontSize: 15, lineHeight: 24 },
  statsRow: { flexDirection: 'row', gap: 12 },

  // Code
  codeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  copyBtn: {
    backgroundColor: '#667eea',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
  },
  copyBtnDone: { backgroundColor: '#28c840' },
  copyBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  langDot: { color: '#007acc', marginRight: 5, fontSize: 10 },
  langText: { fontSize: 12, fontWeight: '600' },

  // Code block
  codeBlock: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  windowDots: { flexDirection: 'row', gap: 6, padding: 12, paddingBottom: 8 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#cdd6f4',
    lineHeight: 22,
    padding: 16,
    paddingTop: 0,
  },

  // Terminal / output
  terminalBlock: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  terminalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  terminalBarTitle: { color: '#aaa', fontSize: 12, marginLeft: 10, fontFamily: 'monospace' },
  terminalPrompt: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  terminalPromptText: { color: '#a6e3a1', fontSize: 13, fontFamily: 'monospace', fontWeight: '700' },
  outputText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#cdd6f4',
    lineHeight: 22,
    padding: 16,
    paddingTop: 8,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
});