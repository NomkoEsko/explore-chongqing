import { Camera, GraduationCap, Link as LinkIcon, MessageCircle, UsersRound } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import { mongolianAssociation } from "../data/aboutChongqing.js";
import { universities } from "../data/universities.js";

const futureSections = [
  { title: "Үйл ажиллагаа", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: GraduationCap },
  { title: "Зураг", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: Camera },
  { title: "Холбоо барих", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: MessageCircle },
  { title: "Нийгмийн сүлжээ", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: LinkIcon },
];

export default function MongolianStudents() {
  return (
    <main>
      <PageHero
        eyebrow="Монгол оюутнууд"
        title="Чунчин дахь Монгол оюутнууд"
        subtitle="Монгол оюутны холбооны баталгаатай мэдээллийг нэг дор цуглуулах хэсэг."
        image={universities[1].image}
        imagePosition={universities[1].imagePosition}
        label="Монгол оюутны орчин"
      >
        <p>{mongolianAssociation.text}</p>
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
            {futureSections.map(({ title, text, icon: Icon }) => (
              <article className="about-card" key={title}>
                <Icon size={22} aria-hidden="true" />
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
