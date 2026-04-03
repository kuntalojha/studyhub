// src/components/CodeBlock.tsx (create this file)
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'c' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>{language.toUpperCase()}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.codeText}>{code}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 12,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d3d',
  },
  language: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#d4d4d4',
    padding: 16,
    lineHeight: 20,
  },
});