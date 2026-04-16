import { useState } from 'react';
import { C } from './theme';
import { Tab } from './types';
import { Sidebar } from './Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { InputsPage } from './pages/InputsPage';
import { LayoutPage } from './pages/LayoutPage';
import { StressPage } from './pages/StressPage';
import { EventsPage } from './pages/EventsPage';
import { IssuesPage } from './pages/IssuesPage';

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const page = {
    dashboard: <DashboardPage />,
    inputs:    <InputsPage />,
    layout:    <LayoutPage />,
    stress:    <StressPage />,
    events:    <EventsPage />,
    issues:    <IssuesPage />,
  }[activeTab];

  return (
    <view display="flex" flexDir="row" w="full" h="full" bg={C.bg}>
      <Sidebar active={activeTab} setActive={setActiveTab} />
      <view flex={1} h="full" display="flex" flexDir="col" bg={C.bg}>
        {page}
      </view>
    </view>
  );
}
