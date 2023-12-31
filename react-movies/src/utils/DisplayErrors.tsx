export default function DisplayErrors(props: displayErrorsProps) {
  return (
    <>
      {Array.isArray(props.errors) ? (
        <ul style={{ color: "red" }}>
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

interface displayErrorsProps {
  errors?: string[];
}
