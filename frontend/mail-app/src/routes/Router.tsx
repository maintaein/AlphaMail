import { Routes, Route } from 'react-router-dom';
import  HomePage  from '@/pages/HomePage';
import  MailPage  from '@/pages/MailPage';
import  SchedulePage  from '@/pages/SchedulePage';
import  WorkPage  from '@/pages/WorkPage';
import  GroupManagePage  from '@/pages/GroupManagePage';
import  SearchTest  from '@/pages/SearchTest';

export const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mail" element={<MailPage />} />
        <Route path="/mail/sent" element={<MailPage />} />
        <Route path="/mail/trash" element={<MailPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/group" element={<GroupManagePage />} />
        <Route path="/search-test" element={<SearchTest />} />
      </Routes>
  );
};
