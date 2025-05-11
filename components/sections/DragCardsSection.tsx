import { DraggableCards } from "../DraggableCards";

export default function DragCardsSection() {
  return (
    <section
      className="relative
        bg-gradient-to-br
        from-[var(--color-secondary)]
        via-[var(--color-primary)]
        to-[var(--color-primary-dark)]
        overflow-hidden
        rounded-2xl
        before:absolute
        before:inset-0
        before:rounded-2xl
        before:shadow-[inset_0_0_50px_rgba(0,0,0,0.45)]
        before:pointer-events-none "
    >
   
      <DraggableCards />
    </section>
  );
}
