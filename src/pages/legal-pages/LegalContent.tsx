// Auto-generated from the legal markdown. Edit text here (fill in the [bracketed] placeholders).
export type Block =
    | { t: "p"; text: string }
    | { t: "h3"; text: string }
    | { t: "ul" | "ol"; items: string[] };

export interface LegalSection { id: string; num: string; title: string; blocks: Block[] }
export interface LegalDoc {
    title: string; subtitle: string; effective: string; updated: string;
    intro: Block[]; sections: LegalSection[];
}

export const privacyPolicy: LegalDoc = {
    "title": "Privacy Policy",
    "subtitle": "How Career OS collects, uses and protects your information.",
    "effective": "[DD Month YYYY]",
    "updated": "October 26, 2026",
    "intro": [
        {
            "t": "p",
            "text": "This Privacy Policy explains how **[Company / Owner Name]** (\"we\", \"us\", \"our\") collects, uses, stores and shares your personal information when you use Career OS (the \"Service\"), including our website, Candidate Portal, resume builder, AI resume import and public profile features."
        },
        {
            "t": "p",
            "text": "By creating an account or using the Service, you agree to this Policy. If you do not agree, please do not use the Service."
        }
    ],
    "sections": [
        {
            "id": "s1",
            "num": "1",
            "title": "Information We Collect",
            "blocks": [
                {
                    "t": "h3",
                    "text": "1.1 Information you provide"
                },
                {
                    "t": "ul",
                    "items": [
                        "**Account details:** name, email address and password (stored only in encrypted/hashed form).",
                        "**Resume and profile data:** contact details, photograph, headline/summary, work experience, education, skills, projects, certifications, languages, links (e.g. LinkedIn, GitHub, portfolio) and any other details you add.",
                        "**Uploaded files:** resumes in PDF or Word format that you upload for AI import.",
                        "**Communications:** messages you send to our support team."
                    ]
                },
                {
                    "t": "h3",
                    "text": "1.2 Information from third-party sign-in"
                },
                {
                    "t": "p",
                    "text": "If you log in with **Google** or **Facebook**, we receive basic profile information such as your name, email address and profile picture, as permitted by your settings with those providers. We do not receive your Google or Facebook password."
                },
                {
                    "t": "h3",
                    "text": "1.3 Information collected automatically"
                },
                {
                    "t": "ul",
                    "items": [
                        "Device and browser information, IP address, language and time zone.",
                        "Log data such as pages visited, features used, timestamps and error reports.",
                        "Cookies and similar technologies (see Section 9)."
                    ]
                }
            ]
        },
        {
            "id": "s2",
            "num": "2",
            "title": "How We Use Your Information",
            "blocks": [
                {
                    "t": "p",
                    "text": "We use your information to:"
                },
                {
                    "t": "ol",
                    "items": [
                        "Create and manage your account and authenticate you.",
                        "Build, store, format and export your resume, and apply templates and themes.",
                        "**Parse uploaded resumes using AI** and auto-fill your profile sections.",
                        "**Publish your live profile** when you choose to make it public.",
                        "Send service notifications (e.g. account, security and in-app alerts).",
                        "Maintain security, prevent fraud and abuse, and troubleshoot problems.",
                        "Analyse usage to improve the Service.",
                        "Comply with legal obligations and enforce our Terms & Conditions."
                    ]
                },
                {
                    "t": "p",
                    "text": "We do **not** sell your personal information."
                }
            ]
        },
        {
            "id": "s3",
            "num": "3",
            "title": "AI Processing",
            "blocks": [
                {
                    "t": "p",
                    "text": "When you use \"Import Resume with AI\", the content of your uploaded file is processed by automated systems, which may include third-party AI service providers acting on our behalf, to extract and structure the information. We share only what is needed for this purpose. Extracted data may be inaccurate, so please review everything before saving or publishing. [State here whether your AI provider may or may not use the data to train its models.]"
                }
            ]
        },
        {
            "id": "s4",
            "num": "4",
            "title": "Public Profiles and Visibility",
            "blocks": [
                {
                    "t": "p",
                    "text": "Information on a profile you **publish** (such as name, photo, contact details, experience and skills) may be visible to anyone with the link and may be indexed by search engines. Please do not include information you do not want made public. You can unpublish your profile or edit your content at any time. Cached copies held by search engines or third parties may remain for some time after removal."
                }
            ]
        },
        {
            "id": "s5",
            "num": "5",
            "title": "How We Share Information",
            "blocks": [
                {
                    "t": "p",
                    "text": "We may share information with:"
                },
                {
                    "t": "ul",
                    "items": [
                        "**Service providers** that help us operate the Service (hosting, storage, email delivery, analytics, AI processing), bound by confidentiality and data protection obligations.",
                        "**Login providers** (Google, Facebook) when you choose to sign in with them.",
                        "**Legal and safety authorities** when required by law, court order or government request, or to protect rights, safety and security.",
                        "**Business transfers** in connection with a merger, acquisition or sale of assets, with notice to you where required.",
                        "**Anyone you choose**, such as employers or recruiters you share your profile or resume with."
                    ]
                }
            ]
        },
        {
            "id": "s6",
            "num": "6",
            "title": "Data Retention",
            "blocks": [
                {
                    "t": "p",
                    "text": "We keep your information for as long as your account is active or as needed to provide the Service. When you delete your account, we will delete or anonymise your personal data within [30] days, except where we must retain it to meet legal, tax, security or dispute-resolution requirements. Backups may take up to [90] days to be overwritten."
                }
            ]
        },
        {
            "id": "s7",
            "num": "7",
            "title": "Data Security",
            "blocks": [
                {
                    "t": "p",
                    "text": "We use reasonable technical and organisational safeguards, including encryption in transit, hashed passwords and access controls. No system is completely secure, so we cannot guarantee absolute security. Please use a strong, unique password and keep your login credentials confidential. If a data breach affects you, we will notify you and the relevant authorities as required by law."
                }
            ]
        },
        {
            "id": "s8",
            "num": "8",
            "title": "Your Rights and Choices",
            "blocks": [
                {
                    "t": "p",
                    "text": "Under applicable law (including India's Digital Personal Data Protection Act, 2023), you may:"
                },
                {
                    "t": "ul",
                    "items": [
                        "**Access** the personal data we hold about you.",
                        "**Correct or update** inaccurate or incomplete data (most of this can be done in your Profile).",
                        "**Erase** your data and delete your account.",
                        "**Withdraw consent** at any time (this may limit some features).",
                        "**Nominate** another person to exercise your rights in the event of death or incapacity.",
                        "**Raise a grievance** with us, and escalate to the Data Protection Board of India if unresolved."
                    ]
                },
                {
                    "t": "p",
                    "text": "To exercise these rights, contact us using the details in Section 13."
                }
            ]
        },
        {
            "id": "s9",
            "num": "9",
            "title": "Cookies and Similar Technologies",
            "blocks": [
                {
                    "t": "p",
                    "text": "We use cookies and local storage to keep you signed in, remember preferences and understand how the Service is used. You can control cookies through your browser settings, but disabling essential cookies may stop parts of the Service from working. [Add details of any analytics or advertising tools you use.]"
                }
            ]
        },
        {
            "id": "s10",
            "num": "10",
            "title": "Children's Privacy",
            "blocks": [
                {
                    "t": "p",
                    "text": "The Service is intended for users aged **18 and above**. We do not knowingly collect personal data from children. If you believe a child has provided us data, contact us and we will delete it."
                }
            ]
        },
        {
            "id": "s11",
            "num": "11",
            "title": "International Data Transfers",
            "blocks": [
                {
                    "t": "p",
                    "text": "Your data may be stored or processed on servers located outside your country, including by our service providers. Where this happens, we take steps to ensure your data remains protected in line with applicable law."
                }
            ]
        },
        {
            "id": "s12",
            "num": "12",
            "title": "Third-Party Links and Services",
            "blocks": [
                {
                    "t": "p",
                    "text": "The Service may link to third-party sites (e.g. Google, Facebook, your portfolio links). We are not responsible for their privacy practices. Please review their policies."
                }
            ]
        },
        {
            "id": "s13",
            "num": "13",
            "title": "Contact and Grievance Officer",
            "blocks": [
                {
                    "t": "p",
                    "text": "For questions, requests or complaints:"
                },
                {
                    "t": "p",
                    "text": "**Grievance Officer:** [Name]\n**Company:** [Company / Owner Name]\n**Address:** [Full Address], [City], Gujarat, India\n**Email:** [privacy@yourdomain.com]\n**Response time:** within [7–15] working days"
                }
            ]
        },
        {
            "id": "s14",
            "num": "14",
            "title": "Changes to This Policy",
            "blocks": [
                {
                    "t": "p",
                    "text": "We may update this Policy from time to time. If we make material changes, we will notify you by email or in-app notice and update the \"Last updated\" date. Continued use of the Service after changes means you accept the updated Policy."
                }
            ]
        }
    ]
};

