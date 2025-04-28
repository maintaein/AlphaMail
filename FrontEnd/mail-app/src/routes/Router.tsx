import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  HomePage  from '@/pages/HomePage';
import  MailPage  from '@/pages/MailPage';
import  SchedulePage  from '@/pages/SchedulePage';
import  WorkPage  from '@/pages/WorkPage';
import  GroupManagePage  from '@/pages/GroupManagePage';
import  CalendarTest  from '@/pages/CalendarTest';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mail" element={<MailPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/group" element={<GroupManagePage />} />
        <Route path="/calendar-test" element={<CalendarTest />} />
      </Routes>
    </BrowserRouter>
  );
};
