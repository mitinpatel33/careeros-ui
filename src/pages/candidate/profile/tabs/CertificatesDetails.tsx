import { WorkspacePremium } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import type { DialogField } from "./ProfileItemDialog";

export type ProfileCertificate = {
  id?: string;
  certificateName: string;
  issuedBy: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  displayOrder?: number;
};

type Props = {
  items: ProfileCertificate[];
  loading?: boolean;
  onChange: (items: ProfileCertificate[]) => void;
  onSaveStep: () => void;
};

const CertificatesDetails = ({
  items,
  loading,
  onChange,
  onSaveStep,
}: Props) => {
  const fields: DialogField<ProfileCertificate>[] = [
    { name: "certificateName", label: "Certificate Name" },
    { name: "issuedBy", label: "Issued By" },
    { name: "issueDate", label: "Issue Date", type: "date" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
    { name: "credentialId", label: "Credential ID" },
    { name: "credentialUrl", label: "Credential URL" },
  ];

  const defaultItem: ProfileCertificate = {
    certificateName: "",
    issuedBy: "",
    issueDate: "",
  };

  return (
    <ProfileCrudStep
      title="Certificates"
      subtitle="Certifications and credentials"
      icon={<WorkspacePremium />}
      items={items}
      fields={fields}
      loading={loading}
      defaultItem={defaultItem}
      getTitle={(x) => (x as ProfileCertificate).certificateName}
      getSubtitle={(x) => (x as ProfileCertificate).issuedBy}
      onChange={(items) => onChange(items as ProfileCertificate[])}
      onSaveStep={onSaveStep}
    />
  );
};

export default CertificatesDetails;