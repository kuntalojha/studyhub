// app/subjects/dslab/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { ExperimentService } from '../../../src/service/experimentService';
import { Experiment } from '../../../src/types/experiment';
import { useTheme } from '../../../src/utils/theme/ThemeProvider';
import { COLORS } from '../../../src/constants/colors';

const TAG_COLORS = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#a18cd1'];

export default function DSLabScreen() {
  const { theme, isDark } = useTheme();
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const data = await ExperimentService.getAllExperiments();
      setExperiments(data);
    } catch {
      setError('Failed to load experiments. Check your connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onRefresh = () => { setRefreshing(true); load(true); };

  const handlePress = (exp: Experiment) => {
    router.push({
      pathname: '/subjects/dslab/experiment/[id]',
      params: { id: exp.id },
    });
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Fetching experiments…
        </Text>
      </View>
    );
  }

  // ── List card ──────────────────────────────────────────────────────────────
  const renderItem = ({ item, index }: { item: Experiment; index: number }) => {
    const accent = TAG_COLORS[index % TAG_COLORS.length];
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#1A1F35' : '#FFFFFF',
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : accent + '22',
            shadowColor: isDark ? '#000' : accent,
          },
        ]}
        onPress={() => handlePress(item)}
      >
        {/* Left accent bar */}
        <View style={[styles.cardAccent, { backgroundColor: accent }]} />

        {/* Number badge */}
        <View style={[styles.badge, { backgroundColor: accent + (isDark ? '30' : '18') }]}>
          <Text style={[styles.badgeText, { color: accent }]}>
            {item.number.toString().padStart(2, '0')}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.cardBody}>
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
            {item.title}
          </Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]} numberOfLines={2}>
            {item.question}
          </Text>

          {/* Footer chips */}
          <View style={styles.chips}>
            <View style={[styles.chip, { backgroundColor: accent + (isDark ? '25' : '18') }]}>
              <Text style={[styles.chipText, { color: accent }]}>💻 Code</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: accent + (isDark ? '25' : '18') }]}>
              <Text style={[styles.chipText, { color: accent }]}>📊 Output</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.arrow, { color: isDark ? 'rgba(255,255,255,0.2)' : '#ccc' }]}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: isDark ? COLORS.bg2 : COLORS.white, }]}>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backIcon, { color: theme.textPrimary }]}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Data Structures Lab</Text>
            <Text style={[styles.headerSub, { color: theme.textSecondary }]}>
              {experiments.length} experiment{experiments.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {/* Error banner */}
        {error && (
          <View style={[
            styles.errorBanner,
            { backgroundColor: isDark ? 'rgba(255,77,77,0.12)' : '#fff0f0' },
          ]}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => load()}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Experiment list */}
        <FlatList
          data={experiments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#667eea']}
              tintColor="#667eea"
            />
          }
          ListEmptyComponent={
            !error ? (
              <View style={styles.empty}>
                <Text style={styles.emptyIcon}>🔬</Text>
                <Text style={[styles.emptyText, { color: theme.textMuted }]}>
                  No experiments found
                </Text>
              </View>
            ) : null
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 14, fontSize: 15 },

  // Header
  header: {
    paddingTop: 16,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 12, padding: 4 },
  backIcon: { fontSize: 26, color: '#fff', fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 },

  // Error banner
  errorBanner: {
    margin: 16,
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff4d4d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: { color: '#ff4d4d', fontSize: 13, flex: 1 },
  retryText: { color: '#667eea', fontWeight: '700', fontSize: 13, marginLeft: 12 },

  // List
  list: { padding: 16, gap: 14 },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardAccent: { width: 5, alignSelf: 'stretch' },
  badge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    marginRight: 4,
  },
  badgeText: { fontSize: 18, fontWeight: '800' },
  cardBody: { flex: 1, paddingVertical: 14, paddingHorizontal: 10 },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  cardSub: { fontSize: 12, lineHeight: 18 },
  chips: { flexDirection: 'row', gap: 6, marginTop: 8 },
  chip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  chipText: { fontSize: 11, fontWeight: '600' },
  arrow: { fontSize: 26, paddingRight: 16 },

  // Empty
  empty: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { fontSize: 52, marginBottom: 12 },
  emptyText: { fontSize: 16 },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
});