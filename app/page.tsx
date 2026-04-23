"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";

const BASE_URL = "https://webysistemas.mx";

// 🔥 Helper universal para archivos (media → file)
const getFileUrl = (entity: any, field: string, filesMap: any) => {
  const mediaId = entity.relationships?.[field]?.data?.id;
  const media = mediaId ? filesMap[mediaId] : null;

  const fileId = media?.relationships?.field_media_document?.data?.id;
  const file = fileId ? filesMap[fileId] : null;

  return file?.attributes?.uri?.url
    ? BASE_URL + file.attributes.uri.url
    : null;
};

// 🔥 Helper CORRECTO para imágenes (media → file)
const getImageUrl = (entity: any, field: string, filesMap: any) => {
  const mediaId = entity.relationships?.[field]?.data?.id;
  const media = mediaId ? filesMap[mediaId] : null;

  const fileId = media?.relationships?.field_media_image?.data?.id;
  const file = fileId ? filesMap[fileId] : null;

  return file?.attributes?.uri?.url
    ? BASE_URL + file.attributes.uri.url
    : null;
};

export default function HomePage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [letters, setLetters] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [filesMap, setFilesMap] = useState<Record<string, any>>({});

  useEffect(() => {
    // 🔹 Certificates
    fetch(
      `${BASE_URL}/web/jsonapi/node/certificate?include=field_certificate_file,field_certificate_file.field_media_document`
    )
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data.data || []);

        const map: Record<string, any> = {};
        data.included?.forEach((item: any) => {
          map[item.id] = item;
        });

        setFilesMap((prev) => ({ ...prev, ...map }));
      })
      .catch(console.error);

    // 🔹 Letters
    fetch(
      `${BASE_URL}/web/jsonapi/node/laboral_letter?include=field_laboral_letter_file,field_laboral_letter_file.field_media_document`
    )
      .then((res) => res.json())
      .then((data) => {
        setLetters(data.data || []);

        const map: Record<string, any> = {};
        data.included?.forEach((item: any) => {
          map[item.id] = item;
        });

        setFilesMap((prev) => ({ ...prev, ...map }));
      })
      .catch(console.error);

    // 🔥 Portfolio (CORREGIDO)
    fetch(
      `${BASE_URL}/web/jsonapi/node/portfolio?include=field_project_image.field_media_image`
    )
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data.data || []);

        const map: Record<string, any> = {};
        data.included?.forEach((item: any) => {
          map[item.id] = item;
        });

        setFilesMap((prev) => ({ ...prev, ...map }));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="font-sans">
      <Navbar />

      {/* Home */}
      <Section id="home" title="Elias Mendoza | Portfolio">
        <p className="mt-4 text-lg">
          Elias Mendoza Full-Stack Developer <br />
          I build modern, efficient and scalable web applications focused on clean code and great user experience.
        </p>

        <p className="mt-2">
          What I Do:
          <br />
          Drupal, Joomla, WordPress & PHP development
          <br />
          Front-end with HTML, CSS & JavaScript
          <br />
          Backend logic, APIs & databases
          <br />
          Clean, maintainable code
        </p>
      </Section>

      {/* Certificates */}
      <Section id="certificates" title="Certificates">
        <ul className="space-y-2">
          {certificates.map((c) => {
            const pdfLink = getFileUrl(
              c,
              "field_certificate_file",
              filesMap
            );

            return (
              <li
                key={c.id}
                className="border p-4 rounded bg-gray-900 text-white"
              >
                {pdfLink ? (
                  <a
                    href={pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    {c.attributes.title}
                  </a>
                ) : (
                  <span className="text-gray-400">
                    {c.attributes.title} (sin archivo)
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Letters */}
      <Section id="letters" title="Laboral Letters">
        <ul className="space-y-2">
          {letters.map((l) => {
            const pdfLink = getFileUrl(
              l,
              "field_laboral_letter_file",
              filesMap
            );

            return (
              <li
                key={l.id}
                className="border p-4 rounded bg-white text-black"
              >
                {pdfLink ? (
                  <a
                    href={pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    {l.attributes.title}
                  </a>
                ) : (
                  <span className="text-gray-500">
                    {l.attributes.title} (sin archivo)
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Portfolio */}
      <Section id="portfolio" title="Portfolio">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.map((p) => {
            const imageLink = getImageUrl(
              p,
              "field_project_image",
              filesMap
            );

            const projectLink =
              p.attributes?.field_enlace_al_proyecto?.uri;

            return (
              <div
                key={p.id}
                className="border p-4 rounded shadow bg-white text-black"
              >
                <h3 className="font-bold">{p.attributes.title}</h3>

                <p className="text-sm text-gray-600">
                  Fecha: {p.attributes.field_project_date}
                </p>

                <p className="text-sm">
                  {p.attributes.field_technologies}
                </p>

                {imageLink ? (
                  <img
                    src={imageLink}
                    alt={p.attributes.title}
                    className="mt-2 rounded w-full h-48 object-cover"
                  />
                ) : (
                  <div className="mt-2 h-48 flex items-center justify-center bg-gray-200 text-gray-500">
                    Sin imagen
                  </div>
                )}

                {projectLink && (
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-blue-600 underline"
                  >
                    Ver proyecto
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contacto">
        <p>📧 eliasmm@gmail.com</p>
        <p>📞 5542796054</p>
        <p>LinkedIn | GitHub | Twitter</p>
      </Section>
    </div>
  );
}