export const termsAndConditions: LegalDoc = {
    "title": "Terms & Conditions",
    "subtitle": "The rules for using Career OS to build and publish your resume.",
    "effective": "[DD Month YYYY]",
    "updated": "October 26, 2026",
    "intro": [
        {
            "t": "p",
            "text": "These Terms and Conditions (\"Terms\") form a binding agreement between you and **[Company / Owner Name]** (\"we\", \"us\", \"our\") governing your use of Career OS (the \"Service\"), including the website, Candidate Portal, resume builder, AI resume import, templates, themes and public profile features. Please read them with our [Privacy Policy](/privacy-policy)."
        },
        {
            "t": "p",
            "text": "By creating an account or using the Service, you agree to these Terms. If you do not agree, do not use the Service."
        }
    ],
    "sections": [
        {
            "id": "s1",
            "num": "1",
            "title": "Eligibility",
            "blocks": [
                {
                    "t": "p",
                    "text": "You must be at least **18 years old** and legally capable of entering into a contract under Indian law. You must provide accurate information when registering."
                }
            ]
        },
        {
            "id": "s2",
            "num": "2",
            "title": "Your Account",
            "blocks": [
                {
                    "t": "ul",
                    "items": [
                        "You are responsible for all activity under your account and for keeping your password confidential.",
                        "Notify us immediately at [support@yourdomain.com] if you suspect unauthorised access.",
                        "You may sign in with email and password or through Google or Facebook. Your use of those providers is also subject to their terms.",
                        "One person may not maintain multiple accounts to abuse the Service, and accounts may not be shared or sold."
                    ]
                }
            ]
        },
        {
            "id": "s3",
            "num": "3",
            "title": "The Service",
            "blocks": [
                {
                    "t": "p",
                    "text": "Career OS lets you create, format, store and export resumes, choose templates and themes, import existing resumes with AI, and publish a live profile. We may change, add or remove features at any time. Some features may be paid in future; if so, we will tell you the price before you are charged."
                }
            ]
        },
        {
            "id": "s4",
            "num": "4",
            "title": "Your Content",
            "blocks": [
                {
                    "t": "p",
                    "text": "\"Your Content\" means all information, text, images and files you upload or create on the Service."
                },
                {
                    "t": "ul",
                    "items": [
                        "**Ownership:** You retain ownership of Your Content.",
                        "**License to us:** You grant us a non-exclusive, worldwide, royalty-free licence to host, store, process, display and reproduce Your Content solely to operate, provide and improve the Service for you, including AI parsing and displaying your published profile.",
                        "**Your responsibility:** You confirm that Your Content is accurate, that you have the right to use it, and that it does not infringe anyone's rights or break the law.",
                        "**Public profiles:** If you publish your profile, you understand it may be seen by anyone and indexed by search engines."
                    ]
                }
            ]
        },
        {
            "id": "s5",
            "num": "5",
            "title": "AI Features",
            "blocks": [
                {
                    "t": "ul",
                    "items": [
                        "AI-generated or auto-filled content may be incomplete or inaccurate. **You are responsible for reviewing and correcting it** before saving, publishing or sending it to anyone.",
                        "We do not guarantee that using the Service will lead to interviews, job offers or employment.",
                        "Do not upload files containing other people's sensitive data without their permission."
                    ]
                }
            ]
        },
        {
            "id": "s6",
            "num": "6",
            "title": "Acceptable Use",
            "blocks": [
                {
                    "t": "p",
                    "text": "You agree **not** to:"
                },
                {
                    "t": "ul",
                    "items": [
                        "Provide false, misleading or fraudulent information, or impersonate any person.",
                        "Upload unlawful, defamatory, obscene, hateful or infringing content.",
                        "Upload malware, or attempt to hack, probe, overload or disrupt the Service.",
                        "Scrape, copy, resell or reverse-engineer the Service, templates or code, except as allowed by law.",
                        "Use bots or automated means to create accounts or access the Service without our permission.",
                        "Use the Service to spam or harass others, or to harvest other users' data."
                    ]
                }
            ]
        },
        {
            "id": "s7",
            "num": "7",
            "title": "Intellectual Property",
            "blocks": [
                {
                    "t": "p",
                    "text": "The Service, including its design, software, templates, themes, animations, logos and the \"Career OS\" name, belongs to us or our licensors and is protected by intellectual property laws. We grant you a limited, personal, non-exclusive, non-transferable, revocable licence to use the Service as intended. Resumes you create using our templates may be used by you for your personal job-seeking purposes."
                }
            ]
        },
        {
            "id": "s8",
            "num": "8",
            "title": "Third-Party Services",
            "blocks": [
                {
                    "t": "p",
                    "text": "The Service relies on third parties (such as Google, Facebook, hosting and AI providers). We are not responsible for their services, availability or policies."
                }
            ]
        },
        {
            "id": "s9",
            "num": "9",
            "title": "Privacy",
            "blocks": [
                {
                    "t": "p",
                    "text": "Your use of the Service is also governed by our Privacy Policy, which explains how we handle your personal data."
                }
            ]
        },
        {
            "id": "s10",
            "num": "10",
            "title": "Suspension and Termination",
            "blocks": [
                {
                    "t": "ul",
                    "items": [
                        "You may stop using the Service and delete your account at any time.",
                        "We may suspend or terminate your access, with or without notice, if you breach these Terms, misuse the Service, or where required by law.",
                        "On termination, your right to use the Service ends. Sections that by nature should survive (ownership, disclaimers, liability, indemnity, governing law) will continue."
                    ]
                }
            ]
        },
        {
            "id": "s11",
            "num": "11",
            "title": "Disclaimers",
            "blocks": [
                {
                    "t": "p",
                    "text": "The Service is provided **\"as is\" and \"as available\"**, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, accuracy and non-infringement. We do not warrant that the Service will be uninterrupted, error-free or secure, or that content will never be lost. Please keep your own backup of your resume."
                }
            ]
        },
        {
            "id": "s12",
            "num": "12",
            "title": "Limitation of Liability",
            "blocks": [
                {
                    "t": "p",
                    "text": "To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential or punitive damages, or for loss of data, profits, employment opportunities or goodwill, arising from your use of the Service. Our total liability for any claim shall not exceed the amount you paid us in the **[12] months** before the claim, or ₹[1,000] if you paid nothing."
                }
            ]
        },
        {
            "id": "s13",
            "num": "13",
            "title": "Indemnity",
            "blocks": [
                {
                    "t": "p",
                    "text": "You agree to indemnify and hold us harmless from claims, losses and expenses (including reasonable legal fees) arising from Your Content, your breach of these Terms, or your violation of any law or third-party right."
                }
            ]
        },
        {
            "id": "s14",
            "num": "14",
            "title": "Governing Law and Disputes",
            "blocks": [
                {
                    "t": "p",
                    "text": "These Terms are governed by the laws of **India**. Disputes shall first be attempted to be resolved amicably by written notice. Failing that, the courts at **Ahmedabad, Gujarat** shall have exclusive jurisdiction. [Optionally: disputes may be referred to arbitration under the Arbitration and Conciliation Act, 1996, seated in Ahmedabad.]"
                }
            ]
        },
        {
            "id": "s15",
            "num": "15",
            "title": "Changes to These Terms",
            "blocks": [
                {
                    "t": "p",
                    "text": "We may update these Terms from time to time. We will notify you of material changes by email or in-app notice and update the \"Last updated\" date. Continued use after the changes take effect means you accept them."
                }
            ]
        },
        {
            "id": "s16",
            "num": "16",
            "title": "General",
            "blocks": [
                {
                    "t": "ul",
                    "items": [
                        "**Entire agreement:** These Terms and the Privacy Policy are the entire agreement between you and us.",
                        "**Severability:** If any provision is unenforceable, the rest remains in effect.",
                        "**No waiver:** Failure to enforce a right is not a waiver of it.",
                        "**Assignment:** You may not transfer your rights under these Terms; we may assign ours in connection with a business transfer."
                    ]
                }
            ]
        },
        {
            "id": "s17",
            "num": "17",
            "title": "Contact Us",
            "blocks": [
                {
                    "t": "p",
                    "text": "**[Company / Owner Name]**\n[Full Address], [City], Gujarat, India\nEmail: [support@yourdomain.com]"
                }
            ]
        }
    ]
};