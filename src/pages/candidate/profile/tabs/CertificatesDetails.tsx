import { WorkspacePremium } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

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
  onSave: (items: ProfileCertificate[]) => Promise<void>;
};

const CertificatesDetails = ({ items, loading, onSave }: Props) => {
  const fields: any[] = [
    { name: "certificateName", label: "Certificate Name" },
    { name: "issuedBy", label: "Issued By" },
    { name: "issueDate", label: "Issue Date", type: "date" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
    { name: "credentialId", label: "Credential ID" },
    { name: "credentialUrl", label: "Credential URL" },
  ];

  return (
    <ProfileCrudStep<ProfileCertificate>
      title="Certificates"
      subtitle="Certifications and credentials"
      icon={<WorkspacePremium />}
      items={items}
      loading={loading}
      defaultItem={{
        certificateName: "",
        issuedBy: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        credentialUrl: "",
      }}
      fields={fields}
      getTitle={(x) => x.certificateName}
      getSubtitle={(x) => x.issuedBy}
      onSave={onSave}
    />
  );
};

export default CertificatesDetails;