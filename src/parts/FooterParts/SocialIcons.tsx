import { BsInstagram, BsFacebook, BsLinkedin, BsTiktok } from "react-icons/bs";

export default function SocialIcons() {
  return (
    <>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <BsInstagram />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener norefferer">
        <BsFacebook />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener norefferer">
        <BsLinkedin />
      </a>
      <a href="https://tiktok.com" target="_blank" rel="noopener norefferer">
        <BsTiktok />
      </a>
    </>
  );
}
