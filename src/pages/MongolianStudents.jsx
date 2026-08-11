import { GraduationCap, UsersRound } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import { studentActivityYears, studentAssociation } from "../data/studentActivities.js";
import { IS } from "../data/universities.js";

export default function MongolianStudents() {
  return (
    <main>
      <PageHero
        eyebrow="Оюутны холбоо"
        title="Чунчин дахь Оюутны холбоо"
        image={IS[0].image}
        imagePosition={IS[0].imagePosition}
        label="Монгол Монгол оюутнууд"
      />

      <section className="section students-section">
        <div className="container student-page-stack">
          <article className="content-panel student-feature">
            <UsersRound size={28} aria-hidden="true" />
            <h2>Байгуулагдсан түүх</h2>
            <p>{studentAssociation.history}</p>
          </article>

          <article className="content-panel student-feature">
            <UsersRound size={28} aria-hidden="true" />
            <h2>Бүтэц</h2>
            <p>{studentAssociation.structure}</p>
          </article>

          <section className="student-future-grid student-activities-grid" aria-labelledby="student-activities-title">
            <div className="student-activities-heading">
              <GraduationCap size={22} aria-hidden="true" />
              <h2 id="student-activities-title">Үйл ажиллагаа</h2>
            </div>

            {studentActivityYears.map((year) => (
              <article className="content-panel student-year-card" key={year.id}>
                <h3>{year.title}</h3>
                <div className="student-month-list">
                  {year.months.map((month) => (
                    <section className="student-month-card" key={month.id} aria-labelledby={`student-month-${month.id}`}>
                      <h4 id={`student-month-${month.id}`}>{month.month}</h4>
                      <ul>
                        {month.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
