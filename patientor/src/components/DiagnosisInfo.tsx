import { Diagnosis } from "../types";

interface DiagnosisInfoProps {
  diagnosis: Diagnosis;
}
const DiagnosisInfo = ({ diagnosis }: DiagnosisInfoProps) => {
  return (
    <li>
      {diagnosis.code} {diagnosis.name}
    </li>
  );
};

export default DiagnosisInfo;
