import Text from "../Text/Text";

interface ReviewFieldProps {
  label: string;
  value?: string | number | null;
  renderValue?: (value: string | number) => React.ReactNode;
  editLink?: string;
}

export default function ReviewField({
  label,
  value,
  renderValue
}: ReviewFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Text textType="paragraph-sm" textFont="rubik" textColor="secondary">
        {label}
      </Text>
      {value && (typeof value === "string" || typeof value === "number") ? (
        <Text
          textType="paragraph-lg-semibold"
          textFont="rubik"
          textColor="primary"
          className={
            typeof value === "string" && value.includes(" ")
              ? "whitespace-pre-wrap"
              : ""
          }
        >
          {renderValue ? renderValue(value) : value}
        </Text>
      ) : (
        <Text
          textType="paragraph-lg-semibold"
          textFont="rubik"
          textColor="gray"
        >
          Not filled
        </Text>
      )}
    </div>
  );
}
