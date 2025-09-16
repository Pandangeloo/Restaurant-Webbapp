import { BsInstagram, BsFacebook, BsTiktok, BsYoutube } from "react-icons/bs";

type Props = {
  className?: string;
  target?: string;
  rel?: string;
};

//_blank is used so that a new webpage opens. and noopende norefferer is used so the new page cant access my page for malicious purpose
export default function SocialIcons({
  className = "link-light",
  target = "_blank",
  rel = "noopener noreferrer",
}: Props) {
  return (
    <div className="d-flex gap-3 fs-3">
      <a
        className={className}
        href="https://www.instagram.com/reel/DIzZpOXpcWo/?hl=en"
        target={target}
        rel={rel}
      >
        <BsInstagram />
      </a>
      <a
        className={className}
        href="https://www.facebook.com/groups/axolotlcare/"
        target={target}
        rel={rel}
      >
        <BsFacebook />
      </a>
      <a
        className={className}
        href="https://www.tiktok.com/@aquariumpacific/video/7464035293751184686"
        target={target}
        rel={rel}
      >
        <BsTiktok />
      </a>
      <a
        className={className}
        href="https://www.youtube.com/shorts/OvD30K-KN3k?feature=share"
        target={target}
        rel={rel}
      >
        <BsYoutube />
      </a>
    </div>
  );
}
