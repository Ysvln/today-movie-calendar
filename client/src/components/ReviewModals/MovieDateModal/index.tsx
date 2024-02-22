import Modal from "@/components/Modal";
import CalendarProvider from "@/provider/calendarProvider";
import MovieDateModalContent from "./MovieDateModalContent";
import { useReviewContext } from "@/provider/reviewProvider";

interface MovieDateModalProps {
  closeModal: () => void;
}

const MovieDateModal = ({ closeModal }: MovieDateModalProps) => {
  const { review } = useReviewContext();
  const { title } = review;
  return (
    <Modal title={title} handleModalClose={closeModal}>
      <CalendarProvider>
        <MovieDateModalContent closeModal={closeModal} />
      </CalendarProvider>
    </Modal>
  );
};
export default MovieDateModal;
