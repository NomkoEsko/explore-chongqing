import { Camera, GraduationCap, Link as LinkIcon, MessageCircle, UsersRound } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import { mongolianAssociation } from "../data/aboutChongqing.js";
import { IS } from "../data/universities.js";

const futureSections = [
  { title: "Үйл ажиллагаа", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: GraduationCap },
  { title: "Зураг", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: Camera },
  { title: "Холбоо барих", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: MessageCircle },
  { title: "Нийгмийн сүлжээ", text: "instagram: @chongqing_chmoh", icon: LinkIcon, url: "https://www.instagram.com/chongqing_chmoh?igsh=eGt2czMxenVvdjMy", },
];

export default function MongolianStudents() {
  return (
    <main>
      <PageHero
        eyebrow="Оюутны холбоо"
        title="Чунчин дахь Оюутны холбоо"
        image={IS[0].image}
        imagePosition={IS[0].imagePosition}
        label="Монгол Монгол оюутнууд"
      >
      </PageHero>

      <section className="section students-section">
        <div className="container detail-grid">
          <article className="content-panel student-feature">
            <UsersRound size={28} aria-hidden="true" />
            <p className="eyebrow">Баталгаатай мэдээлэл</p>
            <h2>{mongolianAssociation.title}</h2>
            <p>{mongolianAssociation.text}</p>
          </article>

          <div className="student-future-grid">
            {futureSections.map(({ title, text, icon: Icon, url }) => {
              const content = (
                <>
                  <Icon size={22} aria-hidden="true" />
                  <h2>{title}</h2>
                  <p>{text}</p>
                </>
              );

              return url ? (
                <a
                  className="about-card about-card-link"
                  key={title}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <article className="about-card" key={title}>
                  {content}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
