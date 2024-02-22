import "./style.scss";

import CalendarProvider from "@/provider/calendarProvider";
import CalendarPageContent from "@/components/pages/CalendarPage/CalendarPageContent";
function CalendarPage() {
  return (
    <CalendarProvider>
      <div className="calendar-page">
        <CalendarPageContent />
      </div>
    </CalendarProvider>
  );
}
export default CalendarPage;
