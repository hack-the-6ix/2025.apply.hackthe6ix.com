import Text from "../Text/Text";
import { Link } from "react-router-dom";

interface ReviewFieldProps {
  label: string;
  value?: string | number | null;
  renderValue?: (value: string | number) => React.ReactNode;
  editLink?: string;
}

export default function ReviewField({
  label,
  value,
  renderValue,
  editLink
}: ReviewFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Text textType="paragraph-sm" textFont="rubik" textColor="secondary">
        {label}
      </Text>
      {value && (typeof value === "string" || typeof value === "number") ? (
        <Link
          to={editLink || "#"}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
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
        </Link>
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
