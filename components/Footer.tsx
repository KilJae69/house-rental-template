import { Link } from "@/i18n/routing";
import { Container } from "./shared/Container";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import navLinks from "@/constants/navLinks";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <>
      <footer className="bg-white border-t border-gray-200 text-[var(--color-text-dark)] mt-12 lg:mt-24">
        <Container>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 py-12  md:justify-items-center">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-[var(--color-primary-dark)]">
                {t("Navigation.title")}
              </h3>
              <ul className="space-y-2">
                {navLinks.map(({ href, title }) => (
                  <li key={href}>
                    <Link className="capitalize hover:underline" href={href}>{t(title)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact & Address */}
            <div>
              <h3 className="font-semibold mb-4 text-[var(--color-primary-dark)]">
                {t('Contact.title')}
              </h3>
              <div className="space-y-2">
                <p>{t('Contact.address')}</p>
                <a className="block hover:underline" href="tel:+38761250293">
                  +387 61 250 293
                </a>
                <a
                  className="block hover:underline"
                  href="mailto:spark.studio.dev@gmail.com"
                >
                  spark.studio.dev@gmail.com
                </a>
              </div>
            </div>
            {/* Social & Credit */}
            <div>
              <h3 className="font-semibold mb-4 text-[var(--color-primary-dark)]">
                 {t('FollowUs.title')}
              </h3>
              <div className="flex space-x-4 mb-6">
                {/* Replace with your real icons */}
                <a
                  href="https://www.instagram.com/sparkstudiodev"
                  target="__blank"
                  rel="noreferrer noopener"
                  className="group"
                >
                  <FaInstagram className="size-7 transition-transform duration-200 group-hover:scale-110 group-hover:text-rose-600 text-rose-400" />
                </a>
                <a
                  href="https://facebook.com/SparkStudioDev"
                  target="__blank"
                  rel="noreferrer noopener"
                  className="group"
                >
                  <FaFacebook className="size-7 text-blue-500 transition-transform duration-200 group-hover:scale-110 group-hover:text-blue-700" />
                </a>
              </div>
              <p className="text-sm text-gray-500">
               {t('TemplateBy')}{" "}
                <a
                  href="https://www.spark-dev-studio.com/bs/"
                  target="__blank"
                  rel="noreferrer noopener"
                  className="underline"
                >
                  <span className="text-[#d4af37]">Spark</span> Studio
                </a>
              </p>
            </div>
          </div>

          <div className=" mx-auto  py-2 text-xs text-gray-500 text-center">
           {t.rich("Disclaimer", {
                strong: (chunks) => (
                  <span className="text-[var(--color-primary-dark)] font-semibold">{chunks}</span>
                ),
               
              })}
          </div>
        </Container>
        <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-400">
         {t('Copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </>
  );
}
