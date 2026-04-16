import { Mail } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export function SocialLinks({ size = "md" }: { size?: "sm" | "md" }) {
  const btnClass = size === "sm" ? "w-10 h-10" : "w-12 h-12";
  const iconClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center space-x-3">
      <a href="https://www.youtube.com/@burrhanadis" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={`${btnClass} rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:bg-[#FF0000] hover:shadow-[0_4px_14px_0_rgba(255,0,0,0.39)] transform hover:-translate-y-1`}>
        <YoutubeIcon className={iconClass} />
      </a>
      <a href="#" aria-label="LinkedIn" className={`${btnClass} rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:bg-[#0A66C2] hover:shadow-[0_4px_14px_0_rgba(10,102,194,0.39)] transform hover:-translate-y-1`}>
        <LinkedinIcon className={iconClass} />
      </a>
      <a href="#" aria-label="Facebook" className={`${btnClass} rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:bg-[#1877F2] hover:shadow-[0_4px_14px_0_rgba(24,119,242,0.39)] transform hover:-translate-y-1`}>
        <FacebookIcon className={iconClass} />
      </a>
      <a href="#" aria-label="Email" className={`${btnClass} rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] transform hover:-translate-y-1`}>
        <Mail className={iconClass} />
      </a>
    </div>
  );
}
