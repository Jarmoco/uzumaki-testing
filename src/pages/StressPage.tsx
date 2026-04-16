import { useState, useEffect } from 'react';
import { C } from '../theme';
import { Badge } from '../components';

export function StressPage() {
  const [fastTick, setFastTick] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [tileCount, setTileCount] = useState(80);
  const [tileColors, setTileColors] = useState<string[]>([]);

  const colors20 = [
    '#7c3aed','#6d28d9','#5b21b6','#4c1d95',
    '#3b82f6','#2563eb','#1d4ed8','#1e40af',
    '#22c55e','#16a34a','#15803d','#14532d',
    '#f97316','#ea580c','#c2410c','#9a3412',
    '#ef4444','#dc2626','#b91c1c','#991b1b',
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setFastTick(t => t + 1);
      setTileColors(prev => {
        const next = [...prev];
        for (let i = 0; i < 5; i++) {
          const idx = Math.floor(Math.random() * tileCount);
          next[idx] = colors20[Math.floor(Math.random() * colors20.length)];
        }
        return next;
      });
    }, 60);
    return () => clearInterval(id);
  }, [tileCount]);

  useEffect(() => {
    setTileColors(
      Array.from({ length: tileCount }, (_, i) => colors20[i % colors20.length])
    );
  }, [tileCount]);

  return (
    <view display="flex" flexDir="col" gap={0} h="full" scrollable>
      <view display="flex" flexDir="col" px={24} py={16} borderBottom={1} borderColor={C.border}>
        <text fontSize={20} fontWeight={800} color={C.text}>Stress Test</text>
        <text fontSize={12} color={C.textMuted}>
          High-frequency updates · Large node counts · cursor kinds
        </text>
      </view>

      <view display="flex" flexDir="col" gap={24} p={24}>

        <view display="flex" flexDir="row" gap={12}>
          <view
            flex={1} p={20} bg={C.surface2} rounded={12}
            border={1} borderColor={C.border}
            display="flex" flexDir="col" gap={4}
          >
            <text fontSize={12} color={C.textMuted} fontWeight={600}>16hz TICKER</text>
            <text fontSize={52} fontWeight={900} color={fastTick % 2 === 0 ? C.accentHi : C.blueHi}>
              {fastTick}
            </text>
            <text fontSize={12} color={C.textMuted}>{(fastTick / 16).toFixed(2)}s · ~{fastTick * 16} renders</text>
          </view>
          <view
            flex={2} p={20} bg={C.surface2} rounded={12}
            border={1} borderColor={C.border}
            display="flex" flexDir="col" gap={10}
          >
            <text fontSize={12} color={C.textMuted} fontWeight={600}>PULSE BAR</text>
            <view w="95%" h={10} bg={C.surface4} rounded={5}>
              <view
                h={10}
                w={`${Math.min(80, Math.max(5, 50 + Math.sin(fastTick * 0.3) * 45))}%`}
                bg={C.accent}
                rounded={5}
              />
            </view>
            <view w="95%" h={10} bg={C.surface4} rounded={5}>
              <view
                h={10}
                w={`${Math.min(80, Math.max(5, 50 + Math.cos(fastTick * 0.2) * 45))}%`}
                bg={C.blue}
                rounded={5}
              />
            </view>
            <view w="95%" h={10} bg={C.surface4} rounded={5}>
              <view
                h={10}
                w={`${Math.min(80, Math.max(5, 50 + Math.sin(fastTick * 0.5 + 1) * 45))}%`}
                bg={C.green}
                rounded={5}
              />
            </view>
            <view w="95%" h={10} bg={C.surface4} rounded={5}>
              <view
                h={10}
                w={`${Math.min(80, Math.max(5, 50 + Math.cos(fastTick * 0.4 + 2) * 45))}%`}
                bg={C.orange}
                rounded={5}
              />
            </view>
          </view>
        </view>

        <view display="flex" flexDir="col" gap={10}>
          <view display="flex" flexDir="row" items="center" gap={8}>
            <text fontSize={14} fontWeight={700} color={C.text}>Cursor kinds</text>
          </view>
          <view display="flex" flexDir="row" gap={8}>
            {(
              ['default', 'pointer', 'text', 'crosshair', 'not-allowed', 'grab'] as const
            ).map(cur => (
              <view
                key={cur}
                px={14}
                py={10}
                bg={C.surface2}
                hover:bg={C.surface3}
                active:bg={C.surface4}
                rounded={8}
                border={1}
                borderColor={C.border}
                hover:borderColor={C.accentHi}
                cursor={cur}
              >
                <text fontSize={12} color={C.textDim} hover:color={C.text}>{cur}</text>
              </view>
            ))}
          </view>
        </view>

        <view display="flex" flexDir="col" gap={10}>
          <view display="flex" flexDir="row" items="center" justify="between">
            <view display="flex" flexDir="row" items="center" gap={8}>
              <text fontSize={14} fontWeight={700} color={C.text}>Animated tile grid</text>
              <text fontSize={12} color={C.textMuted}>({tileCount} tiles · click to count)</text>
            </view>
            <view display="flex" flexDir="row" gap={6} items="center">
              <text fontSize={12} color={C.accentHi} fontWeight={700}>{clickCount} clicks</text>
              <button
                onClick={() => setTileCount(n => Math.min(200, n + 20))}
                px={10} py={4} bg={C.surface3} hover:bg={C.surface4} rounded={6}
                border={1} borderColor={C.border} cursor="pointer"
              >
                <text fontSize={12} color={C.green}>+20</text>
              </button>
              <button
                onClick={() => setTileCount(n => Math.max(20, n - 20))}
                px={10} py={4} bg={C.surface3} hover:bg={C.surface4} rounded={6}
                border={1} borderColor={C.border} cursor="pointer"
              >
                <text fontSize={12} color={C.red}>−20</text>
              </button>
            </view>
          </view>
          <view display="flex" flexDir="col" gap={4} scrollable h={300}>
            {Array.from({ length: Math.ceil(tileColors.length / 16) }, (_, rowIdx) => (
              <view key={rowIdx} display="flex" flexDir="row" gap={4}>
                {tileColors.slice(rowIdx * 16, (rowIdx + 1) * 16).map((col, i) => (
                  <view key={rowIdx * 16 + i} w={32} h={32} bg={col} rounded={5} cursor="pointer" onClick={() => setClickCount(c => c + 1)}>
                    <text fontSize={8} fontWeight={800} color="#fff" opacity={0.5}>{rowIdx * 16 + i}</text>
                  </view>
                ))}
              </view>
            ))}
          </view>
        </view>

        <view display="flex" flexDir="col" gap={10}>
          <text fontSize={14} fontWeight={700} color={C.text}>Many sibling nodes (40 stat rows)</text>
          <view display='flex' flexDir='col' bg={C.surface} rounded={12} border={1} borderColor={C.border} scrollable h={200} overflowX="hidden">
            {Array.from({ length: 40 }, (_, i) => (
              <view
                key={i}
                display="flex"
                flexDir="row"
                items="center"
                justify="between"
                px={16}
                py={8}
                borderBottom={1}
                borderColor={C.border}
                hover:bg={C.surface2}
              >
                <view display="flex" flexDir="row" items="center" gap={10}>
                  <view
                    w={8}
                    h={8}
                    bg={tileColors[i % tileColors.length] ?? C.accent}
                    rounded={4}
                  />
                  <text fontSize={12} color={C.textDim}>Process #{String(i + 1).padStart(3, '0')}</text>
                </view>
                <view display="flex" flexDir="row" gap={16} items="center">
                  <text fontSize={11} color={C.textMuted}>
                    {(Math.sin(fastTick * 0.1 + i) * 40 + 50).toFixed(1)}% cpu
                  </text>
                  <view
                    w={60}
                    h={4}
                    bg={C.surface3}
                    rounded={2}
                  >
                    <view
                      h={4}
                      w={`${Math.abs(Math.sin(fastTick * 0.1 + i)) * 100}%`}
                      bg={tileColors[i % tileColors.length] ?? C.accent}
                      rounded={2}
                    />
                  </view>
                </view>
              </view>
            ))}
          </view>
        </view>

      </view>
    </view>
  );
}
