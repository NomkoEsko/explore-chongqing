import { GraduationCap, UsersRound } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import { mongolianAssociation } from "../data/aboutChongqing.js";
import { IS } from "../data/universities.js";

const futureSections = [
  { title: "Үйл ажиллагаа", text: "Үйл ажиллагааны мэдээлэл удахгүй нэмэгдэнэ.", icon: GraduationCap },
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
