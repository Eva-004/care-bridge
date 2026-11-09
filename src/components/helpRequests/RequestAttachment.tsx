
import Image from "next/image";
import {
  FaPaperclip,
  FaFileAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

export interface HelpRequestDocument {
  fileId: string;
  name: string;
  type: string;
  url?: string;
}

interface RequestAttachmentProps {
  documents?: HelpRequestDocument[];
}

const RequestAttachment = ({ documents }: RequestAttachmentProps) => {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <FaPaperclip className="text-xl text-[#0F4C5C]" />
        <h2 className="text-lg font-bold text-[#1D2D44]">
          Attachments
        </h2>
      </div>

      {documents?.length ? (
        <div className="space-y-3">
          {documents.map((document) => (
            <div
              key={document.fileId}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-[#FAFBFC] p-3"
            >
              {document.type.startsWith("image/") && document.url ? (
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={document.url}
                    alt={document.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-[#EAF4F4]">
                  <FaFileAlt className="text-3xl text-[#0F4C5C]" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-[#1D2D44]">
                  {document.name}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {document.type}
                </p>
              </div>

              {document.url && (
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${document.name}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#0F4C5C] transition hover:bg-[#EAF4F4]"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-[#F8F9FA] p-5 text-sm text-gray-500">
          No attachments available.
        </p>
      )}
    </section>
  );
};

export default RequestAttachment;
