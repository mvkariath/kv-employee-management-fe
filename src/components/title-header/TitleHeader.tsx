import "./TitleHeader.css";
interface TitleHeaderProps {
  title: string;
  endAdonment?: React.ReactNode;
}
export const TitleHeader = ({ title, endAdonment }: TitleHeaderProps) => {
  return (
    <section className="form-header">
      <h1>{title}</h1>
      {endAdonment && endAdonment}
    </section>
  );
};
