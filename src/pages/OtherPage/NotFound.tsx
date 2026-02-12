import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-5">
      <div className="text-center max-w-[520px] text-[#293c8f]">
        <img
          src="/images/logo/404.png"
          alt="404 Not Found"
          className="max-w-[320px] w-full mx-auto mb-5 block"
        />

        <h1 className="text-[96px] font-extrabold mt-2 text-[#293c8f] sm:text-[72px]">
          404
        </h1>

        <h3 className="text-[26px] my-2 text-[#293c8f] sm:text-[20px]">
          Page Not Found
        </h3>

        <p className="text-[16px] leading-relaxed text-[#555] mb-8">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-9 py-[14px] bg-[#cc952b] text-white font-semibold rounded-full transition-all duration-300 hover:bg-[#293c8f] hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(41,60,143,0.3)]"
        >
          Go To Home
        </Link>
      </div>
    </section>
  );
}
