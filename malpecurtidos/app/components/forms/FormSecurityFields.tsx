import { useFormSecurity } from "~/lib/use-form-security";

export function FormSecurityFields() {
  const { csrfToken, submittedAt } = useFormSecurity();

  return (
    <>
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="hidden" name="submittedAt" value={submittedAt} />
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
    </>
  );
}
