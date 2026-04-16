import { useState, useEffect } from 'react';
import { C } from '../theme';
import { Badge } from '../components';
import { Table } from '../Table';

interface GitHubIssue {
  number: number;
  title: string;
  state: string;
  user: { login: string };
  created_at: string;
  comments: number;
  labels: Array<{ name: string; color: string }>;
}

export function IssuesPage() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/golok727/uzumaki/issues')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setIssues(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const columns = [
    { key: 'number', header: '#', width: 50 },
    { key: 'title', header: 'Title', width: 280 },
    { key: 'state', header: 'State', width: 70, render: (row: GitHubIssue) => (
      <Badge 
        label={row.state.toUpperCase()} 
        color={row.state === 'open' ? C.greenHi : C.textMuted} 
        bg={row.state === 'open' ? C.greenDim : C.surface3} 
      />
    )},
    { key: 'user', header: 'Author', width: 100, render: (row: GitHubIssue) => (
      <text fontSize={12} color={C.blueHi}>{row.user.login}</text>
    )},
    { key: 'comments', header: 'Comments', width: 70 },
    { key: 'created_at', header: 'Created', width: 90, render: (row: GitHubIssue) => (
      <text fontSize={11} color={C.textMuted}>
        {new Date(row.created_at).toLocaleDateString()}
      </text>
    )},
  ];

  return (
    <view display="flex" flexDir="col" gap={0} h="full" scrollable>
      <view display="flex" flexDir="col" px={24} py={16} borderBottom={1} borderColor={C.border}>
        <view display="flex" flexDir="row" items="center" gap={12}>
          <text fontSize={20} fontWeight={800} color={C.text}>GitHub Issues</text>
          <Badge label="Table Test" color={C.yellowHi} bg="#422006" />
        </view>
        <text fontSize={12} color={C.textMuted}>
          Fetching from https://github.com/golok727/uzumaki/issues
        </text>
      </view>

      <view display="flex" flexDir="col" gap={20} p={24}>
        {loading && (
          <view p={40} display="flex" items="center" justify="center">
            <text fontSize={14} color={C.textMuted}>Loading issues...</text>
          </view>
        )}

        {error && (
          <view p={20} bg={C.redDim} rounded={10} border={1} borderColor={C.red}>
            <text fontSize={14} color={C.redHi}>Error: {error}</text>
          </view>
        )}

        {!loading && !error && issues.length === 0 && (
          <view p={40} display="flex" items="center" justify="center">
            <text fontSize={14} color={C.textMuted}>No issues found</text>
          </view>
        )}

        {!loading && !error && issues.length > 0 && (
          <view display="flex" flexDir="col" gap={12}>
            <view display="flex" flexDir="row" items="center" justify="between">
              <text fontSize={14} fontWeight={700} color={C.text}>
                Issues List ({issues.length} total)
              </text>
              <Badge label={String(issues.length)} color={C.accentHi} bg={C.accentDark} />
            </view>
            <Table
              columns={columns}
              data={issues}
              keyField="number"
              rowHeight={48}
            />
          </view>
        )}
      </view>
    </view>
  );
}
