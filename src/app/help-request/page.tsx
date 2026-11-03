import HelpRequestForm from "@/components/helpRequests/HelpRequestForm";

const HelpRequestPage = () => {
  return (
    <main className="min-h-screen bg-[#F8F9FA] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-[#0F4C5C] sm:text-3xl md:text-4xl">
            Request for your needs
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            Everyone deserves support during difficult times. Share
            your story and let our community come together to help
            you.
          </p>
        </div>

        <section className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-5 sm:px-8 sm:py-6">
            <h2 className="text-lg font-bold text-[#0F4C5C] sm:text-xl">
              Help Request Form
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Please provide the necessary information below.
            </p>
          </div>

          <div className="p-5 sm:p-8">
            <HelpRequestForm />
          </div>
        </section>

        <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-[#FB8B24]/25 bg-[#FB8B24]/10 p-4 sm:p-5">
          <p className="text-sm leading-6 text-[#1D2D44]">
            <strong className="text-[#0F4C5C]">Important:</strong>{" "}
            Please provide accurate information and genuine
            supporting documents. Every request will be reviewed
            before being published to the CareBridge community.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HelpRequestPage;