import { useState } from "react";
import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { BiShowAlt, BiSolidShow } from "react-icons/bi";

interface InputField {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  icon: React.ReactNode;
  name: string;
}

interface AuthFormProps {
  fields: InputField[];
  buttonText: string;
  onSubmit: (values: Record<string, string>) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ fields, buttonText, onSubmit }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-[5px]">
          <label className="flex justify-start">{field.label}</label>
          <div className="w-[250px] py-[10px] flex focus-within:border-blue-500 gap-[10px] px-[5px] items-center rounded-[10px] border-[0.5px] border-slate-400">
            {field.icon}
            <input
              type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
              placeholder={field.placeholder}
              className="outline-none flex-1"
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
            {field.type === "password" && (
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <BiSolidShow className="text-2xl" /> : <BiShowAlt className="text-2xl" />}
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white w-[250px] py-[10px] rounded-[10px] font-medium"
      >
        {buttonText}
      </button>
    </form>
  );
};
